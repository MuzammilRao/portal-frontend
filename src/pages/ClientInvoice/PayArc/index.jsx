import React, { useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import { api } from '../../../services/api';
import useToast from '../../../hooks/useToast';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../../../redux/invoiceSlice';

const PayArc = ({ invoiceData }) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [address_line1, setAddress_line1] = useState('');
  const [city, setCity] = useState('');
  const [state, setAddressState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  const [card_number, setCard_number] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCardExpiryChange = (e) => {
    console.log(e.target.value.slice('/'));
    setExpiry(e.target.value);
  };

  const submitHandler = async () => {
    if (!name || !address_line1 || !city || !state || !zip) {
      showErrorToast('All fields are required');
      return;
    }
    if (!card_number || !expiry || !cvv) {
      setError('Card Details Missing');
    }
    try {
      const paylaod = {
        email: invoiceData?.clientEmail,
        address_line1: address_line1 ? address_line1 : invoiceData?.clientAddress,
        city: city ? city : invoiceData?.clientCity,
        state: state ? state.toUpperCase() : invoiceData?.clientCity,
        zip: zip ? zip : invoiceData?.clientZip,
        name: name ? name : invoiceData?.clientName,
        phone_number: phone ? phone : invoiceData?.client?.phone ?? `00000000000`,
        description: invoiceData?.invoiceNumber,
        amount: invoiceData?.totalDue,
        card_number: card_number,
        exp_month: expiry.split(' / ')[0],
        exp_year: expiry.split(' / ')[1],
        cvv: cvv,
      };

      setLoading(true);

      const { data } = await api.post('/api/v1/payments/payarc/create-charge', paylaod);
      if (data) {
        let _payload = { status: 'paid' };
        dispatch(updateInvoice({ id: invoiceData?._id, payload: _payload }))
          .then((response) => {
            showSuccessToast('Invoice Paid Succesfully.');
            setLoading(false);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((error) => {
            console.error('Error:', error);
            showErrorToast(error?.message);
          });
        // console.log(data);
      }
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message);
      console.log('error', error?.response?.data?.message);
    }
  };

  return (
    <Flex
      p={10}
      sx={{
        boxShadow: `10px 10px 8px -6px rgba(0,0,0,0.75)`,
      }}
      gap={2}
      w={'400px'}
      bg={'#fcfafa'}
      flexDir={'column'}
    >
      {invoiceData?.status === 'paid' ? (
        <Text color={'#808080'} fontWeight={'700'} fontSize={22} textAlign={'center'}>
          Invoice status: Paid
        </Text>
      ) : (
        <>
          <Text color={'#808080'} fontWeight={'700'} fontSize={22} textAlign={'center'}>
            Enter Your Card Details
          </Text>
          <Box color={'#808080'} my={2} mx={0}>
            <Input
              w={'100%'}
              color={'#000'}
              border={'2px solid #808080'}
              type="text"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box color={'#808080'} my={2} mx={0}>
            <Input
              w={'100%'}
              color={'#000'}
              border={'2px solid #808080'}
              type="text"
              name="addressLine1"
              placeholder="Enter Address "
              value={address_line1}
              onChange={(e) => setAddress_line1(e.target.value)}
            />
          </Box>
          <Box color={'#808080'} my={2} mx={0}>
            <Input
              w={'100%'}
              color={'#000'}
              border={'2px solid #808080'}
              type="text"
              name="city"
              placeholder="Enter City "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>
          <Box color={'#808080'} my={2} mx={0}>
            <Input
              w={'100%'}
              color={'#000'}
              border={'2px solid #808080'}
              type="text"
              name="state"
              placeholder="Enter State eg: WA, AL, TX ..."
              value={state}
              onChange={(e) => setAddressState(e.target.value)}
            />
          </Box>
          <Box color={'#808080'} my={2} mx={0}>
            <Input
              w={'100%'}
              color={'#000'}
              border={'2px solid #808080'}
              type="text"
              name="zip"
              placeholder="Enter Zip Code  "
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Box>
          <Box color={'#808080'} my={2} mx={0}>
            <Input
              w={'100%'}
              color={'#000'}
              border={'2px solid #808080'}
              type="text"
              name="phone"
              placeholder="Enter Phone Number  "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
          <Box my={2} border={'2px solid #808080'}>
            <CreditCardInput
              cardNumberInputProps={{
                value: card_number,
                onChange: (e) => setCard_number(e.target.value),
              }}
              cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
              cardCVCInputProps={{ value: cvv, onChange: (e) => setCvv(e.target.value) }}
              fieldClassName="input"
            />
          </Box>
          <Flex my={2} justifyContent={'center'}>
            <Button
              isLoading={loading}
              bg={'#808080'}
              color={'#000'}
              disabled={!card_number || !expiry || !cvv}
              onClick={submitHandler}
            >
              Pay Now
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default PayArc;
