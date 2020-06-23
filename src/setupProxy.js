const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy("/base", {
      "target": "http://120.79.229.197:9000",
      "changeOrigin": true,
      "secure": false,
      "pathRewrite": {"^/base": ""}
    })
  );
};
