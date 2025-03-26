import { InvoiceContext } from '../context/InvoiceContext';
import { useContext } from 'react';

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);

  return context;
};
