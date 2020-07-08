const serialize = require('serialize-javascript');
const glob = require('glob');
let project = glob.sync(process.cwd() + '/static/index.*.js');

let path = project[0] && project[0].split('/')

export const renderHTML = (content, store, css, helmet) => `
  <!DOCTYPE html>
    <html lang="zh-Hans-CN">
      <head>
        <meta charset="utf-8">
        <title>默认的title</title>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link crossorigin="anonymous" integrity="sha384-Jg7O5iqDY+MgWnGoX092oaWHFZ1ptLfYcsV+Pz1lcZ3QjJGpnpDvlCWnhp08Cc2L" href="https://lib.baomitu.com/antd/4.3.5/antd.compact.css" rel="stylesheet">
        <link rel="shortcut icon" href="/favicon.ico">
        <style>${[...css].join('')}</style>
        
      </head>
      <body>
      <div id="root">${content}</div>
      <script>
        window.context = {
          state: ${serialize(store.getState())}
        }
      </script>
      <script src=/${path[path.length - 1]}></script>
      </body>
  </html>
`

// <link crossorigin="anonymous" integrity="sha384-Jg7O5iqDY+MgWnGoX092oaWHFZ1ptLfYcsV+Pz1lcZ3QjJGpnpDvlCWnhp08Cc2L" href="https://lib.baomitu.com/antd/4.3.5/antd.compact.css" rel="stylesheet">
