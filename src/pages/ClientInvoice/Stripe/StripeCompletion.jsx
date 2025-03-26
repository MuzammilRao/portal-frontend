import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../../../redux/invoiceSlice';
import useToast from '../../../hooks/useToast';

const StripeCompletion = () => {
  const params = new URLSearchParams(document.location.search);
  const dispatch = useDispatch();
  const { showErrorToast, showSuccessToast } = useToast();
  const redirect_status = params.get('redirect_status');
  const invoiceId = params.get('invoice_id');

  const [paymentStatus, setPaymentStatus] = useState('Processing...');

  useEffect(() => {
    if (!!redirect_status) {
      if (redirect_status === 'succeeded') {
        setPaymentStatus('We appreciate your prompt payment of this invoice.');
        console.log('payment cleared');
        dispatch(updateInvoice({ id: invoiceId, payload: { status: 'paid' } }))
          .then((response) => {
            showSuccessToast('Payment Completed Succesfully.');
          })
          .catch((error) => {
            console.error('Error:', error);
            showErrorToast(error?.message);
          });
      } else {
        console.log('payment failed');
        setPaymentStatus('Payment Failed. Please try again later or Contact support.');
      }
    } else {
      console.log('Unable to find redirect status');
    }
  }, []);

  return (
    <Box textAlign="center" p={8} boxShadow="md" rounded="lg" bg="white">
      {redirect_status === 'succeeded' ? (
        <>
          <Heading mb={4} color="blue.500">
            🎉 Thank You!
          </Heading>
          <Text fontSize="xl" mb={8} color="gray.600">
            We appreciate your prompt payment of this invoice.
          </Text>
        </>
      ) : (
        <>
          <Heading mb={4} color="blue.500">
            Sorry
          </Heading>
          <Text fontSize="xl" mb={8} color="gray.600">
            {paymentStatus}
          </Text>
        </>
      )}
    </Box>
  );
};

export default StripeCompletion;
