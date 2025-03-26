import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  brands: [],
  total: 0,
  results: 0,
  singleBrand: null,
  isLoading: false,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setSingleBrandNull: (state) => {
      state.singleBrand = null;
    },
  },

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.addBrand, {
      onCompleted: (state, action) => {
        state.brands.push(action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.getAllBrands, {
      onCompleted: (state, action) => {
        state.brands = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });
    addCaseWithLoading(builder, Actions.getBrands, {
      onCompleted: (state, action) => {
        state.brands = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });

    addCaseWithLoading(builder, Actions.updateBrand, {
      onCompleted: (state, action) => {
        state.brands = state.brands.map((brand) =>
          brand._id === action.payload._id ? { ...brand, ...action.payload } : brand,
        );
      },
    });

    addCaseWithLoading(builder, Actions.getOneBrand, {
      onCompleted: (state, action) => {
        state.singleBrand = action.payload.data;
      },
    });

    addCaseWithLoading(builder, Actions.deleteBrand, {
      onCompleted: (state, action) => {
        state.brands = state.brands.filter((e) => e._id !== action.payload);
      },
    });
  },
});

export const { addBrand, getAllBrands, updateBrand, deleteBrand, getOneBrand, getBrands } = Actions;
export const { setSingleBrandNull } = brandSlice.actions;
export default brandSlice.reducer;
