import { configureStore } from '@reduxjs/toolkit';
import moduleReducer from './moduleSlice';
import roleReducer from './roleSlice';
import userReducer from './userSlice';
import leadReducer from './leadSlice';
import brandReducer from './brandSlice';
import clientReducer from './clientSlice';
import projectSlice from './projectSlice';
import merchantSlice from './merchantSlice';
import invoiceSlice from './invoiceSlice';
import authSlice from './authSlice';
import dashboardSlice from './dashboardSlice/index';
import logSlice from './logSlice/index.js';
import expenseSlice from './expenseSlice';

export const store = configureStore({
  reducer: {
    module: moduleReducer,
    role: roleReducer,
    user: userReducer,
    lead: leadReducer,
    brand: brandReducer,
    client: clientReducer,
    project: projectSlice,
    merchant: merchantSlice,
    invoice: invoiceSlice,
    auth: authSlice,
    dashboard: dashboardSlice,
    logs: logSlice,
    expense: expenseSlice,
  },
});
