import classes from '../UserSettings/UserSetting.module.css';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const password = '*********';

const UserDetail = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // const [selectedFile, setSelectedFile] = useState('');

  // const handleFile = (e) => {
  //   const file = e.target.files[0];
  //   const imgType = ['image/png', 'img/jpg', 'img/jpeg'];
  //   if (!file) {
  //     alert('Please select a File to upload!');
  //     return;
  //   }
  //   if (!imgType.includes(file.type)) {
  //     alert('Please select a file of type png, jpg or jpeg');
  //     return;
  //   }
  //   if (file.size > 1000000) {
  //     alert('File size is too large!');
  //     return;
  //   }
  //   transformFile(file);
  // };

  // const transformFile = (file) => {
  //   const reader = new FileReader();
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setSelectedFile(reader.result);
  //     };
  //   } else {
  //     setSelectedFile('');
  //   }
  // };

  return (
    <div className={classes.form__container}>
      <form className={classes.form__control}>
        <div className={classes.uploadImage}>
          <div className={classes.client__image}>
            <img
              src={user?.data?.userImage}
              alt="user-img"
              style={{ width: 100, height: 100, borderRadius: '50%' }}
            />
          </div>
        </div>

        <div className={classes.inputContainer}>
          <label>
            <span>First Name</span>
            <input type="text" placeholder="First Name" disabled value={user?.data?.firstName} />
          </label>
          <label>
            <span>Last Name</span>
            <input type="text" placeholder="Last Name" disabled value={user?.data?.lastName} />
          </label>
        </div>

        <div className={classes.inputContainer}>
          <label className={classes.fullWidth}>
            <span>Email</span>
            <input type="email" placeholder="Your Email" disabled value={user?.data?.email} />
          </label>
        </div>
        <div className={classes.inputContainer}>
          <label className={classes.fullWidth}>
            <span>Password</span>
            <input type="email" placeholder="Your Email" disabled value={password} />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className={classes.btn}
            onClick={() =>
              navigate('/dashboard/updateusers', {
                state: { userData: user?.data },
              })
            }
          >
            Update
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{ marginLeft: '20px' }}
            className={classes.btn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
