import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.loginUser, {
      onCompleted: (state, action) => {
        state.isLoading = false;
      },
      onPending: (state) => {
        state.isLoading = true;
      },
      onReject: (state, error) => {
        console.log(error);
        state.isLoading = false;
      },
    });
  },
});

export const { loginUser } = Actions;
export default authSlice.reducer;
