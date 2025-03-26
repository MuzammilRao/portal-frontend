import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  roles: [],

  isLoading: false,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.addRole, {
      onCompleted: (state, action) => {
        state.roles.push(action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.getAllRoles, {
      onCompleted: (state, action) => {
        state.roles = action.payload.data;
      },
    });
    addCaseWithLoading(builder, Actions.deleteRole, {
      onCompleted: (state, action) => {
        state.roles = state.roles.filter((e) => e._id != action.payload);
      },
    });
  },
});

export const { getAllRoles, addRole } = Actions;
export default roleSlice.reducer;
