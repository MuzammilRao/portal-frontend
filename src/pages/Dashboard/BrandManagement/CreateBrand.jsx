import classes from './CreateBrand.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageIcon } from '../../../images';
import { api } from '../../../services/api';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';

const CreateBrand = ({ Id }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [brand, setBrand] = useState(null);
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    logo: '',
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Please select a File to upload!');
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
    let endpoint = '/api/v1/admin/brand';
    const _payload = {
      ...payload,
      logo: selectedFile,
    };
    try {
      if (Id) {
        endpoint += `/${Id}`;
      }
      const { data } = await api[Id ? 'patch' : 'post'](endpoint, _payload, {
        headers: { Authorization: `Bearer ${user?.data?.token}` },
      });
      if (data) {
        setIsLoading(false);
        setError(null);
        navigate(-1);
      }
      // resetForm();
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data.message);
    }
  };

  useEffect(() => {
    const getBrand = async () => {
      try {
        const { data } = await api.get(`/api/v1/admin/brand/${Id}`, {
          headers: { Authorization: `Bearer ${user?.data?.token}` },
        });
        if (data) {
          setBrand(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (Id) {
      getBrand();
    }
  }, [Id, user]);

  useEffect(() => {
    setPayload(Id ? { ...payload, ...brand } : {});
  }, [brand, Id]);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>{Id ? 'Update Brand' : 'Create Brand'}</h1>
      </div>
      <div className={classes.form__container}>
        <form className={classes.form__control} onSubmit={handleSubmit}>
          <div className={classes.uploadImage}>
            <span style={{ fontSize: '13px', marginBottom: '10px' }}>Upload Image</span>
            <div className={classes.client__image}>
              <div className={classes.imageInput}>
                <img src={ImageIcon} alt="" />
                <span className={classes.signatureSpan}>Upload Logo</span>
                <span className={classes.sizeSpan}>Recommend Size (1920 x 1080) example</span>
                <label htmlFor="inputTag">
                  <span style={{ cursor: 'pointer' }}>Browse</span>
                  <input
                    id="inputTag"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFile(e)}
                  />
                </label>
              </div>
              <div className={classes.imgPreview}>
                {selectedFile || brand?.logo ? (
                  <img src={selectedFile || brand?.logo} alt="" className={classes.image} />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </div>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>Name* </span>
              <input
                type="text"
                placeholder="Name"
                value={payload?.name}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <span>Email *</span>
              <input
                type="text"
                placeholder="Email"
                value={payload?.email}
                onChange={(e) => setPayload({ ...payload, email: e.target.value })}
              />
            </label>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>Address *</span>
              <input
                type="text"
                placeholder="Address"
                value={payload?.address}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    address: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <span>City *</span>
              <input
                type="text"
                placeholder="City"
                value={payload?.city}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    city: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>Zip *</span>
              <input
                type="number"
                placeholder="ZIP"
                value={payload?.zip}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    zip: e.target.value,
                  })
                }
              />
            </label>
            <label></label>
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.8rem', margin: '20px 0' }}>{error}</p>}

          {isLoading ? (
            <button style={{ opacity: '0.6' }} disabled>
              Creating...
            </button>
          ) : (
            <button type="submit">{Id ? 'Update' : 'Create'}</button>
          )}

          <Link onClick={() => navigate(-1)}>
            <button style={{ marginLeft: '20px' }} className={classes.btn}>
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;
