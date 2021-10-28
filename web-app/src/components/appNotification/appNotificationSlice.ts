import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface AppNotificationState {
  isOpen: boolean;
  message: string;
  type?: 'error' | 'success' | 'warning';
}

const initialState: AppNotificationState = {
  isOpen: false,
  message: '',
};

export const appNotificationSlice = createSlice({
  name: 'appNotification',
  initialState,
  reducers: {
    showSuccessNotification: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.type = 'success';
    },
    showErrorNotification: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.type = 'error';
    },
    showWarningNotification: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.type = 'warning';
    },
    hideAppNotification: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const {
  showSuccessNotification,
  showErrorNotification,
  showWarningNotification,
  hideAppNotification,
} = appNotificationSlice.actions;

export const selectIsOpen = (state: RootState) => state.appNotification.isOpen;

export const selectMessage = (state: RootState) =>
  state.appNotification.message;

export const selectType = (state: RootState) => state.appNotification.type;

export default appNotificationSlice.reducer;
