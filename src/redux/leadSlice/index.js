import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  leads: [],
  total: 0,
  results: 0,
  singleLead: null,
  isLoading: false,
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setSingleLeadNull: (state) => {
      state.singleLead = null;
    },
  },

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.addLead, {
      onCompleted: (state, action) => {
        state.leads.push(action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.getAllLeads, {
      onCompleted: (state, action) => {
        state.leads = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });
    addCaseWithLoading(builder, Actions.getUserLeads, {
      onCompleted: (state, action) => {
        state.leads = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });

    addCaseWithLoading(builder, Actions.updateLead, {
      onCompleted: (state, action) => {
        state.leads = state.leads.map((lead) =>
          lead._id === action.payload._id ? { ...lead, ...action.payload } : lead,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });

    addCaseWithLoading(builder, Actions.getOneLead, {
      onCompleted: (state, action) => {
        state.singleLead = action.payload.data;
      },
    });

    addCaseWithLoading(builder, Actions.deleteLead, {
      onCompleted: (state, action) => {
        state.leads = state.leads.filter((e) => e._id !== action.payload);
      },
    });
  },
});

export const { addLead, getAllLeads, updateLead, deleteLead, getOneLead, getUserLeads } = Actions;
export const { setSingleLeadNull } = leadSlice.actions;
export default leadSlice.reducer;
