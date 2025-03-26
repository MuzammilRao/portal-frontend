import React, { useState } from 'react';
import { api } from '../../../services/api';
// import { PaypalLogo } from '../../../images';
import classes from './Paypal.module.css';

function Paypal({ amount }) {
  const [loading, setLoading] = useState(false);
  const [paypalURL, setPaypalURL] = useState('');
  const paymentHandler = async () => {
    setLoading(true);
    try {
      const params = {
        price: amount,
      };
      const { data } = await api.get('/api/v1/payments/paypal/axolot/pay', { params });
      if (data) {
        setLoading(false);
        setPaypalURL(data?.link);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div onClick={paymentHandler} className={classes.payBtn}>
        Pay Now
      </div>
      {paypalURL && (
        <div
          // className="absolute bottom-1 top-1 z-50 flex justify-center items-center w-full"
          className={classes.mainContainer}
        >
          <hr />
          <div className={classes.confirmationContainer}>
            <div className="   border- px-40">
              <form action={`${paypalURL}`} method="post">
                <button type="submit" className={classes.payBtn}>
                  Confirm
                  {/* <img src={PaypalLogo} width="100%" height="30px" /> */}
                </button>
              </form>
            </div>
            <div className={classes.cancelButton} onClick={() => setPaypalURL(false)}>
              x
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paypal;
