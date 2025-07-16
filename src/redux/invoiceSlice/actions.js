import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, patch, post } from '../../utils/fetch';

export const getAllInvoices = createAsyncThunk(
  'invoice/getAllInvoices',
  async (filters, { rejectWithValue }) => {
    console.log('Fetching all invoices with filters:', filters);
    try {
      const response = await get(`admin/invoice`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneInvoiceAdmin = createAsyncThunk(
  'invoice/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`admin/invoice/${id}`))),
);

export const addInvoiceAdmin = createAsyncThunk(
  'invoice/addInvoice',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/invoice`, payload))),
);

export const updateInvoiceAdmin = createAsyncThunk(
  'invoice/updateInvoice',
  ({ id, payload }) =>
    new Promise((resolve, reject) => resolve(patch(`admin/invoice/${id}`, payload))),
);

export const deleteInvoiceAdmin = createAsyncThunk(
  'invoice/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`admin/invoice/`, id))),
);

export const getUserInvoices = createAsyncThunk(
  'invoice/getUserInvoices',
  async (filters, { rejectWithValue }) => {
    console.log('Fetching user invoices with filters:', filters);
    try {
      const response = await get(`invoices`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneInvoice = createAsyncThunk(
  'invoices/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`invoices/${id}`))),
);

export const addInvoice = createAsyncThunk(
  'invoices/addInvoice',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`invoices`, payload))),
);

export const updateInvoice = createAsyncThunk(
  'invoices/updateInvoice',
  ({ id, payload }) => new Promise((resolve, reject) => resolve(patch(`invoices/${id}`, payload))),
);

export const deleteInvoice = createAsyncThunk(
  'invoices/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`invoices/`, id))),
);

export const sendInvoice = createAsyncThunk(
  'invoice/send',
  ({ id }) => new Promise((resolve, reject) => resolve(post(`invoices/send/${id}`))),
);
