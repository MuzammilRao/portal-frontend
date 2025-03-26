import Table from '../../../components/ReusableTable/Table';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
import useApi from '../../../hooks/useApi';
import { useEffect } from 'react';

const Budgets = () => {
  const { user } = useAuthContext();
  const { budgets, dispatch } = useInvoiceContext();

  const { error, loading, apiCall } = useApi();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await apiCall('/api/v1/admin/budget');
        if (data) {
          dispatch({
            type: 'GET_BUDGETS',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchBudgets();
  }, [user]);
  return (
    <Table
      pageTitle="Budgets"
      createBtnText="Set Budgets"
      navigateUrl="/dashboard/monetary-managment/set-budget"
      data={budgets}
    />
  );
};

export default Budgets;
