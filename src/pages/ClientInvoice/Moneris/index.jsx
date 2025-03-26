// import React, { useState } from 'react';
// import { api } from '../../../services/api';
// import useToast from '../../../hooks/useToast';
// import { Box, Button, Flex, Heading, Input, Select, Text, VStack } from '@chakra-ui/react';
// import { updateInvoice } from '../../../redux/invoiceSlice';
// import { useDispatch } from 'react-redux';

// const countryOptions = [
//   { code: '+1', name: 'United States', abbreviation: 'USA' },
//   { code: '+1', name: 'Canada', abbreviation: 'CA' },
// ];

// const Moneris = ({ invoiceData, storeName }) => {
//   const { showSuccessToast, showErrorToast } = useToast();

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     company_name: '',
//     address: '',
//     city: '',
//     province: '',
//     postal_code: '',
//     country: 'United States',
//     country_phone_code: '+1',
//     country_code: 'USA',
//     phone_number: '+1', // Initialize with "+1" for US format
//     email: invoiceData?.clientEmail || '',
//     amount: invoiceData?.totalDue || '',
//     card_number: '',
//     expiry_date: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleCountryChange = (e) => {
//     const selectedCountry = countryOptions.find(
//       (country) => country.abbreviation === e.target.value,
//     );

//     if (selectedCountry) {
//       setFormData((prevState) => ({
//         ...prevState,
//         country: selectedCountry.name,
//         country_phone_code: selectedCountry.code,
//         country_code: selectedCountry.abbreviation,
//         phone_number: selectedCountry.code,
//       }));
//     } else {
//       showErrorToast('Please select a valid country.');
//     }
//   };

//   const handleCardNumberChange = (e) => {
//     const formattedCardNumber = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
//     setFormData((prevState) => ({ ...prevState, card_number: formattedCardNumber }));
//   };

//   const handleExpiryDateChange = (e) => {
//     const formattedExpiry = e.target.value
//       .replace(/\D/g, '')
//       .replace(/(\d{2})(\d{1,2})/, '$1 / $2')
//       .substring(0, 7);
//     setFormData((prevState) => ({ ...prevState, expiry_date: formattedExpiry }));
//   };
//   const handlePhoneNumberChange = (e) => {
//     const input = e.target.value.replace(/\D/g, '');
//     const countryCode = formData.country_phone_code;

//     if (input.startsWith(countryCode.replace('+', ''))) {
//       setFormData((prevState) => ({
//         ...prevState,
//         phone_number: `+${input}`,
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         phone_number: `${countryCode}${input}`,
//       }));
//     }
//   };

//   const submitHandler = async () => {
//     console.log(formData);
//     const {
//       first_name,
//       last_name,
//       company_name,
//       address,
//       city,
//       province,
//       postal_code,
//       phone_number,
//       country_code,
//       email,
//       amount,
//       card_number,
//       expiry_date,
//     } = formData;

//     if (
//       !first_name ||
//       !last_name ||
//       !company_name ||
//       !address ||
//       !city ||
//       !province ||
//       !postal_code ||
//       !phone_number ||
//       !email ||
//       !amount ||
//       !card_number ||
//       !expiry_date
//     ) {
//       showErrorToast('All fields are required');
//       return;
//     }

//     try {
//       const payload = {
//         amount: amount.toString(),
//         pan: card_number.replace(/\s+/g, ''),
//         expiry_date: `${expiry_date.split(' / ')[0]}${expiry_date.split(' / ')[1]}`,
//         first_name,
//         last_name,
//         email,
//         company_name,
//         address,
//         city,
//         province,
//         postal_code,
//         country: formData.country,
//         country_code,
//         phone_number,
//         store_name: storeName,
//         invoice_id: invoiceData?._id,
//       };

//       setLoading(true);

//       const { data } = await api.post('/api/v1/payments/wp-moneris/create-payment', payload);

//       if (data) {
//         let _payload = { status: 'paid' };
//         dispatch(updateInvoice({ id: invoiceData?._id, payload: _payload })).then((response) => {
//           showSuccessToast('Invoice Paid Succesfully.');
//           setLoading(false);
//           setTimeout(() => {
//             window.location.reload();
//           }, 2000);
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       showErrorToast(error?.response?.data?.message || 'An error occurred');
//       console.error('Error:', error?.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <Flex
//       p={8}
//       boxShadow="lg"
//       borderRadius="md"
//       w={'420px'}
//       bg={'#f8f9fa'}
//       flexDir={'column'}
//       my={0}
//     >
//       <Heading as="h2" size="md" color="gray.700" mb={4} textAlign="center">
//         Complete Payment
//       </Heading>
//       <VStack spacing={3} width="100%">
//         <Input
//           placeholder="First Name"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="Last Name"
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="Company Name"
//           name="company_name"
//           value={formData.company_name}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="Address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="City"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="Province/State"
//           name="province"
//           value={formData.province}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="Postal Code"
//           name="postal_code"
//           value={formData.postal_code}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Select
//           placeholder="Select Country"
//           name="country"
//           value={formData.country_code}
//           onChange={handleCountryChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         >
//           {countryOptions.map((country) => (
//             <option key={country.code} value={country.abbreviation}>
//               {`${country.name} (${country.abbreviation})`}
//             </option>
//           ))}
//         </Select>
//         <Input
//           placeholder="Phone Number"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handlePhoneNumberChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Input
//           placeholder="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           variant="filled"
//           focusBorderColor="teal.400"
//         />
//         <Box w="100%" mt={4}>
//           <Text fontWeight="500" color="gray.700" mb={1}>
//             Card Details
//           </Text>
//           <Input
//             placeholder="Card Number"
//             name="card_number"
//             value={formData.card_number}
//             onChange={handleCardNumberChange}
//             variant="filled"
//             focusBorderColor="teal.400"
//           />
//           <Input
//             placeholder="Expiry Date (MM / YY)"
//             name="expiry_date"
//             value={formData.expiry_date}
//             onChange={handleExpiryDateChange}
//             variant="filled"
//             focusBorderColor="teal.400"
//             mt={3}
//           />
//         </Box>
//         <Button isLoading={loading} colorScheme="teal" width="100%" mt={4} onClick={submitHandler}>
//           Pay Now
//         </Button>
//       </VStack>
//     </Flex>
//   );
// };

// export default Moneris;
import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import useToast from '../../../hooks/useToast';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { updateInvoice } from '../../../redux/invoiceSlice';
import { useDispatch } from 'react-redux';

const countryOptions = [
  { code: '+1', name: 'United States', abbreviation: 'USA' },
  { code: '+1', name: 'Canada', abbreviation: 'CA' },
];

const getFirstAndLastName = (fullName) => {
  if (!fullName) return { firstPart: '', lastPart: '' };

  const nameParts = fullName.trim().split(' ');
  return {
    firstPart: nameParts[0] || '',
    lastPart: nameParts.slice(1).join(' ') || '',
  };
};

const Moneris = ({ invoiceData, storeName }) => {
  const { showSuccessToast, showErrorToast } = useToast();

  console.log(invoiceData);

  const { firstPart, lastPart } = getFirstAndLastName(invoiceData?.clientName);

  const [formData, setFormData] = useState({
    first_name: firstPart,
    last_name: lastPart,
    company_name: '',
    address: '',
    city: '',
    province: '',
    postal_code: '',
    country: 'United States',
    country_phone_code: '+1',
    country_code: 'USA',
    phone_number: '+1',
    email: invoiceData?.clientEmail || '',
    amount: invoiceData?.totalDue || '',
    card_number: '',
    expiry_date: '',
    cvc: '',
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countryOptions.find(
      (country) => country.abbreviation === e.target.value,
    );

    if (selectedCountry) {
      setFormData((prevState) => ({
        ...prevState,
        country: selectedCountry.name,
        country_phone_code: selectedCountry.code,
        country_code: selectedCountry.abbreviation,
        phone_number: selectedCountry.code,
      }));
    } else {
      showErrorToast('Please select a valid country.');
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData((prevState) => ({ ...prevState, card_number: formattedCardNumber }));
  };

  const handleExpiryDateChange = (e) => {
    const formattedExpiry = e.target.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{1,2})/, '$1 / $2')
      .substring(0, 7);
    setFormData((prevState) => ({ ...prevState, expiry_date: formattedExpiry }));
  };

  const handleCVCChange = (e) => {
    const cvc = e.target.value.replace(/\D/g, '').substring(0, 4);
    setFormData((prevState) => ({ ...prevState, cvc }));
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const countryCode = formData.country_phone_code;

    if (input.startsWith(countryCode.replace('+', ''))) {
      setFormData((prevState) => ({
        ...prevState,
        phone_number: `+${input}`,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        phone_number: `${countryCode}${input}`,
      }));
    }
  };

  const submitHandler = async () => {
    console.log(formData);
    const {
      first_name,
      last_name,
      company_name,
      address,
      city,
      province,
      postal_code,
      phone_number,
      country_code,
      email,
      amount,
      card_number,
      expiry_date,
      cvc,
    } = formData;

    if (
      !first_name ||
      !last_name ||
      !address ||
      !city ||
      !province ||
      !postal_code ||
      !phone_number ||
      !email ||
      !amount ||
      !card_number ||
      !expiry_date ||
      !cvc
    ) {
      showErrorToast('All required fields must be filled');
      return;
    }

    try {
      const payload = {
        amount: amount.toString(),
        pan: card_number.replace(/\s+/g, ''),
        expiry_date: `${expiry_date.split(' / ')[0]}${expiry_date.split(' / ')[1]}`,
        cvc,
        first_name,
        last_name,
        email,
        company_name,
        address,
        city,
        province,
        postal_code,
        country: formData.country,
        country_code,
        phone_number,
        store_name: storeName,
        invoice_id: invoiceData?._id,
      };

      setLoading(true);

      const { data } = await api.post('/api/v1/payments/wp-moneris/create-payment', payload);

      if (data) {
        let _payload = { status: 'paid' };
        dispatch(updateInvoice({ id: invoiceData?._id, payload: _payload })).then((response) => {
          showSuccessToast('Invoice Paid Successfully.');
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      }
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message || 'An error occurred');
      console.error('Error:', error?.response?.data?.message || error.message);
    }
  };

  // Get the appropriate label for region field based on country
  const getRegionLabel = () => {
    return formData.country_code === 'USA' ? 'State' : 'Province';
  };

  // Get the appropriate label for postal code field based on country
  const getPostalLabel = () => {
    return formData.country_code === 'USA' ? 'ZIP Code' : 'Postal Code';
  };

  return (
    <Flex
      p={8}
      boxShadow="lg"
      borderRadius="md"
      width={{ base: '420px', md: '500px', lg: '600px' }}
      bg={'#f8f9fa'}
      flexDir={'column'}
      my={0}
    >
      <Heading as="h2" size="md" color="gray.700" mb={4} textAlign="center">
        Complete Payment
      </Heading>
      <VStack spacing={2} width="100%">
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          w={'100%'}
          gap={5}
          justifyContent={'space-between'}
        >
          <FormControl width="100%" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>

          <FormControl width="100%" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Company Name (Optional)</FormLabel>
          <Input
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          w={'100%'}
          gap={5}
          justifyContent={'space-between'}
        >
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Select
              name="country"
              value={formData.country_code}
              onChange={handleCountryChange}
              variant="filled"
              focusBorderColor="teal.400"
            >
              {countryOptions.map((country) => (
                <option key={country.code} value={country.abbreviation}>
                  {`${country.name} (${country.abbreviation})`}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          w={'100%'}
          gap={5}
          justifyContent={'space-between'}
        >
          <FormControl isRequired>
            <FormLabel>{getRegionLabel()}</FormLabel>
            <Input
              name="province"
              value={formData.province}
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>{getPostalLabel()}</FormLabel>
            <Input
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>
        </Flex>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          w={'100%'}
          gap={5}
          justifyContent={'space-between'}
        >
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone_number"
              value={formData.phone_number}
              onChange={handlePhoneNumberChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>
        </Flex>
        <Box w="100%" mt={4}>
          <Text fontWeight="500" color="gray.700" mb={3}>
            Card Details
          </Text>
          <FormControl isRequired mb={3}>
            <FormLabel>Card Number</FormLabel>
            <Input
              name="card_number"
              value={formData.card_number}
              onChange={handleCardNumberChange}
              variant="filled"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <Flex gap={4} alignItems={'center'}>
            <FormControl isRequired>
              <FormLabel>Expiry Date (MM / YY)</FormLabel>
              <Input
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleExpiryDateChange}
                variant="filled"
                focusBorderColor="teal.400"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>CVC</FormLabel>
              <Input
                name="cvc"
                value={formData.cvc}
                onChange={handleCVCChange}
                variant="filled"
                focusBorderColor="teal.400"
                maxLength={4}
              />
            </FormControl>
          </Flex>
        </Box>
        <Button isLoading={loading} colorScheme="teal" width="100%" mt={6} onClick={submitHandler}>
          Pay Now
        </Button>
      </VStack>
    </Flex>
  );
};

export default Moneris;
