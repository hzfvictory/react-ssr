import React from "react"
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Loadable from 'react-loadable';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import {Provider} from 'react-redux';
import {createApp} from '@/models/dva';
import routes from '@/router';
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import 'dayjs/locale/zh-cn'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss && style._insertCss());
  return () => removeCss.forEach(dispose => dispose && dispose())
}

// 需要先拿到服务端的数据
const initialState = window.context ? window.context.state : {};
const app = createApp({
  initialState,
});
app.start()
delete window.context;

const App = () => {
  return (
    <Router>
      <Switch>
        {renderRoutes(routes.routes)}
      </Switch>
    </Router>
  )
};

const isMarkupPresent = document.getElementById('root').hasChildNodes();

let fn = isMarkupPresent ? ReactDom.render : ReactDom.hydrate

Loadable.preloadReady().then(() => {
  fn(
    <Provider store={app._store}>
      <StyleContext.Provider value={{insertCss}}>
        <ConfigProvider
          autoInsertSpaceInButton={true}
          locale={zhCN}>
          <App/>
        </ConfigProvider>
      </StyleContext.Provider>
    </Provider>, document.getElementById('root'));
})
