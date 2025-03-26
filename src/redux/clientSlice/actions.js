import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, patch, post } from '../../utils/fetch';

export const getAllClients = createAsyncThunk(
  'clients/allClients',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`admin/client`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneClientAdmin = createAsyncThunk(
  'client/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`admin/client/${id}`))),
);

export const addClientAdmin = createAsyncThunk(
  'client/addClient',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/client`, payload))),
);

export const updateClientAdmin = createAsyncThunk(
  'client/updateClient',
  ({ id, payload }) =>
    new Promise((resolve, reject) => resolve(patch(`admin/client/${id}`, payload))),
);

export const deleteClientAdmin = createAsyncThunk(
  'client/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`admin/client/`, id))),
);

export const getUserClients = createAsyncThunk(
  'clients/userClients',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`clients`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneClient = createAsyncThunk(
  'clients/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`clients/${id}`))),
);

export const addClient = createAsyncThunk(
  'clients/addClient',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`clients`, payload))),
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  ({ id, payload }) => new Promise((resolve, reject) => resolve(patch(`clients/${id}`, payload))),
);

export const deleteClient = createAsyncThunk(
  'clients/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`clients/`, id))),
);
