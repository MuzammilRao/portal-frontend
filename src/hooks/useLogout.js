import { useAuthContext } from './useAuthContext';
import { useInvoiceContext } from './useInvoiceContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: invoiceDispatch } = useInvoiceContext();

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    invoiceDispatch({
      type: 'REMOVE_ALL_CLIENTS',
    });
    invoiceDispatch({
      type: 'REMOVE_ALL_JOBS',
    });
    invoiceDispatch({
      type: 'REMOVE_ALL_INVOICE',
    });
    invoiceDispatch({
      type: 'REMOVE_ALL_SUB_JOBS',
    });
    invoiceDispatch({
      type: 'GET_ALL_SUB_INVOICE',
    });
    localStorage.removeItem('User');
    localStorage.removeItem('job_id');
    localStorage.removeItem('client_id');
  };

  return { logout };
};
