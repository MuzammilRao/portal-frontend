import React from 'react';
import Form from '../../../components/ReusableForm/Form';

const SetTarget = () => {
  return <Form pageTitle="Set Target" postUrl="/api/v1/admin/target" dispatchType="SET_TARGETS" />;
};

export default SetTarget;
