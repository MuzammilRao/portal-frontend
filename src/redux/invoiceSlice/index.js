import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  invoices: [],
  total: 0,
  results: 0,
  singleInvoice: null,
  isLoading: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setSingleInvoiceNull: (state) => {
      state.singleInvoice = null;
    },
  },

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.addInvoiceAdmin, {
      onCompleted: (state, action) => {
        state.invoices.push(action.payload);
      },
    });
    addCaseWithLoading(builder, Actions.addInvoice, {
      onCompleted: (state, action) => {
        state.invoices.push(action.payload);
      },
    });
    addCaseWithLoading(builder, Actions.sendInvoice, {
      onCompleted: (state, action) => {
        state.isLoading = false;
      },
      onPending: (state) => {
        state.isLoading = true;
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });

    addCaseWithLoading(builder, Actions.getAllInvoices, {
      onCompleted: (state, action) => {
        state.invoices = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });
    addCaseWithLoading(builder, Actions.getUserInvoices, {
      onCompleted: (state, action) => {
        state.invoices = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });

    addCaseWithLoading(builder, Actions.updateInvoiceAdmin, {
      onCompleted: (state, action) => {
        state.invoices = state.invoices.map((invoice) =>
          invoice._id === action.payload.data._id
            ? { ...invoice, ...action.payload.data }
            : invoice,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });
    addCaseWithLoading(builder, Actions.updateInvoice, {
      onCompleted: (state, action) => {
        state.invoices = state.invoices.map((invoice) =>
          invoice._id === action.payload.data._id
            ? { ...invoice, ...action.payload?.data }
            : invoice,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });

    addCaseWithLoading(builder, Actions.getOneInvoiceAdmin, {
      onCompleted: (state, action) => {
        state.singleInvoice = action.payload.data;
      },
    });
    addCaseWithLoading(builder, Actions.getOneInvoice, {
      onCompleted: (state, action) => {
        state.singleInvoice = action.payload.data;
      },
    });

    addCaseWithLoading(builder, Actions.deleteInvoiceAdmin, {
      onCompleted: (state, action) => {
        state.invoices = state.invoices.filter((e) => e._id !== action.payload);
      },
    });
    addCaseWithLoading(builder, Actions.deleteInvoice, {
      onCompleted: (state, action) => {
        state.invoices = state.invoices.filter((e) => e._id !== action.payload);
      },
    });
  },
});

export const {
  addInvoice,
  addInvoiceAdmin,
  deleteInvoice,
  deleteInvoiceAdmin,
  getAllInvoices,
  getOneInvoice,
  getOneInvoiceAdmin,
  getUserInvoices,
  updateInvoice,
  sendInvoice,
  updateInvoiceAdmin,
} = Actions;
export const { setSingleInvoiceNull } = invoiceSlice.actions;
export default invoiceSlice.reducer;
