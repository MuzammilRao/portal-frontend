import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../../../redux/authSlice';
import { useAuthContext } from '../../../hooks/useAuthContext';
import GradientBg from '../../../components/AuthBackground/GradientBg';

const Login = () => {
  const dispatchRedux = useDispatch();
  const { dispatch } = useAuthContext();
  const toast = useToast();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);

  const showErrorToast = (message) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const showSuccessToast = (message) => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      email: userData.email,
      password: userData.password,
    };

    dispatchRedux(loginUser({ payload }))
      .then((action) => {
        if (loginUser.fulfilled.match(action)) {
          if (action.payload) {
            setIsLoading(false);
            setIsError(null);
            localStorage.setItem('token', action.payload?.data?.token);
            localStorage.setItem('User', JSON.stringify(action.payload));
            dispatch({ type: 'LOGIN', payload: action.payload });
            showSuccessToast('Login Successful.');
            navigate('/dashboard/main');
          } else {
            showErrorToast('Failed to Login.');
            setIsLoading(false);
          }
        } else {
          showErrorToast('Failed to Login!');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
        showErrorToast(error.message || 'An error occurred');
      });
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="brand.secondary"
      p={4}
      position="relative"
    >
      <GradientBg /> {/* Optional: Background gradient component */}
      <Box
        w={{ base: '90%', md: '400px' }}
        p={6}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        zIndex={1}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4} isInvalid={isError}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Email..."
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              focusBorderColor="orange.400"
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'password' : 'text'}
                placeholder="Password..."
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                focusBorderColor="orange.400"
              />
              <InputRightElement onClick={() => setShowPassword(!showPassword)} cursor="pointer">
                {showPassword ? <EyeOff /> : <Eye />}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            bg="brand.themeOrange"
            color={'white'}
            width="full"
            borderRadius="full"
            size="lg"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import AuthHeading from '../../../components/AuthHeading/AuthHeading';
// import Form from '../../../components/Form/Form';
// import classes from './Login.module.css';

// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../../hooks/useAuthContext';
// import { api } from '../../../services/api';
// import GradientBg from '../../../components/AuthBackground/GradientBg';
// import useToast from '../../../hooks/useToast';
// import { Eye, EyeOff } from 'lucide-react';
// import { loginUser } from '../../../redux/authSlice';
// import { useDispatch } from 'react-redux';
// import { Button } from '@chakra-ui/button';

// const Login = () => {
//   const dispatchRedux = useDispatch();
//   const [userData, setUserData] = useState({
//     email: '',
//     password: '',
//   });

//   const { dispatch } = useAuthContext();
//   const { showErrorToast, showSuccessToast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setIsError(null);

//     const payload = {
//       email: userData.email,
//       password: userData.password,
//     };

//     dispatchRedux(loginUser({ payload: payload }))
//       .then((action) => {
//         if (loginUser.fulfilled.match(action)) {
//           if (action.payload) {
//             setIsLoading(false);
//             setIsError(null);
//             localStorage.setItem('token', action.payload?.data?.token);
//             localStorage.setItem('User', JSON.stringify(action.payload));
//             dispatch({
//               type: 'LOGIN',
//               payload: action.payload,
//             });
//             showSuccessToast('Login Succesfull.');
//             navigate('/dashboard/main');
//             return;
//           } else {
//             showErrorToast('Failed to Login.');
//             setIsLoading(false);
//           }
//         } else {
//           showErrorToast('Failed to Login!');
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         console.error('Error:', error);
//         showErrorToast(error);
//       });
//   };

//   return (
//     <div className={classes.loginContainer}>
//       <GradientBg />
//       <div className={classes.loginInner}>
//         <Form>
//           <AuthHeading
//             headingTitle="Login"
//             // headingText="See your growth finance here and let see your profit you get now"
//           />
//           <form className={classes.formGroup} onSubmit={handleSubmit}>
//             {successMessage && <div className={classes.success}>{successMessage}</div>}

//             <label>
//               <span>Email Address</span>
//               <input
//                 type="email"
//                 placeholder="Email..."
//                 autoComplete="off"
//                 value={userData.email}
//                 onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//               />
//             </label>

//             <label>
//               <span>Password</span>
//               <div className={classes.show__password}>
//                 <input
//                   type={showPassword ? 'password' : 'text'}
//                   placeholder="Password..."
//                   autoComplete="off"
//                   value={userData.password}
//                   onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//                 />
//                 <div style={{ marginRight: '4%' }}>
//                   {showPassword ? (
//                     <EyeOff color="#ffffff" onClick={() => setShowPassword(false)} />
//                   ) : (
//                     <Eye color="#ffffff" onClick={() => setShowPassword(true)} />
//                   )}
//                 </div>
//               </div>
//             </label>

//             <Button py={10} size="lg" type="submit" isLoading={isLoading} bg={'brand.primary'}>
//               Login
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Login;
