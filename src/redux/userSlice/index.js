import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  users: [],
  total: 0,
  results: 0,
  singleUser: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.inviteUser, {
      onCompleted: (state, action) => {},
    });

    addCaseWithLoading(builder, Actions.addUser, {
      onCompleted: (state, action) => {
        state.users.push(action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.getAllUsers, {
      onCompleted: (state, action) => {
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });

    addCaseWithLoading(builder, Actions.updateUser, {
      onCompleted: (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? { ...user, ...action.payload } : user,
        );
      },
    });

    addCaseWithLoading(builder, Actions.getOneUser, {
      onCompleted: (state, action) => {
        state.singleUser = action.payload;
      },
    });

    addCaseWithLoading(builder, Actions.deleteUser, {
      onCompleted: (state, action) => {
        state.users = state.users.filter((e) => e._id !== action.payload);
      },
    });
  },
});

export const { getAllUsers, addUser, deleteUser, inviteUser, updateUser, getOneUser } = Actions;
export default userSlice.reducer;
