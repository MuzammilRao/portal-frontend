import { useState } from 'react';
import { createContext, useReducer } from 'react';

export const InvoiceContext = createContext();

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_CLIENTS':
      return { ...state, allClients: action.payload };
    case 'CREATE__CLIENTS':
      return { allClients: [action.payload, ...state.allClients] };
    case 'DELETE__CLIENTS':
      return {
        allClients: state.allClients.filter((client) => client._id !== action.payload),
      };

    case 'REMOVE_ALL_CLIENTS':
      return { allClients: [] };

    case 'GET_ALL_JOBS':
      return { ...state, allJobs: action.payload };
    case 'CREATE__JOBS':
      return { allJobs: [action.payload, ...state.allJobs] };
    case 'DELETE__JOBS':
      return {
        allJobs: state.allJobs.filter((job) => job._id !== action.payload),
      };
    case 'GET_BY_DATE':
      return { ...state, allJobs: action.payload };

    case 'REMOVE_ALL_JOBS':
      return { allJobs: [] };

    case 'GET_ALL_INVOICE':
      return { ...state, allInvoice: action.payload };
    case 'DELETE__INVOICES':
      return {
        allInvoice: state.allInvoice.filter((invoice) => invoice._id !== action.payload),
      };
    case 'REMOVE_ALL_INVOICE':
      return { allInvoice: [] };
    case 'GET_ITEM_DATA':
      return { ...state, allItemData: action.payload };

    //**********User Managment***********/
    case 'GET_USERS':
      return { ...state, users: action.payload };

    case 'DELETE_USER':
      return {
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case 'GET_BUSINESS_UNIT':
      return { ...state, businessUnit: action.payload };

    //**********Brand Managment***********/
    case 'GET_BRANDS':
      return { ...state, brands: action.payload };
    case 'GET_MERCHANTS':
      return { ...state, merchants: action.payload?.merchants };
    case 'DELETE_BRAND':
      return {
        brands: state.brands.filter((brand) => brand._id !== action.payload),
      };

    case 'GET_TARGETS':
      return { ...state, targets: action.payload };
    case 'SET_TARGETS':
      return { targets: [action.payload, ...state.targets] };

    case 'GET_BUDGETS':
      return { ...state, budgets: action.payload };
    case 'SET_BUDGETS':
      return { budgets: [action.payload, ...state.budgets] };

    case 'GET_ACHEIVED':
      return { ...state, acheived: action.payload };

    case 'GET_EXPENSES':
      return { ...state, expenses: action.payload };

    case 'GET_REFUNDS':
      return { ...state, refunds: action.payload };

    case 'GET_CHARGEBACKS':
      return { ...state, chargebacks: action.payload };

    default:
      return state;
  }
};

export const InvoiceContextProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [state, dispatch] = useReducer(invoiceReducer, {
    allClients: [],
    allJobs: [],
    allInvoice: [],
    allItemData: [],
    users: [],
    brands: [],
    merchants: [],
    businessUnit: [],
    targets: [],
    budgets: [],
    acheived: [],
    expenses: [],
    refunds: [],
    chargebacks: [],
  });

  return (
    <InvoiceContext.Provider
      value={{
        ...state,
        dispatch,
        isMobile,
        setIsMobile,
        clientId,
        setClientId,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
