import {create} from 'dva-core';
// import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import models from "./index";

let app;
let store;
let dispatch;

function createApp(opt) {
  // redux日志
  // opt.onAction = [createLogger()];
  app = create(opt);
  app.use(createLoading({}));

  opt.models.forEach(model => app.model(model));
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  window.g_app = app;
  return app;
}


const dvaApp = createApp({
  initialState: {},
  models: models,
});
const stores = dvaApp.getStore();

export default stores
