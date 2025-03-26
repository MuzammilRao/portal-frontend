import Table from '../../../components/ReusableTable/Table';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
import useApi from '../../../hooks/useApi';

const Targets = () => {
  const { user } = useAuthContext();
  const { targets, dispatch } = useInvoiceContext();

  const { error, loading, apiCall } = useApi();

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const data = await apiCall('/api/v1/admin/target');
        if (data) {
          dispatch({
            type: 'GET_TARGETS',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchTargets();
  }, [user]);
  return (
    <Table
      pageTitle="Targets"
      createBtnText="Set Targets"
      navigateUrl="/dashboard/monetary-managment/set-target"
      data={targets}
    />
  );
};

export default Targets;
