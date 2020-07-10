const serialize = require('serialize-javascript');
const glob = require('glob');
//
let main = glob.sync(process.cwd() + '/static/js/main.*.js');
let antd = glob.sync(process.cwd() + '/static/js/antd.*.js');
let common = glob.sync(process.cwd() + '/static/js/common.*.js');


let mian_url = main[0] && main[0].split('/')
let antd_url = antd[0] && antd[0].split('/')
let common_url = common[0] && common[0].split('/')


export const renderHTML = (content, store, css, helmet) => `
  <!DOCTYPE html>
    <html lang="zh-Hans-CN">
      <head>
        <meta charset="utf-8">
        <title>默认的title</title>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="/css/index.css" >
        <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/antd/4.3.5/antd.compact.min.css" >
        <link rel="shortcut icon" href="/img/favicon.ico">
        <style>
         ${[...css].join('')}
        </style>
      </head>
      <body>
      <div id="root">${content}</div>
      <script>
        window.context = {
          state: ${serialize(store.getState())}
        }
      </script>
      <script src=/js/${mian_url[mian_url.length - 1]}></script>
      <script src=/js/${common_url[common_url.length - 1]}></script>
      <script src=/js/${antd_url[antd_url.length - 1]}></script>
      </body>
  </html>
`