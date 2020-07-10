import React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import {renderRoutes} from 'react-router-config'
import routes from "./router"

import {Provider} from 'react-redux'
import {getStore} from './models/dva';

import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={getStore()}>
      <Router>
        <Switch>
          <Redirect from={'/'} exact to={'/home'}/>;
          {renderRoutes(routes.routes)}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
