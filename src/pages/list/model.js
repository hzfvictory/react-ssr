export default {
  namespace: 'menuHome',
  state: {
    data: [],
    total: 0
  },
  effects: {
    * getData({payload, total}, {put}) {
      yield put({
        type: 'save',
        payload: {
          data: payload,
          total
        },
      });
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
};
