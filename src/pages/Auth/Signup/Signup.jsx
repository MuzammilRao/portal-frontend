import 'react-phone-number-input/style.css';
import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  Link,
  Stack,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { api } from '../../../services/api';
import GradientBg from '../../../components/AuthBackground/GradientBg';

const reactPhoneInputStyle = {
  width: '100%',
  outline: 'none',
  padding: '14px 20px',
  borderRadius: '25px',
  border: '2px solid #333333',
  background: 'transparent',
  color: '#333333',
};

const Signup = () => {
  const toast = useToast();
  const [userData, setUserData] = useState({
    name: '',
    pseudo: '',
    email: '',
    password: '',
  });
  const [usNumber, setUsNumber] = useState(null);
  const [pkNumber, setPkNumber] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const { dispatch } = useAuthContext();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      showErrorToast('Please accept the terms and conditions.');
      return;
    }
    setIsLoading(true);

    const payload = {
      name: userData.name,
      pseudo: userData.pseudo,
      usNumber,
      pkNumber,
      email: userData.email,
      password: userData.password,
    };

    try {
      const { data } = await api.post(`/api/v1/users/signup/${token}`, payload);
      if (data) {
        localStorage.setItem('User', JSON.stringify(data));
        dispatch({ type: 'LOGIN', payload: data });
        showSuccessToast('Signup successful.');
        setUserData({ name: '', pseudo: '', email: '', password: '' });
        setUsNumber(null);
        setPkNumber(null);
        navigate('/login');
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || 'Signup failed.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
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
      <GradientBg />
      <Box
        w={{ base: '90%', md: '500px' }}
        p={6}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        zIndex={1}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="brand.secondary">
          Register Now
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name..."
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                focusBorderColor="brand.themeOrange"
              />
            </FormControl>

            <FormControl id="pseudo">
              <FormLabel>Pseudo</FormLabel>
              <Input
                type="text"
                placeholder="Pseudo..."
                value={userData.pseudo}
                onChange={(e) => handleInputChange('pseudo', e.target.value)}
                focusBorderColor="brand.themeOrange"
              />
            </FormControl>

            <FormControl id="usNumber">
              <FormLabel>US Number</FormLabel>
              <PhoneInput
                country="US"
                value={usNumber}
                onChange={setUsNumber}
                style={reactPhoneInputStyle}
              />
            </FormControl>

            <FormControl id="pkNumber">
              <FormLabel>PK Number</FormLabel>
              <PhoneInput
                country="PK"
                value={pkNumber}
                onChange={setPkNumber}
                style={reactPhoneInputStyle}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Email..."
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                focusBorderColor="brand.themeOrange"
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password..."
                  value={userData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  focusBorderColor="brand.themeOrange"
                />
                <InputRightElement onClick={() => setShowPassword(!showPassword)} cursor="pointer">
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="terms">
              <Checkbox
                isChecked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                colorScheme="orange"
              >
                Accept all applicable{' '}
                <Link color="blue.500" href="/terms-and-conditions" target="_blank">
                  Terms and Conditions
                </Link>
              </Checkbox>
            </FormControl>

            <Button
              type="submit"
              bg={'brand.themeOrange'}
              colorScheme="brand.themeOrange"
              width="full"
              borderRadius="full"
              size="lg"
              isLoading={isLoading}
              disabled={!isChecked}
            >
              {isLoading ? <Spinner size="md" /> : 'Signup'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;

// import 'react-phone-number-input/style.css';
// import classes from './Signup.module.css';
// import { useState } from 'react';
// import AuthHeading from '../../../components/AuthHeading/AuthHeading';
// import Form from '../../../components/Form/Form';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useAuthContext } from '../../../hooks/useAuthContext';
// import { api } from '../../../services/api';

// import PhoneInput from 'react-phone-number-input';
// import GradientBg from '../../../components/AuthBackground/GradientBg';
// import { Eye, EyeOff } from 'lucide-react';
// import useToast from '../../../hooks/useToast';

// const reactPhoneInputStyle = {
//   width: '100%',
//   outline: 'none',
//   padding: '14px 20px',
//   borderRadius: '25px',
//   border: '2px solid #333333',
//   background: 'transparent',
//   color: '#333333',
// };

// const Signup = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     pseudo: '',
//     usNumber: '',
//     pkNumber: '',
//     email: '',
//     password: '',
//   });

//   const { showErrorToast, showSuccessToast } = useToast();
//   const { token } = useParams();
//   const { dispatch } = useAuthContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(true);
//   const [isChecked, setIsChecked] = useState(false);
//   const [usNumber, setUsNumber] = useState(null);
//   const [pkNumber, setPkNumber] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const payload = {
//       name: userData.name,
//       pseudo: userData.pseudo,
//       usNumber: usNumber,
//       pkNumber: pkNumber,
//       email: userData.email,
//       password: userData.password,
//     };

//     try {
//       const { data } = await api.post(`/api/v1/users/signup/${token}`, payload);

//       if (data) {
//         localStorage.setItem('User', JSON.stringify(data));

//         dispatch({
//           type: 'LOGIN',
//           payload: data,
//         });
//         setUserData({ ...userData, name: '', email: '', password: '' });
//         showSuccessToast(`${data?.message} -`);
//       }
//       setIsLoading(false);

//       navigate('/login');
//     } catch (error) {
//       showErrorToast(`${error?.response?.data?.message} !`);
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={classes.signupContainer}>
//       <GradientBg />
//       <div className={classes.signupInner}>
//         <Form>
//           <AuthHeading
//             headingTitle="Register Now"
//             headingText="See your growth finance here and let see your profit you get now"
//           />
//           <form className={classes.formGroup} onSubmit={handleSubmit}>
//             <label>
//               <span>Name</span>
//               <input
//                 type="text"
//                 autoComplete="off"
//                 placeholder="Enter your name..."
//                 value={userData.name}
//                 onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//               />
//             </label>
//             <label>
//               <span>Pseudo</span>
//               <input
//                 type="text"
//                 autoComplete="off"
//                 placeholder="Pseudo..."
//                 value={userData.pseudo}
//                 onChange={(e) => setUserData({ ...userData, pseudo: e.target.value })}
//               />
//             </label>
//             <label>
//               <span>US Number</span>
//               <PhoneInput
//                 style={reactPhoneInputStyle}
//                 className={classes.phoneStyle}
//                 country="US"
//                 defaultCountry="US"
//                 placeholder="Enter number"
//                 value={usNumber}
//                 onChange={setUsNumber}
//               />
//             </label>
//             <label>
//               <span>PK Number</span>
//               <PhoneInput
//                 style={reactPhoneInputStyle}
//                 className={classes.phoneStyle}
//                 country="PK"
//                 defaultCountry="PK"
//                 placeholder="Enter number"
//                 value={pkNumber}
//                 onChange={setPkNumber}
//               />
//             </label>

//             <label>
//               <span>Email Address</span>
//               <input
//                 type="email"
//                 autoComplete="off"
//                 placeholder="Email..."
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
//                 {showPassword ? (
//                   <EyeOff color="#ffffff" onClick={() => setShowPassword(false)} />
//                 ) : (
//                   <Eye color="#ffffff" onClick={() => setShowPassword(true)} />
//                 )}
//               </div>
//             </label>

//             <div className={classes.checkbox}>
//               <input type="checkbox" onClick={() => setIsChecked(!isChecked)} />
//               <span>
//                 Accept all applicable{' '}
//                 <Link
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   to="/terms-and-conditions"
//                   style={{ color: '#1B9DE4' }}
//                 >
//                   {' '}
//                   Terms and Conditions{' '}
//                 </Link>{' '}
//               </span>
//             </div>
//             {isLoading ? (
//               <button styles={{ opacity: '0.8' }} disabled={isLoading}>
//                 Loading...
//               </button>
//             ) : (
//               <button
//                 disabled={!isChecked}
//                 style={{
//                   opacity: !isChecked ? 0.5 : 1,
//                   cursor: !isChecked ? 'not-allowed' : 'pointer',
//                 }}
//               >
//                 Signup
//               </button>
//             )}
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
