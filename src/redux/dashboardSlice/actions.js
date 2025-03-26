// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { get } from '../../utils/fetch';

// export const getDashboardReports = createAsyncThunk(
//   'dashboard/getReports',
//   () => new Promise((resolve, reject) => resolve(get(`dashboard`))),
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../utils/fetch';

export const getDashboardReports = createAsyncThunk('dashboard/getReports', async (params = {}) => {
  // Construct query string from params if they are present
  const queryParams = new URLSearchParams(params).toString();
  const url = `dashboard${queryParams ? `?${queryParams}` : ''}`;

  // Fetch data from the constructed URL
  return await get(url);
});
