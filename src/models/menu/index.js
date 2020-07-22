const menuTree = () => {
  return {
    namespace: 'menuTree',
    state: {
      routes: []
    },
    effects: {
      * reset(payload, {call, put, select, update}) {
        const {routes} = yield select(state => state.menuTree);
        routes.push(111111)

        yield put({
          type: 'save',
          payload: {
            routes: [...routes]
          },
        });
      },
    },
    reducers: {
      save(state, {payload}) {
        return {...state, ...payload};
      },
    },
  }
};


export default menuTree