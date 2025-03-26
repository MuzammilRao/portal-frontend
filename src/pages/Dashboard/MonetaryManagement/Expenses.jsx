import Table from '../../../components/ReusableTable/Table';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
import useApi from '../../../hooks/useApi';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';

const Expenses = () => {
  const { user } = useAuthContext();
  const { expenses, dispatch } = useInvoiceContext();

  const { error, loading, apiCall } = useApi();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await apiCall('/api/v1/admin/expense');
        if (data) {
          dispatch({
            type: 'GET_EXPENSES',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchExpenses();
  }, [user]);
  return <Table pageTitle="Expenses" data={expenses} />;
};

export default Expenses;
