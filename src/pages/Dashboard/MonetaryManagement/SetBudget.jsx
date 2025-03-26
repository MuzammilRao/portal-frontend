import React from 'react';
import Form from '../../../components/ReusableForm/Form';

const SetBudget = () => {
  return <Form pageTitle="Set Budget" postUrl="/api/v1/admin/budget" dispatchType="SET_BUDGETS" />;
};

export default SetBudget;
