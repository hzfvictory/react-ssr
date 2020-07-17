import React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import {renderRoutes} from 'react-router-config'
import StyleContext from "isomorphic-style-loader/StyleContext";

import routes from "./router"

import {Provider} from 'react-redux'
import {getStore} from './models/dva';


const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss && style._insertCss());
  return () => removeCss.forEach(dispose => dispose && dispose())
}


function App() {
  return (
    <Provider store={getStore()}>
      <StyleContext.Provider value={{insertCss}}>
        <Router>
          <Switch>
            <Redirect from={'/'} exact to={'/menu/home'}/>;
            {renderRoutes(routes.routes)}
          </Switch>
        </Router>
      </StyleContext.Provider>
    </Provider>
  );
}

export default App;
