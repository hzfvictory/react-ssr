import Koa from 'koa';
import httpProxy from 'http-proxy-middleware';
import k2c from "koa2-connect"
import React from "react";
import Router from "koa-router"
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import {renderRoutes, matchRoutes} from "react-router-config";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import {Helmet} from 'react-helmet';
import {Provider} from 'react-redux';
import routes from '@/router';
import {getServerStore} from "@/models/dva"
import {renderHTML} from "./tem"

// const open = require('open');
const app = new Koa();
const route = new Router()


// 后台路由
route.get(["/:route?", /\/([\w|\d]+)\/.*/], async (ctx) => {

  const store = getServerStore().getStore();

  // 看看是否有这个路由
  const matchedRoutes = matchRoutes(routes.routes, ctx.path) || [];

  if (ctx.path === '/') {
    // 如果找不到，重定向到home页面
    ctx.response.redirect('/menu/home');
    return;
  }

  // 判断404
  let hasRoute = matchedRoutes.length === 1 && !!matchedRoutes[0].route.routes
  if (hasRoute || !matchedRoutes.length || typeof matchedRoutes[0].route === 'number') {
    ctx.response.redirect('/404');
    return;
  }

  // 很重要【那几个页面一定需要服务端渲染，确保从别的页面进来，数据已经渲染好,还要保证如果是当前记得去重】
  const SEOPAGE = ['/menu/home'];
  // const SEOPAGE = [];

  const routerAry = []

  SEOPAGE
    .filter((item => item !== ctx.path))
    .map((item) => {
      routerAry.push(...matchRoutes(routes.routes, item))
    })

  const promises = [];
  [...matchedRoutes, ...routerAry].forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        // 这里用了.then 所以组件里面必须使用async或者promise
        item.route.loadData(store).then(resolve).catch(reject)
      })
      promises.push(promise);
    }
  });

  await Promise.all(promises).then(() => {
    const css = new Set(); // 防止钩子函数执行两次
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
    const helmet = Helmet.renderStatic();
    const content = renderToStaticMarkup(
      <Provider store={store}>
        <StyleContext.Provider value={{insertCss}}>
          <StaticRouter location={ctx.path}>
            <Switch>
              <div>
                {renderRoutes(routes.routes)}
              </div>
            </Switch>
          </StaticRouter>
        </StyleContext.Provider>
      </Provider>
    )
    ctx.body = renderHTML(content, store, css, helmet)
  })
})

// 中间件
app.use(require('koa-static')(process.cwd() + '/static'));
// 转发代理，注意中间件顺序
app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) { //匹配有api字段的请求url
    ctx.respond = false // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
    await k2c(httpProxy({
        target: 'https://api.justcome.cn/scenic/1/events?offset=0&limit=10&admin=true&status=all&start_status=all&type=all',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    ))(ctx, next);
  }
  await next()
})
app.use(route.routes());
app.use(route.allowedMethods());

Loadable.preloadAll().then(() => {
  const server = app.listen('9999', () => {
    const {port} = server.address();
    console.log(`\x1B[33m\x1B[4mhttp://localhost:${port}\x1B[0m`)
    // open(`http://localhost:${port}`, {app: ['google chrome', '--incognito']});
  })
});
