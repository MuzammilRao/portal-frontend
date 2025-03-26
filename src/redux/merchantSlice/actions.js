import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, patch, post } from '../../utils/fetch';

export const getUserMerchants = createAsyncThunk(
  'merchant/getUsermerchants',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`users/merchants`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
