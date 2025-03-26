import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const PaymentCancel = () => {
  return (
    <Box textAlign="center" p={8} boxShadow="md" rounded="lg" bg="white">
      <Heading mb={4} color="red.500">
        Payment Declined
      </Heading>
      <Text fontSize="xl" mb={8} color="gray.600">
        Your payment could not be processed at the moment. 😞 Please try again later.
      </Text>
    </Box>
  );
};

export default PaymentCancel;
