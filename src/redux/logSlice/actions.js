import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../utils/fetch';

export const getAllLogs = createAsyncThunk('logs/getAllLogs', async (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `logs${queryParams ? `?${queryParams}` : ''}`;

  return await get(url);
});
