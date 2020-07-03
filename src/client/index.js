import React from "react"
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Loadable from 'react-loadable';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import routes from '@/router';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose())
}

const App = () => {
  return (
    <Router>
      <div>
        {renderRoutes(routes.routes)}
      </div>
    </Router>
  )
};

const isMarkupPresent = document.getElementById('root').hasChildNodes();

let fn = isMarkupPresent ? ReactDom.hydrate : ReactDom.hydrate

Loadable.preloadReady().then(() => {
  fn(
    <StyleContext.Provider value={{insertCss}}>
      <App/>
    </StyleContext.Provider>, document.getElementById('root'));
})
