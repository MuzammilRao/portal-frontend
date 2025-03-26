import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import torrelLogo from '../../../../images/torrelLogo.png';
import classes from './UserSetting.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import UserDetail from '../UserDetails/UserDetail';
import BusinessDetail from '../../BusinessDetails';

function UserSetting() {
  const [active, setActive] = useState(true);
  const [activeText, setActiveText] = useState('Account Details');

  return (
    <div className={classes.container}>
      {/* {/ TOP /} */}
      <div className={classes.top}>
        <h1
          style={{
            color: activeText === 'Account Details' ? '#1B9DE4' : '#0C4767',
            textDecoration: 'underline',
          }}
          onClick={() => {
            setActive(true);
            setActiveText('Account Details');
          }}
        >
          Account Details
        </h1>

        <h1
          style={{
            color: activeText === 'Business Details' ? '#1B9DE4' : '#0C4767',
            textDecoration: 'underline',
          }}
          onClick={() => {
            setActive(false);
            setActiveText('Business Details');
          }}
        >
          Business Details
        </h1>
      </div>

      {active ? <UserDetail /> : <BusinessDetail />}

      <ToastContainer />
    </div>
  );
}

export default UserSetting;
