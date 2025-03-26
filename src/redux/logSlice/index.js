import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  logs: null,
  isLoading: false,
};

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.getAllLogs, {
      onCompleted: (state, action) => {
        state.logs = action.payload.data;
      },
    });
  },
});

export const { getAllLogs } = Actions;
export default logSlice.reducer;
