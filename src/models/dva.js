import {create} from 'dva-core';
import createLoading from 'dva-loading';
import models from './index';


export function createApp(opts) {

  const app = create(Object.assign({
    onError(e) { // 全局dispatch错误处理
      console.log(e);
    }
  }, opts));
  app.use(createLoading({}));
  models.forEach(model => app.model(model()));
  app.start();
  app.getStore = () => app._store;
  return app;
}


// 服务端的redux
export const getServerStore = () => {
  return createApp({
    initialState: {},
  });
}

// 客户端的redux
export const getClientStore = () => {
  // 需要先拿到服务端的数据
  const initialState = window.context ? window.context.state : {};

  const dvaClientApp = createApp({
    initialState,
  });

  // delete window.context;

  return dvaClientApp;
}

// 默认启动方式
export const getDefaultStore = createApp({
  initialState: {}
});