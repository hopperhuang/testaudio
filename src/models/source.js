
export default {

    namespace: 'source',
  
    state: {
        name: 'source'
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
        console.log('bbbd')
        return { name: 'abc' };
      },
      saveBuffer(state, action) {
        console.log(action)
        return { name: 2333 }
      }
    },
  
  };
  