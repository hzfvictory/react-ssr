const serialize = require('serialize-javascript');
const glob = require('glob');
const hasPublicPath = process.env.PUBLIC_PATH || '';


let main = glob.sync(process.cwd() + '/static/js/main.*.js');
let antd = glob.sync(process.cwd() + '/static/js/antd.*.js');
let common = glob.sync(process.cwd() + '/static/js/common.*.js');


let mian_url = main[0] && main[0].split('/')
let antd_url = antd[0] && antd[0].split('/')
let common_url = common[0] && common[0].split('/')


// 获取js
const generateBundleScripts = (bundles) => {
  let result = bundles.filter(bundle => bundle.file.endsWith('.js')).map(bundle => {
    return `<script type="text/javascript" src=${bundle.publicPath}></script>\n`;
  });

  let hasMain = result.find((item => item.includes(mian_url[mian_url.length - 1])));

  !hasMain && result.push(`<script type="text/javascript" src=${hasPublicPath}/js/${mian_url[mian_url.length - 1]}></script>\n`)

  return result
}

export const renderHTML = (content, store, css, helmet, bundles) => `
  <!DOCTYPE html>
    <html lang="zh-Hans-CN">
      <head>
        <meta charset="utf-8">
        <title>默认的title</title>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
         <link rel="stylesheet" href=https://cdn.jsdelivr.net/gh/hzfvictory/cdn/ssr/css/antd.min.css >
        <link rel="stylesheet" href=/css/index.css >
        <link rel="shortcut icon" href=/img/favicon.ico >
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
      
      ${generateBundleScripts(bundles).join('\n')}
      <script src=${hasPublicPath}/js/${common_url[common_url.length - 1]}></script>
      <script src=${hasPublicPath}/js/${antd_url[antd_url.length - 1]}></script>
      </body>
  </html>
`


/*
<script src=https://cdn.jsdelivr.net/gh/hzfvictory/cdn/ssr/js/${mian_url[mian_url.length - 1]}></script>
<script src=https://cdn.jsdelivr.net/gh/hzfvictory/cdn/ssr/js/${common_url[common_url.length - 1]}></script>
<script src=https://cdn.jsdelivr.net/gh/hzfvictory/cdn/ssr/js/${antd_url[antd_url.length - 1]}></script>
* */