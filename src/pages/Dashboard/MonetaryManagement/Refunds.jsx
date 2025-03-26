import Table from '../../../components/ReusableTable/Table';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useApi from '../../../hooks/useApi';
import { useEffect } from 'react';

const Refunds = () => {
  const { user } = useAuthContext();
  const { refunds, dispatch } = useInvoiceContext();

  const { error, loading, apiCall } = useApi();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const data = await apiCall('/api/v1/admin/refund');
        if (data) {
          dispatch({
            type: 'GET_REFUNDS',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchFunction();
  }, [user]);
  return <Table pageTitle="Refunds" data={refunds} />;
};

export default Refunds;
