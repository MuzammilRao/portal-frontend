import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import Stripe from './index';

const StripeProvider = ({ invoiceData, stripe_publishable_key, merchants_api_url }) => {
  const [enablePayment, setEnablePayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('invoiceData', invoiceData);
  console.log('stripe_publishable_key', stripe_publishable_key);
  console.log('merchants_api_url', merchants_api_url);
  return (
    <Box color={'#000'} my={20}>
      {enablePayment && (
        <Stripe
          invoiceData={invoiceData}
          stripe_publishable_key={stripe_publishable_key}
          merchants_api_url={merchants_api_url}
          setIsLoading={setIsLoading}
        />
      )}
      <Flex justifyContent={'center'}>
        <Button
          opacity={enablePayment && '15%'}
          mt={enablePayment && 10}
          disabled={isLoading || enablePayment}
          colorScheme="blue"
          isLoading={isLoading}
          onClick={() => setEnablePayment(true)}
        >
          {' '}
          Pay Now
        </Button>
      </Flex>
    </Box>
  );
};

export default StripeProvider;
