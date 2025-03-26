import { createAsyncThunk } from '@reduxjs/toolkit';
import { postWithoutToken } from '../../utils/fetch';

export const loginUser = createAsyncThunk(
  'auth/login',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(postWithoutToken(`users/login`, payload));
    }),
);
