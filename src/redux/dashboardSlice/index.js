import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  reports: null,
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.getDashboardReports, {
      onCompleted: (state, action) => {
        // console.log('dashboardReports', action.payload);
        state.reports = action.payload.data;
      },
    });
  },
});

export const { getDashboardReports } = Actions;
export default dashboardSlice.reducer;
