import Table from '../../../components/ReusableTable/Table';
import { useEffect } from 'react';
import useApi from '../../../hooks/useApi';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Acheived = () => {
  const { user } = useAuthContext();
  const { acheived, dispatch } = useInvoiceContext();

  const { error, loading, apiCall } = useApi();

  useEffect(() => {
    const fetchedAcheivedTargets = async () => {
      try {
        const data = await apiCall('/api/v1/admin/target-acheived');
        if (data) {
          dispatch({
            type: 'GET_ACHEIVED',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchedAcheivedTargets();
  }, [user]);
  return <Table pageTitle="Acheived" data={acheived} />;
};

export default Acheived;
