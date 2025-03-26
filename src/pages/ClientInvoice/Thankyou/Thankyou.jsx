import React, { useEffect } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../../../services/api';

const ThankYouPage = () => {
  const params = new URLSearchParams(document.location.search);

  useEffect(() => {
    const handleSuccessfulPayment = async () => {
      const Price = params.get('price');
      const PayerID = params.get('PayerID');
      const paymentId = params.get('paymentId');
      const invoiceId = params.get('invoiceId');
      try {
        const params = {
          PayerID,
          paymentId,
          Price,
          invoiceId,
        };

        const data = await api.get('/api/v1/payments/paypal/finitive/success', { params });

        if (data) {
          console.log(data);
          window.close();
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (true) {
      handleSuccessfulPayment();
    }
  }, []);

  return (
    <Box textAlign="center" p={8} boxShadow="md" rounded="lg" bg="white">
      <Heading mb={4} color="blue.500">
        🎉 Thank You!
      </Heading>
      <Text fontSize="xl" mb={8} color="gray.600">
        We appreciate your prompt payment of this invoice.
      </Text>
    </Box>
  );
};

export default ThankYouPage;
