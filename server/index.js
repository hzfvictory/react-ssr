import Koa from 'koa';
import React from "react";
import Router from "koa-router"
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import {renderRoutes, matchRoutes} from "react-router-config";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import {Helmet} from 'react-helmet';
import {Provider} from 'react-redux';

import store from '@/models/dva';
import routes from '@/router';
import {renderHTML} from "./tem"

const app = new Koa();
const route = new Router()


// 后台路由
route.get(["/:route?", /\/([\w|\d]+)\/.*/], (ctx) => {
  // 看看是否有这个路由
  const matchedRoutes = matchRoutes(routes.routes, ctx.path) || []
  if (ctx.path === '/' || !matchedRoutes.length) {
    // 如果找不到，重定向到home页面
    ctx.response.redirect('/home');
    return;
  }

  const css = new Set(); // 防止钩子函数执行两次
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
  const helmet = Helmet.renderStatic();

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.path}>
        <StyleContext.Provider value={{insertCss}}>
          {renderRoutes(routes.routes)}
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>
  )
  ctx.body = renderHTML(content, store, css, helmet)
})

// 中间件
app.use(require('koa-static')(process.cwd() + '/static'));
app.use(route.routes());
app.use(route.allowedMethods());


Loadable.preloadAll().then(() => {
  const server = app.listen('8082', () => {
    const {port} = server.address();
    console.log(`\x1B[33m\x1B[4mhttp://localhost:${port}\x1B[0m`)
  })
});
