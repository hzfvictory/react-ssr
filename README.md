## React SSR

### 客户端渲染与服务端渲染

**CSR:**
页面渲染是JS负责进行的，

浏览器发送请求–>服务器返回HTML–>浏览器发送bundle.js请求–>服务器返回bundle.js–>浏览器执行bundle.js中的react代码完成渲染


**SSR**
服务器端直接返回HTML让浏览器直接渲染

浏览器发送请求–>服务器运行React代码生成页面–>服务器返回页面


**传统CSR的弊端:**

1. 由于页面显示过程要进行JS文件拉取和React代码执行，在这个渲染过程中至少涉及到两个 HTTP请求周期（html+js），所以会有一定的耗时，首屏加载时间会比较慢。

2. 对于SEO(Search Engine Optimazition,即搜索引擎优化)，完全无能为力，因为搜索引擎爬虫只认识html结构的内容，而不能识别JS代码内容。


**SSR的弊端:**

ssr的出现，就是为了解决这些传统CSR的弊端**

在 React 中使用 ssr 技术，我们让 React 代码在服务器端先执行一次，使得用户下载的 HTML 已经包含了所有的页面展示内容，这样，页面展示的过程只需要经历一个 HTTP 请求周期，TTFP（Time To First Page） 时间得到一倍以上的缩减

但是使用 ssr 这种技术，将使原本简单的 React 项目变得非常复杂

1. 相对于仅仅需要提供静态文件的服务器，ssr中使用的渲染程序自然会占用更多的CPU和内存资源

2. 在服务器生成的页面所以，一些常用的浏览器API可能无法正常使用，比如window、docment和alert等，如果使用的话需要对运行的环境加以判断
3. 开发调试会有一些麻烦，因为涉及了浏览器及服务器，对于SPA的一些组件的生命周期的管理会变得复杂
4. 可能会由于某些因素导致服务器端渲染的结果与浏览器端的结果不一致，项目的可维护性会降低，代码问题的追溯也会变得困难

所以，使用 ssr 在解决问题的同时，也会带来非常多的副作用，有的时候，这些副作用的伤害比起 ssr 技术带来的优势要大的多。一般建议ssr，除非你的项目特别依赖搜索引擎流量，或者对首屏时间有特殊的要求，否则不建议使用 ssr,如果只对seo有要求可使用[prerender预渲染](https://github.com/prerender/prerender)


### SSR的实现本质


这里介绍的是ssr，是基于React 的spa 项目，不是像 thinkphp、jsp、nodeJs+ejs 这种纯后端直出渲染方式，所以这种大多数只是针对首屏的ssr,因为浏览器的路由跳转方式是用的H5的`history  API`的`window.history.pushState()` ，使得我们即可以修改 `url` 也可以不刷新页面，所以是不会走服务端的【可以通过预加载获取需要的数据】。

**ssr 之所以能够实现，本质上是因为虚拟 DOM 的存在**

ssr 的工程中，React 代码会在客户端和服务器端各执行一次,因为代码在 Node 环境下是没有DOM这个概念的，所以在React 框架中引入了一个概念叫做虚拟 DOM，React 在做页面操作时，实际上不是直接操作 DOM，而是操作虚拟 DOM，也就是操作普通的 JavaScript 对象，这就使得 ssr 成为了可能。在服务器，我可以操作 JavaScript 对象，判断环境是服务器环境，我们把虚拟 DOM 映射成字符串输出；在客户端，我也可以操作 JavaScript 对象，判断环境是客户端环境，我就直接将虚拟 DOM 映射成真实 DOM，完成页面挂载。


### 方案筛选

- [next.js]([https://nextjs.frontendx.cn/docs/#%E5%AE%89%E8%A3%85](https://nextjs.frontendx.cn/docs/#安装))/[nuxt.js](https://www.nuxtjs.cn/guide/installation)      成本低,安心的写页面就行了，无需过多关心服务端路由
- [renderer ](https://github.com/prerender/prerender)实现spa项目的服务端预渲染
- 使用谷歌 [rendertron](https://github.com/GoogleChrome/rendertron) 实现spa项目的服务端渲染 【据说会被判作弊的，降权处理】
- 秉承学习的态度了解下基本原理，选择了自己去搭，（中间断了一段时间，现在又重新拾起来），之前看到有人用 react + redux + Express 搭ssr的文章，所以基于对dva和koa的熟悉和特别喜好，就直接选择了dva-core + koa 做状态管理搭建。


### Koa实现基础版本的SSR


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
         <title>禾口和ssr</title>
       </head>
       <body>
         <h1>hello</h1>
         <h2>world</h2>
       </body>
     </html>
     `;
  }
})
const server = app.listen('9999', () => {
  const {port} = server.address();
  console.log(`http://localhost:${port}`)
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
         <title>禾口和ssr</title>
       </head>
       <body>
         <h1>hello</h1>
         <h2>world</h2>
       </body>
     </html>
    `
})

app.use(route.routes());
app.use(route.allowedMethods()); //自动设置响应头ctx.status完善response响应头

const server = app.listen('9999', () => {
  const {port} = server.address();
  console.log(`http://localhost:${port}`)
})
```


这样一个简单的服务端渲染就搞定了，服务器端直接返回HTML让浏览器直接渲染，而且网页源代码中是有这些dom信息的对seo非常友好，我们react、vue这些都是通过webpack引入了js,所有的功能页面展示统统由js完成。


### 实现React组件的服务端渲染


到这一步已经不能直接用node启动服务了，因为没有`babel`，  React不会转化成`createElement`的形式，而且使用node也不能直接使用import导入方式。


随便编写一个React的组件


```javascript
// src/pages/home
import React from 'react';
const Home = () => {
  return (
    <div>
      <div>Home组件</div>
    </div>
  )
}
export default Home
```

然后我们把当前组件，使用服务员渲染出来，看下面配置：


####  Webpack base

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
  }
}
```


#### 服务器端 Webpack 配置


服务端运行的代码如果需要依赖 Node 核心模块或者第三方模块，`就不再需要把客户端的一些模块代码打包到最终代码中了`。因为环境已经安装这些依赖，可以直接引用。这样一来，就需要我们在 webpack 中配置：`target：node`，并借助 webpack-node-externals 插件，解决第三方依赖打包的问题。

```javascript
// config/webpack.server.js
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base')

const serverConfig = {
  target: 'node', // 编译出能让node识别的代码  https://webpack.docschina.org/concepts/targets/
  mode: 'development', // 这里的mode要特别注意
  entry: './src/server/index.js', // 对应服务端的代码
  // https://webpack.docschina.org/configuration/externals/
  externals: [nodeExternals()], // 为了忽略node_modules文件夹中的所有模块
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../bundle')
  }
}
module.exports = merge(config, serverConfig)
```

```javascript
// server/index.js
import Koa from 'koa';
import Router from "koa-router"
import React from "react"; // 必须引入
import {renderToString} from 'react-dom/server'; // react-dom提供的方法

import Home from "../src/pages/home"

const app = new Koa();
const route = new Router()

const content = renderToString(<Home/>);

route.get("/", (ctx) => {
  ctx.body =
    `
    <html>
      <head>
        <title>禾口和ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
    `
})

app.use(route.routes());
app.use(route.allowedMethods());

const server = app.listen('9999', () => {
  const {port} = server.address();
  console.log(`http://localhost:${port}`)
})
```


以上使用了**renderToString**, 我们都知道react-dom提供了四种服务端渲染函数,如下:

1. **renderToString**：将 React Component 转化为 HTML 字符串，生成的 HTML 的 DOM 会带有额外属性：各个 DOM 会有data-react-id属性，第一个 DOM 会有data-reactroot属性。
2. **renderToStaticMarkup**：将 React Component 转化为 HTML 字符串，但是生成 HTML 的 DOM 不会有额外属性，从而节省 HTML 字符串的大小。
3. **renderToNodeStream:** 以流的形式输出html, 不用像renderToString生成整个html才发送给客户端。相对于renderToString能更快的响应客户端，提升页面渲染速度。
4. **renderToStaticNodeStream**：和 renderToNodeStream一样，也是输出流，但是html中不带data-reactroot等属性。


**对于服务端渲染而言**


- **renderToString**方法渲染的节点会带有data-react-id属性, 在前端 react 加载完成后, 前端 react 会认识之前服务端渲染的内容, 不会重新渲染 DOM 节点, 前端 react 会接管页面, 执行 `componentDidMout` 绑定浏览器事件等 这些在服务端没完成也不可能执行任务。
- **renderToStaticMarkup** 渲染出的是不带`data-react-id`的纯 html 在前端 react 加载完成后, 之前服务端渲染的页面会抹掉之前服务端的重新渲染(可能页面会闪一下). 换句话说 **前端react就根本就不认识之前服务端渲染的内容**, render 方法会使用 innerHTML 的方法重写 #react-target 里的内容


在package添加启动配置

```javascript
// package.json
"scripts": {
    "dev": "npm-run-all --parallel dev:build:server dev:start",
    "dev:build:server": "webpack --config config/webpack.server.js --watch",
    "dev:start": "nodemon ./bundle/bundle.js"
}
```


执行  yarn dev ,打开 [http://localhost:9999/ ]()页面直接在浏览上显示， 到此，就初步实现了一个React组件是服务端渲染,加入你在组件Home里面添加一些方法或者调取接口，你会发现这些都没有执行，所以我们还需要接下来进一步完善。


### 同构


要解决上面上面的问题，就需要同构了，所谓同构，通俗的讲，就是一套React代码在服务器上运行一遍，到浏览器渲染时在运行一遍，服务端渲染完成页面结构，浏览器端渲染完成事件绑定接口调取（重复加载的js或者css客户端协调阶段时候会进行比对，如果一样则不渲染了）。


#### 客户端针对路由打包JS


把打包后的js,注入到html中，这样到浏览器就会再次请求，就可以完成事件绑定等行为操作。

我们要用到react-dom的`hydrate`

```javascript
// client/index.js
import React, {Component} from "react"
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Loadable from 'react-loadable'; // 这里是我的一个路由拆分，你们可以不用

import routes from '../router';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {renderRoutes(routes.routes)}
        </Switch>
      </Router>
    )
  }
}

Loadable.preloadReady().then(() => {
  ReactDom.hydrate(
    <App/>, document.getElementById('root'));
})
```



hydrate() 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程

说白了`render()` 标签上没有唯一的属性，但是要尽可能复用 ssr 的 HTML 结构,所以就出现了`hydrate()`,但是目前两者都是可以用的，17版本`render()`就不在支持`ssr`



[知乎对 ReactDom.hydrate 的解释](https://www.zhihu.com/question/66068748)


然后配置客户端的webpack将其编译打包成js，在服务端html里面引入。


#### 客户端 Webpack 配置


客户端和服务端打包后的输出目录

```javascript
// config/outputPath 
module.exports = {
  OUTPUTCLIENT: 'static',
  OUTPUTSERVER: 'bundle'
}
```


```javascript
// config/webpack.client.js
const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const {OUTPUTCLIENT} = require("./outputPath")
const outputPath = `../${OUTPUTCLIENT}`

const clientConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '../client/index.js'),
  output: {
    filename: 'index.[chunkhash:8].js', // 这里我用的hash，目的是防止缓存
    path: path.resolve(__dirname, outputPath),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ['style-loader', {// 这里建议使用style-loader，少量的css直接采用客户端渲染了
          loader: 'css-loader',
          options: {
            modules: true, // 这要跟服务端保持一致，不然head里面有样式，客户端没有对应的class
          }
        }]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          outputPath: outputPath, // 输入路径
          publicPath: '/'
        }
      }
    ]
  }
}
module.exports = merge(config, clientConfig)
```


然后在上面的`package.json`,里面添加`    "dev:build:client": "webpack --config webpack.client.js --watch" `，就能对浏览器用到的一些js完成打包。


#### 服务端的路由逻辑

服务器端路由代码相对要复杂一点，需要你把 `location`（当前请求路径）传递给 `StaticRouter` 组件，这样 `StaticRouter` 才能根据路径分析出当前所需要的组件是谁。（PS：`StaticRouter` 是 `React-Router`针对服务器端渲染专门提供的一个路由组件。）


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

route.get(["/:route?", /\/([\w|\d]+)\/.*/], (ctx) => {
  const content = renderToString(
    // 重点是这
    <StaticRouter location={ctx.path}>
        {renderRoutes(routes.routes)}
    </StaticRouter>
  );
  ctx.body = renderHTML(content, {})
})
// 这里要注意下中间件的先后顺序
app.use(require('koa-static')(process.cwd() + '/static'));
app.use(route.routes());
app.use(route.allowedMethods());

Loadable.preloadAll().then(() => {
  const server = app.listen('9999', () => {
    const {port} = server.address();
    console.log(`\x1B[33m\x1B[4mhttp://localhost:${port}\x1B[0m`)
  })
});
```

```javascript
// server/template.js
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
        <title>禾口和ssr</title>
      </head>
      <body>
      <div id="root">${content}</div>
      <script src=/${path[path.length - 1]}></script> // 这个 '/' 一定要添加，坑了好久
      </body>
  </html>
`
```

### CSS样式问题处理


正常的服务端渲染只是返回了 HTML 字符串，样式需要浏览器加载完 CSS 后才会加上，这个样式添加的过程就`会造成页面的闪动`，所以在服务端里面直接添加需要引用的CSS。

我们不能再使用 style-loader 了，因为这个 webpack loader 会在编译时将样式模块载入到 HTML header 中。但是在服务端渲染环境下，没有 window 对象，style-loader 进而会报错。一般我们换用 `isomorphic-style-loader` ,同时 `isomorphic-style-loader `也会解决页面样式闪动的问题，它的原理也不难理解：`isomorphic-style-loader `利用 context API，在渲染页面组件时获取所有 React 组件的样式信息，在服务器端输出 html 字符串的同时，也将样式插入到 html 字符串当中，将结果一同传送到客户端。



因为我们已经开启了cssmodules，所以直接导入到head里面是不会存在样式冲突的问题。`isomorphic-style-loader `已经给我们提供了一些导入css 的 高阶函数 `withsSyles`

和 hooks `useStyles`，用的时候比较省事。



**看下代码配置**


```javascript
// config/webpack.client.js
{
  test: [/\.css|less$/],
    use: [
      'style-loader', // 也可以跟服务端的一样，就是麻烦点，每次使用css,都需要额外的手续
      {
        loader: 'css-loader',
        options: {
          modules: true,
        }
      },
      'less-loader',
    ]
}
```

```javascript
// config/webpack.server.js
{
  test: [/\.css|less$/],
    use: [
      'isomorphic-style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
        }
      },
      'less-loader'  // 必须配置 不然会当成css,视觉可能看不出来，因为客户端配置了less
    ]
}
```


**服务端首页**

```javascript
// server/index.js 
//  ...
const css = new Set() // 这个必须在路由函数里面，在外面的话，就会累加出现之前的css
const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

const content = renderToString(
  <StaticRouter location={ctx.path}>
        <StyleContext.Provider value={{insertCss}}> 
           {renderRoutes(routes.routes)}
      </StyleContext.Provider>
   </StaticRouter>
)
 
ctx.body = renderHTML(content, {}, css)
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
  const removeCss = styles.map(style => style._insertCss && style._insertCss());
  return () => removeCss.forEach(dispose => dispose && dispose())
}

const App = () => {
  return (
    <Router>
        {renderRoutes(routes.routes)}
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


这样服务端和客户端都可以直接使用`isomorphic-style-loader`的一些API, **有些`不重要`的页面，或者不重要的css可以直接采用客户端渲染**,就不需要引入高阶函数或者useStyles。


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

```javascript
// 使用客户端渲染
import styles from "./index.css"

const Index = () => {
  // 这里也可以使用useStyles 部分使用客户端渲染
  return (
    <div>
      <h1 className={styles['title-center']}>message</h1>
      <h1 className={'title-center'}>message</h1>
    </div>
  )
} 
```


然后打开网页的源代码就可以看见head里面已经有我们需要的css了。


![image-20200702185101916](https://ae01.alicdn.com/kf/He51c082b695a4554b6988e3b2fc09665F.jpg)



### SSR中异步数据的获取 + Dva的使用


#### Dva的使用


之前项目一直用的dva，这里直接使用的dva-core代替的redux，不会配置的自行查下文档。


创建 `Store`：这一部分有坑，要注意避免，大家知道，在客户端渲染中，用户的浏览器中永远只存在一个 `Store`，所以代码上你可以这么写


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


数据获取的解决方案是配置路由 route-router-config，结合 `matchRoutes`，找到页面上相关组件所需的请求接口的方法并执行请求，这就要求开发者通过路由配置信息，显式地告知服务端请求内容。


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
// 这里要注意的一个问题，你客户端的方法可能是异步的，会出现 ctx.body 没有执行的问题，所以要把这个中间件设置为异步的

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


服务端是没有域的存在，所以不会存在跨域的问题，但是在客户端调取接口还存在跨域的问题，所以还需要配置下代理，代码如下：

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

源码也没几行，有兴趣可以看下  [koa2-proxy-middleware](https://github.com/sunyongjian/koa2-proxy-middleware/blob/master/lib/index.js)


### 引入react-helmet


做更完整的SEO


App 组件嵌入到 `document.getElementById('root')` 节点当中，一般是不包含 head 标签的，但是单页应用在切换路由时，可能也会需要动态修改 head 标签信息，比如 title 内容。也就是说：在单页面应用切换页面，不会经过服务端渲染，但是我们仍然需要更改 document 的 title 内容。


如果直接改客户端的title,直接就可以使用`document.title`,但是我们现在要把SEO做好，然后我们要更改服务端head里面的meta title等内容,这里我们要用到  [react-helmet](https://github.com/nfl/react-helmet)。


具体代码非常简单

```javascript
// 客户端实现方式
import React, {Component, Fragment} from "react"
import {Helmet} from "react-helmet";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>这是login页</title>
          <meta name="description" content="这里是禾口和react-ssr的调研"/>
        </Helmet>
      </Fragment>
     )
  }
}
```

```javascript
// 服务端实现
import Koa from 'koa';
import React from "react";
import Router from "koa-router"
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet'; // 这里引入
// ....
const app = new Koa();
const route = new Router()

route.get(["/:route?", /\/([\w|\d]+)\/.*/], (ctx) => {
  // ....
  const helmet = Helmet.renderStatic(); // 这里获取下当前的head信息

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
// ...  ...
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

非常容易遭受 XSS 攻击，JSON.stringify 可能会造成 script 注入,使用 serialize-javascript 库进行处理，这也是同构应用中最容易被忽视的细节。

**另一个规避这种 XSS 风险的做法是**：将数据传递个页面中一个隐藏的 textarea 的 value 中，textarea 的 value 自然就不怕 XSS 风险了。


### 优化

1. 客户端js拆包，压缩代码
2. 客户端打包的js带有hash后缀
3. 使用copy-webpack-plugin，直接把需要的文件，打包到对应的文件夹。
4. 中间件转发代理 跨域等
5. 静态资源使用cdn
6. 服务端使用缓存
7. 对服务端压力过大的时候，切换到客户端渲染
8. nodeJs/ReactJs的版本升级


### 遇到的问题汇总


1. 二级菜单的时候获取到静态资源的路径，带着第一级菜单的路径
2. 服务端导入css 的时候，css是有做hash 处理不能正确的加载css (cssmodules)
3. 服务端导入css时发生在componentWillMount周期函数，不能在componentDidMount,此时已经到客户端了。
4. koa的路由不像express那样不能直接使用 ***** ， （可能可以，在我这报错）
5. 中间件的顺序、和异步问 ctx.body=''   的问题
6. react-helmet 使用时，服务端没有显示设置的title等信息  （在最外层导入）
7. 注水的时候，注意redux客户端和服务端的区别和联系
8. 注水异步加载的问题  promise.all()
9. 客户端路由使用的history,跳转不访问koa的路由
10. ssr 部署代码体积特别大 ,添加并发，公共单独拆出
11. pm2环境变量的问题，
12. 开启cssModules后把antd的样式也编译了
13. 添加一个常量数组，用来表示那些必须用来服务端渲染，不能太多，影响性能【记得去重】


上面的问题，均已解决，可能文章介绍的不具体，具体以源码为准。


### 参考文档

[从零到一搭建React SSR工程架构](http://blog.poetries.top/2018/11/18/react-ssr/?utm_source=tuicool&utm_medium=referral)

[知乎 rendertron](https://zhuanlan.zhihu.com/p/66672794)



[本文的github地址](https://github.com/hzfvictory/react-ssr)



`喜欢的mark👍`  

