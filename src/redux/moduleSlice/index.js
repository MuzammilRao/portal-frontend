import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  modules: [],
  loading: false,
  isLoading: false,
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.getAllModules, {
      onCompleted: (state, action) => {
        state.modules = action.payload.data;
      },
    });
  },
});

export const { getAllModules } = Actions;
export default moduleSlice.reducer;
