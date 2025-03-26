import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, patch, post } from '../../utils/fetch';

export const getAllLeads = createAsyncThunk(
  'lead/getAllLeads',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`leads`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getUserLeads = createAsyncThunk(
  'lead/getUserLeads',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`leads/user/all`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneLead = createAsyncThunk(
  'lead/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`leads/${id}`))),
);

export const addLead = createAsyncThunk(
  'leads/addLead',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`leads`, payload))),
);

export const updateLead = createAsyncThunk(
  'lead/updateLead',
  ({ id, payload }) => new Promise((resolve, reject) => resolve(patch(`leads/${id}`, payload))),
);

export const deleteLead = createAsyncThunk(
  'lead/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`leads/`, id))),
);
