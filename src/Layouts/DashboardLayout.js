import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../pages/Dashboard/Layout';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const DefaultLayout = ({ children }) => {
  const allStates = useSelector((state) => state);
  let anyIsLoading = false;

  for (const key in allStates) {
    if (allStates.hasOwnProperty(key) && allStates[key].isLoading) {
      anyIsLoading = true;
      break;
    }
  }

  return (
    <Layout>
      {anyIsLoading && <Loader />}
      {/* <Outlet /> */}
      {children}
    </Layout>
  );
};

export default DefaultLayout;
