import axios from "axios";

const menuHome = () => {
  return {
    namespace: 'menuHome',
    state: {
      msg: new Date().toLocaleTimeString(),
      data: [],
      total: 0,
    },
    effects: {
      * getData({url}, {put, call}) {
        const {data: {data, total}} = yield call(() => axios('https://api.justcome.cn/admin/1068068178288054272/scenics?' + url))
        yield put({
          type: 'save',
          payload: {
            data,
            total
          },
        });
      },
      * loadData({data, total}, {put, call}) {
        yield put({
          type: 'save',
          payload: {
            data,
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
  }

};

export default menuHome