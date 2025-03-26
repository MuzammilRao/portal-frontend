import Table from '../../../components/ReusableTable/Table';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
import useApi from '../../../hooks/useApi';
import { useEffect } from 'react';

const Chargebacks = () => {
  const { user } = useAuthContext();
  const { chargebacks, dispatch } = useInvoiceContext();

  const { error, loading, apiCall } = useApi();

  useEffect(() => {
    const fetchChargeBacks = async () => {
      try {
        const data = await apiCall('/api/v1/admin/chargeback');
        if (data) {
          dispatch({
            type: 'GET_CHARGEBACKS',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchChargeBacks();
  }, [user]);
  return <Table pageTitle="Charge Backs" data={chargebacks} />;
};

export default Chargebacks;
