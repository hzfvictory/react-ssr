import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn'

ReactDOM.render(
  <ConfigProvider
    autoInsertSpaceInButton={true}
    locale={zhCN}>
    <App/>
  </ConfigProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
