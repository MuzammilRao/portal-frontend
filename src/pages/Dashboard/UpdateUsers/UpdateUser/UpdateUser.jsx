import { useState } from 'react';
import classes from '../../UserSettings/UserSettings/UserSetting.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../../services/api';
import { useAuthContext } from '../../../../hooks/useAuthContext';

const UpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { userData } = location.state;
  const id = userData._id;
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(userData.userImage);
  const [user, setUser] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    userImage: '',
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const imgType = ['image/png', 'img/jpg', 'img/jpeg'];

    if (!file) {
      alert('Please select a File to upload!');
      return;
    }
    if (!imgType.includes(file.type)) {
      alert('Please select a file of type png, jpg or jpeg');
      return;
    }
    if (file.size > 1000000) {
      alert('File size is too large!');
      return;
    }
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
    } else {
      setSelectedFile('');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a File to upload!');
    } else {
      const payload = { ...user, userImage: selectedFile };
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.patch(`/api/v1/users/${id}`, payload);

        localStorage.setItem('User', JSON.stringify(data));
        dispatch({
          type: 'LOGIN',
          payload: data,
        });
        setIsLoading(false);
        setError(null);
        resetForm();
        if (data.status === 'success') {
          showToastMessage();
        }

        setTimeout(() => {
          navigate('/dashboard/usersettings');
        }, 5000);
      } catch (error) {
        //console.log("error>>>>>", error);
      }
    }
  };

  const resetForm = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      userImage: null,
    });
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = () => {
    toast.success('User Updated Successfully !', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'toast-success-message',
    });
  };
  return (
    <div className={classes.container}>
      {/* {/ TOP /} */}
      <div className={classes.top}>
        <h1>Update User</h1>
      </div>

      {/* {/ create client form /} */}
      <div className={classes.form__container}>
        <form className={classes.form__control} onSubmit={handleSubmit}>
          <div className={classes.uploadImage}>
            <span style={{ fontSize: '13px', marginBottom: '10px' }}>Upload User Image</span>
            <div
              style={{
                display: 'inline-block',
                width: '170px',
                height: '110px',
              }}
              className={classes.client__image}
            >
              <div
                style={{
                  width: '70%',
                  margin: 'auto',
                  marginBottom: '20px',
                  borderRadius: '50%',
                }}
                className={classes.imgPreview}
              >
                {selectedFile ? (
                  <img
                    style={{ borderRadius: '50% !important' }}
                    src={selectedFile}
                    alt=""
                    className={classes.image}
                  />
                ) : (
                  <span style={{ fontSize: '12px' }}>Preview Image</span>
                )}
              </div>

              <label htmlFor="inputTag">
                <span className={classes.imgStyle}>Browse</span>
                <input
                  id="inputTag"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e)}
                />
              </label>
            </div>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>First Name</span>
              <input
                type="text"
                placeholder="First Name"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Last Name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </label>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="Your Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
          </div>

          {error && (
            <p style={{ color: 'red', fontSize: '0.8rem', margin: '20px 0' }}>{error.message}</p>
          )}

          {isLoading ? (
            <button style={{ opacity: '0.6' }} disabled>
              Updating...
            </button>
          ) : (
            <button type="submit">Update</button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
