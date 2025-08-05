import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../slice/dashboard/slice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});