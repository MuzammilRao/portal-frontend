import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import Loader from '../../../components/Loader/index';
import useToast from '../../../hooks/useToast';

const SumUpCardComponent = ({ invoiceData }) => {
  const [loading, setLoading] = useState(false);
  const [cardForm, setCardForm] = useState(false);
  const [checkout_reference, setCheckoutReference] = useState(null);
  const { showSuccessToast, showErrorToast } = useToast();

  const createSumupCustomer = async () => {
    setLoading(true);
    try {
      const payload = {
        customer_id: invoiceData?.client,
        city: invoiceData?.companyCity,
        state: invoiceData?.companyAddress,
        country: invoiceData?.job?.client?.country,
        line1: invoiceData?.companyAddress,
        line2: invoiceData?.companyAddress,
        postal_code: invoiceData?.companyZip,
        birthdate: invoiceData?.job?.client?.birthDate ?? '1949-11-11',
        email: invoiceData?.companyEmail,
        first_name: invoiceData?.job?.client?.firstName,
        last_name: invoiceData?.job?.client?.lastName,
        phone: invoiceData?.companyNumber,
      };
      const data = await api.post('/api/v1/payments/sumup/create-customer', payload);
      if (data) {
        createSumupCheckout();
      }
    } catch (error) {
      if (error?.response?.data?.error_code === 'CUSTOMER_ALREADY_EXISTS') {
        createSumupCheckout();
      } else {
        console.log('show error');
        setLoading(false);
      }
    }
  };

  const createSumupCheckout = async () => {
    try {
      const payload = {
        checkout_reference: invoiceData?._id,
        amount: invoiceData?.totalDue,
        description: invoiceData?.job?.projectName,
        customer_id: invoiceData?.client,
        purpose: invoiceData?.job?.projectName,
      };
      const data = await api.post('/api/v1/payments/sumup/create-checkout', payload);
      if (data) {
        // console.log(data?.data);
        setCheckoutReference(data?.data?.id);
        setLoading(false);
        setCardForm(true);
      }
    } catch (error) {
      console.log('0---', error);
      console.log('show error');
      setLoading(false);
    }
  };

  useEffect(() => {
    createSumupCustomer();
  }, []);

  useEffect(() => {
    if (cardForm) {
      const script = document.createElement('script');
      script.src = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.SumUpCard.mount({
          id: 'sumup-card',
          checkoutId: checkout_reference,
          onResponse: function (type, body) {
            if (type === 'success') {
              // Perform your function on success here
              api
                .post('/api/v1/payments/sumup/save-transaction', body)
                .then((response) => {
                  console.log('Axios POST request successful', response.data);
                  console.log('(==>,', response?.data?.data);
                  if (response.data?.data?.status === 'FAILED') {
                    console.log('failed');
                    showErrorToast('Payment failed');
                    return;
                  }
                  // console.log('SumUp API called successfully');
                  showSuccessToast('Payment Succesfull');
                })
                .catch((error) => {
                  console.error('Axios POST request error', error);
                });
            }
          },
        });
      };

      // return () => {
      //   document.body.removeChild(script);
      // };
    }
  }, [cardForm, checkout_reference]);

  return (
    <>
      {loading && <Loader />}
      <div id="sumup-card"></div>
    </>
  );
};

export default SumUpCardComponent;
