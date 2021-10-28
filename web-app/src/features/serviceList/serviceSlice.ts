import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from 'models/service';
import { RootState } from 'app/store';
import serviceApi from './serviceApi';
import { ServiceEvent } from 'models/event';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'components/appNotification/appNotificationSlice';
import i18n from 'i18next';

export const subscribeToEvents = (dispatch: any) => {
  console.log('Subscribe to events');
  const socket = new WebSocket('ws://localhost:8000/services/events');
  socket.addEventListener('open', function (event) {
    socket.send('New client');
  });

  socket.addEventListener('message', function (event) {
    dispatch(consumeEvent(JSON.parse(event.data)));
  });
};

export const loadServices = createAsyncThunk('services/getAll', async () => {
  const response = await serviceApi.getAllServices();
  return response.json();
});

export function deleteService(service: Service) {
  return async (dispatch: any) => {
    try {
      const response = await serviceApi.deleteService(service);
      if (response.ok) {
        dispatch(
          showSuccessNotification(i18n.t('Service deleted successfully'))
        );
      } else {
        dispatch(showErrorNotification(i18n.t('Error while deleting serice')));
      }
    } catch (error) {
      console.error({ error });
      dispatch(showErrorNotification(i18n.t('Error while deleting serice')));
    }
  };
}

export function editService(service: Service) {
  return async (dispatch: any) => {
    try {
      const response = await serviceApi.editService(service);
      if (response.ok) {
        dispatch(
          showSuccessNotification(i18n.t('Service edited successfully'))
        );
      } else {
        dispatch(showErrorNotification(i18n.t('Error while editing serice')));
      }
    } catch (error) {
      console.error({ error });
      dispatch(showErrorNotification(i18n.t('Error while editing serice')));
    }
  };
}

export function addService(service: Service) {
  return async (dispatch: any) => {
    try {
      const response = await serviceApi.addService(service);
      if (response.ok) {
        dispatch(
          showSuccessNotification(i18n.t('Service created successfully'))
        );
      } else {
        dispatch(showErrorNotification(i18n.t('Error while creating serice')));
      }
    } catch (error) {
      console.error({ error });
      dispatch(showErrorNotification(i18n.t('Error while creating serice')));
    }
  };
}

export interface ServiceListState {
  list: Service[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ServiceListState = {
  list: [],
  status: 'idle',
};

export const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    consumeEvent: (state, action) => {
      let data: ServiceEvent = action.payload;
      switch (data.type) {
        case 'create':
          state.list.push(data.source);
          break;
        case 'delete':
          const deleteIndex = state.list.findIndex(
            (x) => x.id === data.source.id
          );
          state.list.splice(deleteIndex, 1);
          break;
        case 'edit':
          const editIndex = state.list.findIndex(
            (x) => x.id === data.source.id
          );
          state.list.splice(editIndex, 1, data.source);
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadServices.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { consumeEvent } = serviceSlice.actions;

export const selectServices = (state: RootState) => state.services.list;
export const selectStatus = (state: RootState) => state.services.status;

export default serviceSlice.reducer;
