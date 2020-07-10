# react-ssr服务端调研调研

**完善中...........**


### 技术栈

react react-router-dom dva-core 

#### react-router-config

路由模仿vue-router，方便开发

#### react-loadable

路由按需加载



## 正片：

## React SSR

传统CSR的弊端：

1. 由于页面显示过程要进行JS文件拉取和React代码执行，首屏加载时间会比较慢。
2. 对于SEO(Search Engine Optimazition,即搜索引擎优化)，完全无能为力，因为搜索引擎爬虫只认识html结构的内容，而不能识别JS代码内容。

SSR的出现，就是为了解决这些传统CSR的弊端。



### 方案筛选

- [nextjs]([https://nextjs.frontendx.cn/docs/#%E5%AE%89%E8%A3%85](https://nextjs.frontendx.cn/docs/#安装)),成本低，安心的写页面就行了，无需过多关心服务端路由
- 秉承学习的态度，了解下原理，选择了自己去搭，（中间断了一段时间，现在又重新拾起来），曾经看到有人用react + redux + Express 搭SSR的文章，所以基于对dva的熟悉与钟爱，就直接选择了dva-core做状态管理搭建。



### koa实现基础版本的SSR



#### 不使用koa-router

```javascript
const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  if (ctx.path === '/') {
    ctx.body =
      `
     <html>
       <head>
         <title>hello</title>
       </head>
       <body>
         <h1>hello</h1>
         <p>world</p>
       </body>
     </html>
     `;
  }
})
app.listen('8082', () => {
  console.log(`http://localhost:8082`)
})
```

#### 使用koa-router

```javascript
const Koa = require('koa');
const app = new Koa();
const route = require("koa-router")() // 这里也可以使用构造函数

route.get("/", (ctx) => {
  ctx.body =
    `
    <html>
       <head>
         <title>hello</title>
       </head>
       <body>
         <h1>hello</h1>
         <p>world</p>
       </body>
     </html>
    `
})

app.use(route.routes());
app.use(route.allowedMethods()); //自动设置响应头ctx.status完善response响应头

app.listen('8082', () => {
  console.log(`http://localhost:8082`)
})
```



### 实现react组件的服务端渲染

> 下面需要用到的新插件，提前了解下；

- [npm-run-all](https://github.com/mysticatea/npm-run-all)
- [webpack-node-externals](https://github.com/liady/webpack-node-externals)
- [isomorphic-style-loader](https://www.jianshu.com/p/2602438855a8)
- @babel/plugin-proposal-class-properties



------------

到这一步已经不能直接用nodemon启动服务了，因为没有`babel`,`React`不会转化成`createElement`形式的`虚拟dom`,而且使用node不能直接使用import导入方式，所以这个时候需要配合webpack,把所有js打包成createElement,然后再用`react-dom/server`的`renderToString`打包成html，然后在服务端渲染，看一下具体代码。

```javascript
// config/webpack.base.js
const path = require('path')

module.exports = {
  module: {
    rules: [{
      test: /\.js|jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-react', ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions']
          }
        }]]
      }
    }]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src')
    },
    // 省略后缀
    extensions: ['.js', '.jsx', '.less', '.json', '.css'],
  },
}
```



服务端运行的代码如果需要依赖 Node 核心模块或者第三方模块，就不再需要把客户端的一些模块代码打包到最终代码中了。因为环境已经安装这些依赖，可以直接引用。这样一来，就需要我们在 webpack 中配置：target：node，并借助 webpack-node-externals 插件，解决第三方依赖打包的问题。

```javascript
// webpack.server.js
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base')

const serverConfig = {
  target: 'node', 
  mode: 'development',
  entry: './src/server/index.js',
  // https://webpack.docschina.org/configuration/externals/
  externals: [nodeExternals()], // 为了忽略node_modules文件夹中的所有模块
  module: {
    rules: [{
      test: /\.css?$/,
      use: ['isomorphic-style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
}

module.exports = merge(config, serverConfig)
```

```javascript
// src/server/index.js
import Koa from 'koa';
import Router from "koa-router"
import React from "react";
import {renderToString} from 'react-dom/server';

import Home from "../src/pages/home"

const app = new Koa();
const route = new Router()

const content = renderToString(<Home/>);

route.get("/", (ctx) => {
  ctx.body =
    `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
    `
})

app.use(route.routes());
app.use(route.allowedMethods());

app.listen('8082', () => {
  console.log(`http://localhost:8082`)
})
```

```javascript
// package.json
"scripts": {
     //....
    "dev": "npm-run-all --parallel dev:build:server dev:start",
    "dev:build:server": "webpack --config config/webpack.server.js --watch",
    "dev:start": "nodemon ./dist/bundle.js"
}
```



执行`yarn dev` ,打开[http://localhost:8082/](http://localhost:8082/),到此，就初步实现了一个React组件是服务端渲染，还支持`alias`的别名,但组件`Home`里面的一些数据请求和一些方法并没有执行，接下来一步一步完善。



### 同构

要解决上面上面的问题，就需要同构了，所谓同构，通俗的讲，就是一套React代码在服务器上运行一遍，到达浏览器又运行一遍。服务端渲染完成页面结构，浏览器端渲染完成事件绑定（客户端协调阶段时候会进行比对，如果一样则不渲染了）。



#### 客户端针对路由打包JS

所以我们要用到react-dom的`hydrate`

```javascript
// src/client/index.js
import React, {Component} from "react"
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Loadable from 'react-loadable';

import routes from '../router';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {renderRoutes(routes.routes)}
        </div>
      </Router>
    )
  }
}

Loadable.preloadReady().then(() => {
  ReactDom.hydrate(
    <App/>, document.getElementById('root'));
})
```

[ReactDom.hydrate](https://www.zhihu.com/question/66068748)



hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程。**

说白了`render` 标签上没有唯一的属性，但是要尽可能复用 SSR 的 HTML 结构,所以就出现了`hydrate()`,但是目前两者都是可以用的，17版本`render`就不在支持`ssr`



**然后用webpack将其编译打包成index.js:**

```javascript
//webpack.client.js
const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {ReactLoadablePlugin} = require('react-loadable/webpack');
const {OUTPUTCLIENT} = require("./outputPath")

const outputPath = `../${OUTPUTCLIENT}`

const clientConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/client/index.js'),
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
          }
        }]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          outputPath:outputPath,
          publicPath: '/'
        }
      }
    ]
  },
  output: {
    filename: 'index.[chunkhash:6].js', // 这里我用的hash，目的是防止缓存
    path: path.resolve(__dirname, outputPath),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),// 不清空会重复添加，不用hash ，不用添加这个插件
    new ReactLoadablePlugin({// 暂时用不到
      filename: path.resolve(__dirname, outputPath + '/react-loadable.json'),
    }),
  ]
}

module.exports = merge(config, clientConfig)
```

然后在上面的`package.json`,里面添加`    "dev:build:client": "webpack --config webpack.client.js --watch" `，就能对浏览器用到的一些js完成打包。



#### 服务端的路由逻辑

```javascript
// server/index.js
import Koa from 'koa';
import React from "react";
import Router from "koa-router"
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import routes from '@/router';
import {renderRoutes, matchRoutes} from "react-router-config";

import {renderHTML} from "./tem"

const app = new Koa();
const route = new Router()

route.get(["/:all?", /\/([\w|\d]+)\/.*/], (ctx) => {
  // ctx.body = JSON.parse(JSON.stringify(ctx.path))
  if (ctx.path === '/') {
    ctx.response.redirect('/home');
    return;
  }

  const content = renderToString(
    // 重点是这
    <StaticRouter location={ctx.path}>
      <div>
        {renderRoutes(routes.routes)}
      </div>
    </StaticRouter>
  );

  ctx.body = renderHTML(content, {})
})

app.use(require('koa-static')(process.cwd() + '/static'));
app.use(route.routes());
app.use(route.allowedMethods());

Loadable.preloadAll().then(() => {
  const server = app.listen('8082', () => {
    const {port} = server.address();
    console.log(`\x1B[33m\x1B[4mhttp://localhost:${port}\x1B[0m`)
  })
});
```

```javascript
// server/tem.js
const glob = require('glob');
let project = glob.sync(process.cwd() + '/static/index.*.js');


let path = project[0].split('/')

export const renderHTML = (content, store) => `
  <!DOCTYPE html>
    <html lang="zh">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#000000">
        <title>ssr</title>
      </head>
      <body>
      <div id="root">${content}</div>
      <script>
        window.context = {
          state: ${JSON.stringify(store)}
        }
      </script>
      <script src=/${path[path.length - 1]}></script> // 这个 '/' 一定要添加，坑了好久
      </body>
  </html>
`
```





### CSS样式问题处理



正常的服务端渲染只是返回了 HTML 字符串，样式需要浏览器加载完 CSS 后才会加上，这个样式添加的过程就`会造成页面的闪动`，所以在服务端里面直接添加需要引用的CSS。

我们不能再使用 style-loader 了，因为这个 webpack loader 会在编译时将样式模块载入到 HTML header 中。但是在服务端渲染环境下，没有 window 对象，style-loader 进而会报错。一般我们换用 isomorphic-style-loader ,同时 isomorphic-style-loader 也会解决页面样式闪动的问题，它的原理也不难理解：isomorphic-style-loader 利用 context API，在渲染页面组件时获取所有 React 组件的样式信息，在服务器端输出 html 字符串的同时，也将样式插入到 html 字符串当中，将结果一同传送到客户端。



这里说下调研的两种方法，说是两种方法其实是两种模式，一种是全部采用导入到head里面，一种是客户端采用外链式，服务端采用 导入到head里面。



#### 客户端采用外链式，服务端采用导入到head里面

好处是客户端不需要额外的配置，直接使用style-laoder,更加兼容框架自带的启动方式。

需要自己编写高阶函数就简化应用，**注意** `componentDidMount`和`useEffect`都是在客户端加载的，导入css不能使用此方法。

```javascript
// webpack.server.js
{
   test: /\.css$/,
     exclude: /node_modules|antd\.css/,
       use: [
         'isomorphic-style-loader',
         {
           loader: 'css-loader',
           options: {
             modules: true,
           }
         }
       ]
 }
```

**服务端首页**配置

客户端不需要额外的配置维持现状就好。

```javascript
const context = {css: []}
// 是在路由里面声明的，所以路由每次改变他都会重新的执行，所以不会出现有上一个页面的css的问题。

const content = renderToString(
  <StaticRouter location={ctx.path} context={context}>
     {renderRoutes(routes.routes)}
  </StaticRouter>
  )
   let css = context.css?context.css.join('') : ''
   ctx.body = renderHTML(content, {}, css)
})
```

**页面的使用方式**

```javascript
// 编写自己的高阶函数，简化使用
import React from "react";

const withStyles = (DecoratedComponent, styles) => {
  return class NewComponent extends React.Component {
    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss());
      }
    }

    render() {
      return <DecoratedComponent {...this.props} />
    }
  };
}

export default withStyles
```



```javascript
// 类组件使用
import withStyles from '@/contexts/withStyles'
import styles from "./index.css"
@withStyles(styles) // 需要在base里面额外配置

class Index extends React.Component {}
// or withStyles(Index,styles)
```

```javascript
// 函数式组件
import styles from "./index.css"

const Index = (props) => {
  // 2. 函数式用什么高阶函数，直接自定义hooks就完事了，参考isomorphic-style-loader/useStyles
  // 我简单的实现下，这里不能使用useEfect() 这个发生在客户端运行的。
  if (props.staticContext) {
    // 可以优化，现在这个函数每次都会执行的，需要自己限制
    props.staticContext.css.push(styles._getCss())
  }
} 
// 1.可以使用高阶函数
withStyles(Index,styles)
```



**注意的点**

1. 服务端 `const context = {css: []}`,context的css我一直在push ,为什么切换页面没有之前的css的呢？
2. 使用cssmodules，在页面里面使用 styles[name] ,不然没有样式,推荐使用cssmodules



####  全部导入到head里面

因为我们已经开启了cssmodules，所以直接导入到head里面是不会存在样式冲突的问题。`isomorphic-style-loader `已经给我们提供了一些导入css 的 高阶函数 `withsSyles`

和 hooks `useStyles`，用的时候比较省事。

不好的地方是，我想直接使用框架自带的启动方式，就需要格外的在webpack里面配置了

**看下代码配置**

```javascript
// webpack.client.js webpack.server.js 都好配置，或者直接配置在base里面
{
   test: /\.css$/,
     exclude: /node_modules|antd\.css/,
       use: [
         'isomorphic-style-loader',// 这个默认支持cssmodules
         {
           loader: 'css-loader',
           options: {
             modules: true,
           }
         }
       ]
 }
```



**服务端首页**

```javascript
// server/index.js 
//  ...
const css = new Set()
const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

const content = renderToString(
  <StaticRouter location={ctx.path}>
  <StyleContext.Provider value={{insertCss}}> 
    {renderRoutes(routes.routes)}
      </StyleContext.Provider>
     </StaticRouter>
     )
     ctx.body = renderHTML(content, {}, css)
})
// ....
```



**客户端也需要配置**

```javascript
// client/index.js
import React from "react"
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Loadable from 'react-loadable';
import StyleContext from 'isomorphic-style-loader/StyleContext'


import routes from '../router';

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

Loadable.preloadReady().then(() => {
  ReactDom.hydrate(
    <StyleContext.Provider value={{insertCss}}>
      <App/>
    </StyleContext.Provider>, document.getElementById('root'));
})
```

这样服务端和客户端都可以直接使用`isomorphic-style-loader`的一些API



在页面内具体使用

```javascript
// 函数式组件
import useStyles from 'isomorphic-style-loader/useStyles'
import styles from "./index.css"


const Index = (props) => {
  useStyles(styles)
}  
```

```javascript
// 类组件使用
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from "./index.css"
@withStyles(styles) // 需要在base里面额外配置

class Index extends React.Component {}
```



然后打开网页的源代码就可以看见head里面已经有我们需要的css了。



![image-20200702185101916](https://ae01.alicdn.com/kf/He51c082b695a4554b6988e3b2fc09665F.jpg)





### SSR中异步数据的获取 + Dva的使用



#### Dva的使用



之前项目一直用的dva，这里直接使用的dva-core代替的redux；



创建 `Store`：这一部分有坑，要注意避免，大家知道，客户端渲染中，用户的浏览器中永远只存在一个 `Store`，所以代码上你可以这么写

```javascript
const dvaApp = createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();
export default store;
```



然而在服务器端，这么写就有问题了，因为服务器端的 `Store` 是所有用户都要用的，如果像上面这样构建 `Store`，`Store` 变成了一个单例，所有用户共享 `Store`，显然就有问题了。所以在服务器端渲染中，`Store` 的创建应该像下面这样，返回一个函数，每个用户访问的时候，这个函数重新执行，为每个用户提供一个独立的 `Store`



```javascript
const dvaApp = createApp({
  initialState: {},
  models: models,
});

export const getStore =  () => {
  return dvaApp.getStore();
}
```



#### 数据获取



`eact-router的解决方案是配置路由 `route-router-config`，结合 `matchRoutes`，找到页面上相关组件所需的请求接口的方法并执行请求。这就要求开发者通过路由配置信息，显式地告知服务端请求内容。



**客户端路由改造**

```javascript
// router/index.js
{
  path: '/login',
  exact: true,
  component: Login,
  loadData: Login.loadData, // 这里就是请求数据的方法
  title: '登录页'
}
```



```javascript
// 客户端组件使用
class Index extends Component {}

Index.loadData = async (store) => {
  store.dispatch({
    type: "menuTree/reset",
  });
  console.log('我试试这个到底加载不');
}
export default Index
```



**服务端代码**



```javascript
// server/index.js

// 获取请求的方法
const promises = [];

matchedRoutes.forEach(item => {
  if (item.route.loadData) {
    const promise = new Promise((resolve, reject) => {
      // 这里用了.then 所以组件里面必须使用async或者promise
      item.route.loadData(store).then(resolve).catch(reject)
    })
    promises.push(promise);
  }
});
// 这里要注意的一个问题，你客户端的方法可能是异步的，会出现ctx.body 没有执行的问题，所以要把这个中间件设置为异步的

// 为了确保组件的loadData的方法执行完毕
await Promise.all(promises).then(() => {
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
```





#### 注水和脱水

**涉及到数据的预获取，也是服务端渲染的真正意义。**

上面的代码正常运行是没问题了，但是发现客户端和服务端的store，存在不同步的问题。

其实也很好理解。当服务端拿到store并获取数据后，客户端的js代码又执行一遍，在客户端代码执行的时候又创建了一个空的store，两个store的数据不能同步。



所以 在服务器端渲染时，首先服务端请求接口拿到数据，并处理准备好数据状态（如果使用 Redux，就是进行 store 的更新），为了减少客户端的请求，我们需要保留住这个状态。一般做法是在服务器端返回 HTML 字符串的时候，将数据 JSON.stringify 一并返回，这个过程，叫做注水；在客户端，就不再需要进行数据的请求了，可以直接使用服务端下发下来的数据，这个过程叫脱水。



```javascript
<script>
   window.context = {
   // 这里是注水
   state: ${serialize(store.getState())}  // serialize 是为了防止xss的攻击
}
</script>
```



```javascript
import {create} from 'dva-core';

function createApp(opt) {
  // .....
  return app;
}

// 服务端的redux
const dvaApp = createApp({
  initialState: {},
  models: models,
});
export const getStore = () => {
  return dvaApp.getStore();
}

// 客户端的redux
export const getClientStore = () => {
  // 需要先拿到服务端的数据, 脱水
  const initialState = window.context ? window.context.state : {};
  const dvaClientApp = createApp({
    initialState,
    models: models,
  });

  return dvaClientApp.getStore();
}
```



#### 配置代理

服务端是没有域的存在，所以不会存在跨域的问题，但是在客户端还存在跨域的问题，所以还需要配置下代理；代码如下：

```javascript
import httpProxy from 'http-proxy-middleware';
import k2c from "koa2-connect"

// 转发代理
app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) { //匹配有api字段的请求url
    ctx.respond = false // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
    await k2c(httpProxy({
        target: 'https://api.xxxxx.xxx',
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
```



还可以安装koa的代理模块 `koa2-proxy-middleware`,用法如下：

```javascript
const proxy = require('koa2-proxy-middleware');
const options = {
  targets: {
    '/user': {
      // this is option of http-proxy-middleware
      target: 'http://localhost:3001', // target host
      changeOrigin: true, // needed for virtual hosted sites
    },
    '/user/:id': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    '/api/*': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        '/passager/xx': '/mPassenger/ee', // rewrite path
      }
    },
  }
}
app.use(proxy(options));
```

源码也没几行，有兴趣可以看下[koa2-proxy-middleware](https://github.com/sunyongjian/koa2-proxy-middleware/blob/master/lib/index.js)



### 引入react-helmet

App 组件嵌入到 `document.getElementById('root')` 节点当中，一般是不包含 head 标签的，但是单页应用在切换路由时，可能也会需要动态修改 head 标签信息，比如 title 内容。也就是说：在单页面应用切换页面，不会经过服务端渲染，但是我们仍然需要更改 document 的 title 内容。



如果直接改客户端的title,直接就可以使用`document.title`,但是我们现在要把SEO做好，然后我们要更改服务端head里面的meta title等内容,这里我们要用到[react-helmet](https://github.com/nfl/react-helmet)。



具体代码非常简单

```javascript
// 客户端实现方式
import React, {Component, Fragment} from "react"
import {Button} from "antd"
import {Link} from "react-router-dom"
import withStyles from 'isomorphic-style-loader/withStyles'
import {Helmet} from "react-helmet";

import styles from "./index.css"

@withStyles(styles)
class Index extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>这是login页</title>
          <meta name="description" content="这里是禾口和react-ssr的调研"/>
        </Helmet>
      )
  }
}
```

```javascript
// 服务端实现方式
import Koa from 'koa';
import React from "react";
import Router from "koa-router"
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
// ....
const app = new Koa();
const route = new Router()

route.get(["/:route?", /\/([\w|\d]+)\/.*/], (ctx) => {
  // ....
  const helmet = Helmet.renderStatic();

  const content = renderToString(
    <StaticRouter location={ctx.path}>
      <StyleContext.Provider value={{insertCss}}>
        {renderRoutes(routes.routes)}
      </StyleContext.Provider>
    </StaticRouter>
  )
  ctx.body = `
  <!DOCTYPE html>
    <html lang="zh-Hans-CN">
      <head>
        <meta charset="utf-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link crossorigin="anonymous" integrity="sha384-Jg7O5iqDY+MgWnGoX092oaWHFZ1ptLfYcsV+Pz1lcZ3QjJGpnpDvlCWnhp08Cc2L" href="https://lib.baomitu.com/antd/4.3.5/antd.compact.css" rel="stylesheet">
        <link rel="shortcut icon" href="/favicon.ico">
        <style>${[...css].join('')}</style>
        
      </head>
      <body>
      <div id="root">${content}</div>
      <script src=/index.js></script>
      </body>
  </html>
`
})
// ...
```



### 请求token处理



### 404页面



用`react-router-config`的`matchRoutes`方法，当捕获为空数组的时候，说明没有当前路由，跳转到404 页面，这里面有一个注意的点是，如说有二级或二级以上的路由，这个方法能捕获第一个路由的方法，所以要判断当前获取到的是不是一级路由，而且当前数据还不能为空。

```javascript
// server/index.js  
// 判断404
let hasRoute = matchedRoutes.length === 1 && !!matchedRoutes[0].route.routes
if (hasRoute || !matchedRoutes.length) {
  ctx.response.redirect('/404');
  return;
}
// 添加 ‘/’ 重定向是一样的套路
```



### 安全问题



安全问题非常关键，尤其是涉及到服务端渲染，开发者要格外小心。这里提出一个点：我们前面提到了注水和脱水过程，其中的代码：

```javascript
<script>
  window.context = {
  initialState: ${JSON.stringify(store.getState())}
}
</script>
```

非常容易遭受 XSS 攻击，JSON.stringify 可能会造成 script 注入,我习惯使用 serialize-javascript 库进行处理，这也是同构应用中最容易被忽视的细节。

**另一个规避这种 XSS 风险的做法是**：将数据传递个页面中一个隐藏的 textarea 的 value 中，textarea 的 value 自然就不怕 XSS 风险了。



### 优化

1. 客户端js拆包，压缩代码
2. 客户端打包的js带有hash后缀
3. 使用copy-webpack-plugin，直接把需要的文件，打包到服务内。
4. 中间件转发代理 跨域等



### 遇到的问题汇总



1. 二级菜单的时候获取到静态资源的路径，带着第一级菜单的路径
2. 服务端导入css 的时候，css是有做hash 处理不能正确的加载css (cssmodules)
3. 服务端导入css时发生在componentWillMount周期函数，不能在componentDidMount,此时已经到客户端了。
4. koa的路由不像express那样不能直接使用 ***** ， （可能可以，在我这报错）
5. 中间件的顺序、和异步问 ctx.body=''   的问题
6. react-helmet 使用时，服务端没有显示设置的title等信息
7. 注水的时候，注意redux客户端和服务端的联系
8. 注水异步加载的问题，promise.all()
9. 客户端路由使用的history,跳转不访问koa的路由
10. ssr 部署代码体积特别大 ,添加并发单独拆出



### 参考文档

[从零到一搭建React SSR工程架构](http://blog.poetries.top/2018/11/18/react-ssr/?utm_source=tuicool&utm_medium=referral)



`喜欢的mark👍`


