import { loadStripe } from '@stripe/stripe-js';

import { useState } from 'react';
import { useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import useToast from '../../../hooks/useToast';
import { Box } from '@chakra-ui/react';

const Stripe = ({ invoiceData, stripe_publishable_key, merchants_api_url, setIsLoading }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const { showErrorToast } = useToast();

  console.log(invoiceData);

  useEffect(() => {
    setStripePromise(loadStripe(stripe_publishable_key));
  }, [stripe_publishable_key]);

  const MakePaymentIntent = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payments/${merchants_api_url}`,
        {
          invoiceId: invoiceData?._id,
          firstName: invoiceData?.clientName,
          lastName: invoiceData?.clientName,
          email: invoiceData?.clientEmail,
          address: invoiceData?.clientAddress,
          city: invoiceData?.Karachi,
          zip: invoiceData?.clientZip,
          amount: invoiceData?.totalDue,
          country: invoiceData?.clientCountry || 'United States',
        },
      );
      if (data) {
        var clientSecret = data.paymentIntent.client_secret;
        setClientSecret(clientSecret);
        setIsLoading(false);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
      console.log('eeror obj--->', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    MakePaymentIntent();
  }, []);

  return (
    <Box my={20}>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <CheckoutForm invoiceId={invoiceData?._id} />
        </Elements>
      )}
    </Box>
  );
};

export default Stripe;
