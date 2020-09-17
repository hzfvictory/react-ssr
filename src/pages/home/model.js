import axios from "axios";

const menuHome = () => {
  return {
    namespace: 'menuHome',
    state: {
      msg: new Date().toLocaleTimeString(),
      data: [],
      total: 0,
      immediately: false
    },
    effects: {
      * getData({url, immediately}, {put, call, select}) {
        const prevData = yield select((state) => state.menuHome);
        // console.log(immediately, prevData.immediately, 1212);
        yield put({
          type: 'save',
          payload: {
            immediately
          },
        });
        /*
        * 在这个页面刷新使用的服务端渲染，客户端不请求
        * 从别的页面跳转进来客户端渲染
        * 点击页码等需要传请求数据
        * */
        if (prevData.immediately === false || immediately) {
          const {data: {data, total}} = yield call(() => axios('https://api.justcome.cn/admin/1068068178288054272/scenics?' + url))
          yield put({
            type: 'save',
            payload: {
              data,
              total
            },
          });
        }
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