import { useState } from 'react';
import AuthHeading from '../../../components/AuthHeading/AuthHeading';
import Form from '../../../components/Form/Form';
import classes from './ForgotPassword.module.css';
import { api } from '../../../services/api';
import GradientBg from './../../../components/AuthBackground/GradientBg';

const ForgotPassword = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      email: userData.email,
    };

    try {
      const { data } = await api.post('/api/v1/users/forget-password', payload);
      if (data) {
        console.log(data);
        setUserData({ ...userData, email: '' });
        setSuccessMessage(data?.message);
        localStorage.setItem('forgot-user', JSON.stringify(data?.user));
      }
      setIsLoading(false);
      setIsError(null);

      setTimeout(() => {
        setSuccessMessage('');
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
          <AuthHeading
            headingTitle="Forgot Password"
            headingText="Lost your password? Please enter your email address. You will receive a link to create a new password via email."
          />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            {successMessage && <div className={classes.success}>{successMessage}</div>}

            <label>
              <span>Email Address</span>
              <input
                type="email"
                placeholder="Email..."
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </label>

            {isLoading ? (
              <button styles={{ opacity: '0.8' }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button>Send Email</button>
            )}
            {isError && <div className={classes.error}>{isError?.error}</div>}
            {isError && <div className={classes.errorMessage}>{isError}</div>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
