import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  clients: [],
  total: 0,
  results: 0,
  singleClient: null,
  isLoading: false,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setSingleClientNull: (state) => {
      state.singleClient = null;
    },
  },

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.addClientAdmin, {
      onCompleted: (state, action) => {
        state.clients.push(action.payload);
      },
    });
    addCaseWithLoading(builder, Actions.addClient, {
      onCompleted: (state, action) => {
        state.clients.push(action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.getAllClients, {
      onCompleted: (state, action) => {
        state.clients = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });
    addCaseWithLoading(builder, Actions.getUserClients, {
      onCompleted: (state, action) => {
        state.clients = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });

    addCaseWithLoading(builder, Actions.updateClientAdmin, {
      onCompleted: (state, action) => {
        state.clients = state.clients.map((client) =>
          client._id === action.payload._id ? { ...client, ...action.payload } : client,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });
    addCaseWithLoading(builder, Actions.updateClient, {
      onCompleted: (state, action) => {
        state.clients = state.clients.map((client) =>
          client._id === action.payload._id ? { ...client, ...action.payload } : client,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });

    addCaseWithLoading(builder, Actions.getOneClientAdmin, {
      onCompleted: (state, action) => {
        state.singleClient = action.payload.data;
      },
    });
    addCaseWithLoading(builder, Actions.getOneClient, {
      onCompleted: (state, action) => {
        state.singleClient = action.payload.data;
      },
    });

    addCaseWithLoading(builder, Actions.deleteClientAdmin, {
      onCompleted: (state, action) => {
        state.clients = state.clients.filter((e) => e._id !== action.payload);
      },
    });
    addCaseWithLoading(builder, Actions.deleteClient, {
      onCompleted: (state, action) => {
        state.clients = state.clients.filter((e) => e._id !== action.payload);
      },
    });
  },
});

export const {
  addClientAdmin,
  addClient,
  getAllClients,
  getUserClients,
  updateClientAdmin,
  updateClient,

  deleteClientAdmin,
  deleteClient,
  getOneClientAdmin,
  getOneClient,
} = Actions;
export const { setSingleClientNull } = clientSlice.actions;
export default clientSlice.reducer;
