import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../utils/fetch';

export const getAllModules = createAsyncThunk(
  'module/getModules',
  () => new Promise((resolve, reject) => resolve(get(`admin/module`))),
);

export const addModule = createAsyncThunk(
  'module/addModule',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/module`, payload))),
);
