import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, patch, post } from '../../utils/fetch';

export const getAllBrands = createAsyncThunk(
  'brand/getAllBrands',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`admin/brand`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getBrands = createAsyncThunk(
  'brand/getBrands',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`brands`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneBrand = createAsyncThunk(
  'brand/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`admin/brand/${id}`))),
);

export const addBrand = createAsyncThunk(
  'brands/addBrand',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/brand`, payload))),
);

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  ({ id, payload }) =>
    new Promise((resolve, reject) => resolve(patch(`admin/brand/${id}`, payload))),
);

export const deleteBrand = createAsyncThunk(
  'brand/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`admin/brand/`, id))),
);
