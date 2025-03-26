import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ invoiceId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion?invoice_id=${invoiceId}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };
  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          style={{
            border: '1px solid #1B9DE4',
            backgroundColor: '#1B9DE4',
            color: '#FFFFFF',
            padding: '0.6rem 1.2rem',
            marginTop: '1.5rem',
            borderRadius: '0.3rem',
            fontSize: '0.8rem',
          }}
        >
          <span id="button-text">{isProcessing ? 'Processing ... ' : 'Pay now'}</span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;

// import React, { useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import axios from "axios";

// const CheckoutForm = ({
//   firstName,
//   lastName,
//   email,
//   address,
//   city,
//   zip,
//   amount,
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);

//   console.log({ firstName, lastName, email, address, city, zip, amount });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (elements == null) {
//         return;
//       }

//       const { error: submitError } = await elements.submit();
//       if (submitError) {
//         setErrorMessage(submitError.message);
//         return;
//       }

//       // Create the PaymentIntent and obtain clientSecret from your server endpoint
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/v1/payments/stripe/create-payment`,
//         { firstName, lastName, email, address, city, zip, amount },
//         {
//           headers: {
//             Authorization: `Bearer sk_test_51O34YjIHmGv9NAWX0WncUHmDtradMdLayEjgOvcvvuxl4XC7MP2xPz5PXSXGPuVCVELEMWHe9eYzFNx9RSdobAxT00wbt5pJHW`,
//           },
//         }
//       );
//       if (data) {
//         console.log("-------<>-------", data.paymentIntent.client_secret);
//         const clientSecret = data.paymentIntent.client_secret;
//         const { error } = await stripe.confirmPayment({
//           //`Elements` instance that was used to create the Payment Element
//           elements,
//           clientSecret,
//           confirmParams: {
//             return_url: `https://example.com/order/123/complete`,
//           },
//         });

//         if (error) {
//           // This point will only be reached if there is an immediate error when
//           // confirming the payment. Show error to your customer (for example, payment
//           // details incomplete)
//           console.log("-->error");
//           setErrorMessage(error.message);
//         } else {
//           console.log("final");
//         }
//       }
//     } catch (error) {}
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe || !elements}>
//         Pay
//       </button>
//       {/* Show error message to your customers */}
//       {errorMessage && <div>{errorMessage}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

// // const handleToken = async (totalAmount, token) => {
// //   try {
// //     axios.post(
// //       `${process.env.REACT_APP_BASE_URL}/api/v1/payments/stripe/pay`,
// //       { token: token.id, amount: totalAmount }
// //     );
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
