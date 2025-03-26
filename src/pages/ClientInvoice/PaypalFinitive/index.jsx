import React, { useState } from 'react';
import { api } from '../../../services/api';
import { Button } from '@chakra-ui/react';

function Paypal({ invoice }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const params = {
        price: invoice?.totalDue,
        invoiceId: invoice?._id,
      };
      const { data } = await api.get('/api/v1/payments/paypal/finitive/pay', { params });

      if (data?.link) {
        const paypalWindow = window.open(data.link, 'PayPal Payment', 'width=600,height=600');

        const pollPopup = setInterval(() => {
          if (paypalWindow.closed !== false) {
            clearInterval(pollPopup);

            handleSuccess();
          }
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSuccess = async () => {
    try {
      // const response = await api.post('/api/v1/payments/success', {});
    } catch (error) {
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      {invoice?.status === 'paid' ? (
        <Button disabled colorScheme="blue">
          Invoice Paid
        </Button>
      ) : (
        <Button onClick={handlePayment} colorScheme="blue">
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      )}
    </div>
  );
}

export default Paypal;
