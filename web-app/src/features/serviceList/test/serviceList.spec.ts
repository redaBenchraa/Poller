import serviceListReducer, {
  consumeEvent,
  ServiceListState,
} from '../serviceSlice';

describe('serviceList reducer', () => {
  const initialState: ServiceListState = {
    list: [
      { name: 'Google', alive: false, url: 'http://www.google.com', id: '1' },
    ],
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(serviceListReducer(undefined, { type: 'unknown' })).toEqual({
      list: [],
      status: 'idle',
    });
  });

  it('should handle add event', () => {
    const actual = serviceListReducer(
      initialState,
      consumeEvent({
        type: 'create',
        source: {
          name: 'Youtube',
          alive: true,
          url: 'http://www.youtube.com',
          id: '2',
        },
      })
    );
    expect(actual.list.length).toEqual(2);
    expect(actual.list[1].name).toEqual('Youtube');
  });

  it('should handle edit event', () => {
    const actual = serviceListReducer(
      initialState,
      consumeEvent({
        type: 'edit',
        source: {
          name: 'Youtube',
          alive: true,
          url: 'http://www.youtube.com',
          id: '1',
        },
      })
    );
    expect(actual.list.length).toEqual(1);
    expect(actual.list[0].name).toEqual('Youtube');
    expect(actual.list[0].url).toEqual('http://www.youtube.com');
    expect(actual.list[0].alive).toEqual(true);
  });

  it('should handle delete event', () => {
    const actual = serviceListReducer(
      initialState,
      consumeEvent({
        type: 'delete',
        source: {
          name: 'Google',
          alive: false,
          url: 'http://www.google.com',
          id: '1',
        },
      })
    );
    expect(actual.list.length).toEqual(0);
  });
});
