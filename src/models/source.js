
export default {

    namespace: 'source',
  
    state: {
        buffer: null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        state.name = 12222
      },
      saveBuffer(state, action) {
        const buffer = action.payload
        // console.log(buffer)
        state.buffer = buffer
      }
    },
  
  };
  