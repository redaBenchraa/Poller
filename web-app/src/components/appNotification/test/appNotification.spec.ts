import appNotificationReducer, {
  showSuccessNotification,
  showErrorNotification,
  showWarningNotification,
  hideAppNotification,
  AppNotificationState,
} from '../appNotificationSlice';

describe('appnotification reducer', () => {
  const initialState: AppNotificationState = {
    isOpen: false,
    message: '',
  };

  it('should handle initial state', () => {
    expect(appNotificationReducer(undefined, { type: 'unknown' })).toEqual({
      isOpen: false,
      message: '',
    });
  });

  it('should handle show success notification', () => {
    const actual = appNotificationReducer(
      initialState,
      showSuccessNotification('message')
    );
    expect(actual.isOpen).toEqual(true);
    expect(actual.message).toEqual('message');
    expect(actual.type).toEqual('success');
  });

  it('should handle show error notification', () => {
    const actual = appNotificationReducer(
      initialState,
      showErrorNotification('message')
    );
    expect(actual.isOpen).toEqual(true);
    expect(actual.message).toEqual('message');
    expect(actual.type).toEqual('error');
  });

  it('should handle show warning notification', () => {
    const actual = appNotificationReducer(
      initialState,
      showWarningNotification('message')
    );
    expect(actual.isOpen).toEqual(true);
    expect(actual.message).toEqual('message');
    expect(actual.type).toEqual('warning');
  });

  it('should handle hide app notification', () => {
    const actual = appNotificationReducer(initialState, hideAppNotification());
    expect(actual.isOpen).toEqual(false);
    expect(actual.message).toEqual('');
  });
});
