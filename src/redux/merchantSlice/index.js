import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  merchants: [],
  total: 0,
  results: 0,
  singleMercant: null,
  isLoading: false,
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setSingleMerchantNull: (state) => {
      state.singleMercant = null;
    },
  },

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.getUserMerchants, {
      onCompleted: (state, action) => {
        state.merchants = action.payload.data.merchants;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });
  },
});

export const { getUserMerchants } = Actions;
export const { setSingleMerchantNull } = merchantSlice.actions;
export default merchantSlice.reducer;
