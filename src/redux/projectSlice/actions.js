import { createAsyncThunk } from '@reduxjs/toolkit';
import { Delete, get, patch, post } from '../../utils/fetch';

export const getAllProjects = createAsyncThunk(
  'project/getAllProjects',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`admin/project`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneProjectAdmin = createAsyncThunk(
  'project/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`admin/project/${id}`))),
);

export const addProjectAdmin = createAsyncThunk(
  'project/addProject',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`admin/project`, payload))),
);

export const updateProjectAdmin = createAsyncThunk(
  'project/updateProject',
  ({ id, payload }) =>
    new Promise((resolve, reject) => resolve(patch(`admin/project/${id}`, payload))),
);

export const deleteProjectAdmin = createAsyncThunk(
  'project/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`admin/project/`, id))),
);

// ---------------------------------------------------------------------------------------//
export const addProject = createAsyncThunk(
  'projects/addProject',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`projects`, payload))),
);

export const getUserProjects = createAsyncThunk(
  'project/getUserProjects',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await get(`projects`, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOneProject = createAsyncThunk(
  'projects/getOne',
  ({ id }) => new Promise((resolve, reject) => resolve(get(`projects/${id}`))),
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  ({ id, payload }) => new Promise((resolve, reject) => resolve(patch(`projects/${id}`, payload))),
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`projects/`, id))),
);
