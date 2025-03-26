import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, post, patch } from '../../utils/fetch';

export const inviteUser = createAsyncThunk(
  'user/inviteUser',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/invite`, payload))),
);

export const getAllUsers = createAsyncThunk('user/getAll', async (filters, { rejectWithValue }) => {
  try {
    const response = await get(`admin/user`, filters);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getOneUser = createAsyncThunk(
  'admin/getUser',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`admin/user/${id}`))),
);

export const addUser = createAsyncThunk(
  'user/addUser',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/user`, payload))),
);

export const updateUser = createAsyncThunk(
  'products/updateProduct',
  ({ id, payload }) =>
    new Promise((resolve, reject) => resolve(patch(`admin/user/${id}`, payload))),
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`admin/user/`, id))),
);
