import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, post } from '../../utils/fetch';

export const getAllRoles = createAsyncThunk(
  'role/getRoles',
  () => new Promise((resolve, reject) => resolve(get(`admin/role`))),
);

export const addRole = createAsyncThunk(
  'role/addRole',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/role`, payload))),
);

export const deleteRole = createAsyncThunk(
  'role/deleteRole',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`admin/role/`, id))),
);
