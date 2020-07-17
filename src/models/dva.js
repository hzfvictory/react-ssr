import {create} from 'dva-core';
import createLoading from 'dva-loading';


export function createApp(opts) {
  const models = require("./index").default;

  const app = create(Object.assign({
    onError(e) { // 全局dispatch错误处理
      console.log(e);
    }
  }, opts));
  app.use(createLoading({}));

  models.forEach(model => app.model(model));
  return app;
}


// function createApp(opt) {
//   let app = create(opt);
//   app.use(createLoading({}));
//   models.forEach(model => app.model(model));
//   return app;
// }
//
// 服务端的redux
// export const dvaServerApp = () => {
//   const dvaServerApp = createApp({
//     initialState: {},
//   });
//
//   return dvaServerApp
// }

// 客户端的redux
// export const getClientStore = () => {
//   // 需要先拿到服务端的数据
//   const initialState = window.context ? window.context.state : {};
//
//   const dvaClientApp = createApp({
//     initialState,
//   });
//
//   dvaClientApp.start()
//   delete window.context;
//
//   return dvaClientApp._store;
// }

export const getStore = () => {
  const dvaApp = createApp({
    initialState: {}
  });
  dvaApp.start()
  return dvaApp._store;
}