import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import serviceReducer from 'features/serviceList/serviceSlice';
import appNotificationReducer from 'components/appNotification/appNotificationSlice';

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    appNotification: appNotificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
