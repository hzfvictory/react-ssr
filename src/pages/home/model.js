import axios from "axios";

const menuHome = () => {
  return {
    namespace: 'menuHome',
    state: {
      msg: new Date().toLocaleTimeString(),
      data: [],
      total: 0,
      url: ''
    },
    effects: {
      * getData({url}, {put, call, select}) {
        const prevData = yield select((state) => state.menuHome)
        if (url === prevData.url) return;
        const {data: {data, total}} = yield call(() => axios('https://api.justcome.cn/admin/1068068178288054272/scenics?' + url))
        yield put({
          type: 'save',
          payload: {
            data,
            total,
            url
          },
        });
      }
    },
    reducers: {
      save(state, {payload}) {
        return {...state, ...payload};
      },
    },
  }
};

export default menuHome