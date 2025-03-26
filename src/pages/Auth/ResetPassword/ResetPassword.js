import { useState } from 'react';
import AuthHeading from '../../../components/AuthHeading/AuthHeading';
import Form from '../../../components/Form/Form';
import classes from './ResetPassword.module.css';

import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import GradientBg from '../../../components/AuthBackground/GradientBg';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const forgotUser = JSON.parse(localStorage.getItem('forgot-user'));

  const [userData, setUserData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      password: userData.newPassword,
      password2: userData.confirmPassword,
    };

    try {
      const { data } = await api.patch(`/api/v1/users/reset-password/${forgotUser._id}`, payload);
      if (data) {
        setUserData({ ...userData, email: '' });
        setSuccessMessage(data.message);
      }
      setIsLoading(false);
      setIsError(null);

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/login');
      }, 3000);
    } catch (error) {
      setIsError(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <GradientBg />
      <div className={classes.loginInner}>
        <Form>
          <AuthHeading headingTitle="Reset Password" headingText="Please Enter a New Password" />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            {successMessage && <div className={classes.success}>{successMessage}</div>}

            {isError && <div className={classes.errorMessage}>{isError}</div>}

            <label>
              <span>New Password</span>
              <div className={classes.show__password}>
                <input
                  type={showPassword1 ? 'password' : 'text'}
                  placeholder="New Password..."
                  value={userData.newPassword}
                  onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                />
                {showPassword1 ? (
                  <EyeOff color="#ffffff" onClick={() => setShowPassword1(false)} />
                ) : (
                  <Eye color="#ffffff" onClick={() => setShowPassword1(true)} />
                )}
              </div>
            </label>

            <label>
              <span>Confirm Password</span>
              <div className={classes.show__password}>
                <input
                  type={showPassword2 ? 'password' : 'text'}
                  placeholder="Confirm Password..."
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {showPassword2 ? (
                  <EyeOff color="#ffffff" onClick={() => setShowPassword2(false)} />
                ) : (
                  <Eye color="#ffffff" onClick={() => setShowPassword2(true)} />
                )}
              </div>
            </label>

            {isLoading ? (
              <button styles={{ opacity: '0.8' }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button>Reset Password</button>
            )}
            {isError && <div className={classes.error}>{isError?.error}</div>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
