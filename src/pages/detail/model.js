import axios from "axios";

const scenicDetail = () => {
  return {
    namespace: 'scenicDetail',
    state: {
      msg: new Date().toLocaleTimeString(),
      data: {
        tags: [],
        address: {},
        photos: []
      }
    },
    effects: {
      * loadData({id}, {put, call}) {
        const {data: {data}} = yield call(() => axios(`https://api.justcome.cn/scenic/${id}?admin=true`));
        yield put({
          type: 'save',
          payload: {
            data
          }
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

export default scenicDetail