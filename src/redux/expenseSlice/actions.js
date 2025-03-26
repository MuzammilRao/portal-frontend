import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post, get, patch, Delete } from '../../utils/fetch'; // Helper for HTTP requests (note: ensure 'del' is properly exported)

// 1. Categories APIs
export const addCategory = createAsyncThunk(
  'expense/addCategory',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`expense/categories`, payload))),
);

export const getCategories = createAsyncThunk(
  'expense/getCategories',
  () => new Promise((resolve, reject) => resolve(get(`expense/categories`))),
);

export const deleteCategory = createAsyncThunk(
  'expense/deleteCategory',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`expense/categories/${id}`))),
);

// 2. Expenses APIs
export const addExpense = createAsyncThunk(
  'expense/addExpense',
  ({ payload }) => new Promise((resolve, reject) => resolve(post(`expense/add`, payload))),
);

export const getAllExpenses = createAsyncThunk(
  'expense/getAllExpenses',
  ({ month, year }) =>
    new Promise((resolve, reject) => {
      const queryParams = [];
      if (month) queryParams.push(`month=${month}`);
      if (year) queryParams.push(`year=${year}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      resolve(get(`expense/get-all${queryString}`));
    }),
);

export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  ({ id, payload }) => new Promise((resolve, reject) => resolve(patch(`expense/${id}`, payload))),
);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  ({ id }) => new Promise((resolve, reject) => resolve(Delete(`expense/delete-expenses`,id))),
);

// 3. Opening Balance APIs
export const setOpeningBalance = createAsyncThunk(
  'expense/setOpeningBalance',
  ({ payload }) =>
    new Promise((resolve, reject) => resolve(post(`expense/opening-balance`, payload))),
);

export const getOpeningBalance = createAsyncThunk(
  'expense/getOpeningBalnces',
  ({ month, year }) =>
    new Promise((resolve, reject) => {
      const queryParams = [];
      if (month) queryParams.push(`month=${month}`);
      if (year) queryParams.push(`year=${year}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      resolve(get(`expense/opening-balance${queryString}`));
    }),
);

export const deleteOpeningBalance = createAsyncThunk(
  'expense/deleteOpeningBalance',
  ({ id, adjustFutureMonths = false }) => 
    new Promise((resolve, reject) => {
      // const queryParams = adjustFutureMonths ? '?adjustFutureMonths=true' : '?adjustFutureMonths=true';
      resolve(Delete(`expense/opening-balance`,id));
    }),
);

// 4. Reports APIs
export const getReports = createAsyncThunk(
  'expense/getReports',
  ({ month, year }) =>
    new Promise((resolve, reject) => {
      const queryParams = [];
      if (month) queryParams.push(`month=${month}`);
      if (year) queryParams.push(`year=${year}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      resolve(get(`expense/reports/get-all${queryString}`));
    }),
);

export const getReportsWithCategories = createAsyncThunk(
  'expense/getReportsWithCategories',
  ({ month, year }) =>
    new Promise((resolve, reject) => {
      const queryParams = [];
      if (month) queryParams.push(`month=${month}`);
      if (year) queryParams.push(`year=${year}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      resolve(get(`expense/reports/with-categories${queryString}`));
    }),
);

export const getMonthlySummary = createAsyncThunk(
  'expense/getMonthlySummary',
  ({ year }) =>
    new Promise((resolve, reject) => {
      const queryParams = [];
      if (year) queryParams.push(`year=${year}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      resolve(get(`expense/get-monthly-summary${queryString}`));
    }),
);