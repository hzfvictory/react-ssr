/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".bundle.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-loadable */ \"react-loadable\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! isomorphic-style-loader/StyleContext */ \"isomorphic-style-loader/StyleContext\");\n/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _models_dva__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/models/dva */ \"./src/models/dva.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/router */ \"./src/router/index.js\");\n/* harmony import */ var _tem__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tem */ \"./server/tem.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\nvar route = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a(); // 后台路由\n\nroute.get([\"/:route?\", /\\/([\\w|\\d]+)\\/.*/], function (ctx) {\n  // 看看是否有这个路由\n  var matchedRoutes = Object(react_router_config__WEBPACK_IMPORTED_MODULE_6__[\"matchRoutes\"])(_router__WEBPACK_IMPORTED_MODULE_11__[\"default\"].routes, ctx.path) || [];\n\n  if (ctx.path === '/' || !matchedRoutes.length) {\n    // 如果找不到，重定向到home页面\n    ctx.response.redirect('/home');\n    return;\n  }\n\n  var css = new Set(); // 防止钩子函数执行两次\n\n  var insertCss = function insertCss() {\n    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {\n      styles[_key] = arguments[_key];\n    }\n\n    return styles.forEach(function (style) {\n      return css.add(style._getCss());\n    });\n  };\n\n  var helmet = react_helmet__WEBPACK_IMPORTED_MODULE_8__[\"Helmet\"].renderStatic();\n  var content = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__[\"renderToString\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_9__[\"Provider\"], {\n    store: _models_dva__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"StaticRouter\"], {\n    location: ctx.path\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_7___default.a.Provider, {\n    value: {\n      insertCss: insertCss\n    }\n  }, Object(react_router_config__WEBPACK_IMPORTED_MODULE_6__[\"renderRoutes\"])(_router__WEBPACK_IMPORTED_MODULE_11__[\"default\"].routes)))));\n  ctx.body = Object(_tem__WEBPACK_IMPORTED_MODULE_12__[\"renderHTML\"])(content, _models_dva__WEBPACK_IMPORTED_MODULE_10__[\"default\"], css, helmet);\n}); // 中间件\n\napp.use(__webpack_require__(/*! koa-static */ \"koa-static\")(process.cwd() + '/static'));\napp.use(route.routes());\napp.use(route.allowedMethods());\nreact_loadable__WEBPACK_IMPORTED_MODULE_5___default.a.preloadAll().then(function () {\n  var server = app.listen('8082', function () {\n    var _server$address = server.address(),\n        port = _server$address.port;\n\n    console.log(\"\\x1B[33m\\x1B[4mhttp://localhost:\".concat(port, \"\\x1B[0m\"));\n  });\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./server/tem.js":
/*!***********************!*\
  !*** ./server/tem.js ***!
  \***********************/
/*! exports provided: renderHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderHTML\", function() { return renderHTML; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar glob = __webpack_require__(/*! glob */ \"glob\");\n\nvar project = glob.sync(process.cwd() + '/static/index.*.js');\nvar path = project[0] && project[0].split('/');\nvar renderHTML = function renderHTML(content, store, css, helmet) {\n  return \"\\n  <!DOCTYPE html>\\n    <html lang=\\\"zh-Hans-CN\\\">\\n      <head>\\n        <meta charset=\\\"utf-8\\\">\\n        \".concat(helmet.title.toString(), \"\\n        \").concat(helmet.meta.toString(), \"\\n        <link crossorigin=\\\"anonymous\\\" integrity=\\\"sha384-Jg7O5iqDY+MgWnGoX092oaWHFZ1ptLfYcsV+Pz1lcZ3QjJGpnpDvlCWnhp08Cc2L\\\" href=\\\"https://lib.baomitu.com/antd/4.3.5/antd.compact.css\\\" rel=\\\"stylesheet\\\">\\n        <link rel=\\\"shortcut icon\\\" href=\\\"/favicon.ico\\\">\\n        <style>\").concat(_toConsumableArray(css).join(''), \"</style>\\n        \\n      </head>\\n      <body>\\n      <div id=\\\"root\\\">\").concat(content, \"</div>\\n      <script>\\n        window.context = {\\n          state: \").concat(JSON.stringify(store.getState()), \"\\n        }\\n      </script>\\n      <script src=/\").concat(path[path.length - 1], \"></script>\\n      </body>\\n  </html>\\n\");\n}; // <link crossorigin=\"anonymous\" integrity=\"sha384-Jg7O5iqDY+MgWnGoX092oaWHFZ1ptLfYcsV+Pz1lcZ3QjJGpnpDvlCWnhp08Cc2L\" href=\"https://lib.baomitu.com/antd/4.3.5/antd.compact.css\" rel=\"stylesheet\">\n// state: ${JSON.stringify(store.getState())}\n\n//# sourceURL=webpack:///./server/tem.js?");

/***/ }),

/***/ "./src/models/dva.js":
/*!***************************!*\
  !*** ./src/models/dva.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dva_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dva-core */ \"dva-core\");\n/* harmony import */ var dva_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dva_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dva_loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dva-loading */ \"dva-loading\");\n/* harmony import */ var dva_loading__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dva_loading__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/models/index.js\");\n // import { createLogger } from 'redux-logger';\n\n\n\nvar app;\nvar store;\nvar dispatch;\n\nfunction createApp(opt) {\n  // redux日志\n  // opt.onAction = [createLogger()];\n  app = Object(dva_core__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(opt);\n  app.use(dva_loading__WEBPACK_IMPORTED_MODULE_1___default()({}));\n  opt.models.forEach(function (model) {\n    return app.model(model);\n  });\n  app.start();\n  store = app._store;\n\n  app.getStore = function () {\n    return store;\n  };\n\n  dispatch = store.dispatch;\n  app.dispatch = dispatch; // window.g_app = app;\n\n  return app;\n}\n\nvar dvaApp = createApp({\n  initialState: {},\n  models: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\nvar stores = dvaApp.getStore();\n/* harmony default export */ __webpack_exports__[\"default\"] = (stores);\n\n//# sourceURL=webpack:///./src/models/dva.js?");

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ \"./src/models/menu/index.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([_menu__WEBPACK_IMPORTED_MODULE_0__[\"default\"]]);\n\n//# sourceURL=webpack:///./src/models/index.js?");

/***/ }),

/***/ "./src/models/menu/index.js":
/*!**********************************!*\
  !*** ./src/models/menu/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/router */ \"./src/router/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namespace: 'menuTree',\n  state: {\n    routes: _router__WEBPACK_IMPORTED_MODULE_0__[\"default\"].routes\n  },\n  effects: {\n    reset: /*#__PURE__*/regeneratorRuntime.mark(function reset(payload, _ref) {\n      var call, put, select, _yield$select, routes;\n\n      return regeneratorRuntime.wrap(function reset$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              call = _ref.call, put = _ref.put, select = _ref.select;\n              _context.next = 3;\n              return select(function (state) {\n                return state.menuTree;\n              });\n\n            case 3:\n              _yield$select = _context.sent;\n              routes = _yield$select.routes;\n              routes.push(111111);\n              _context.next = 8;\n              return put({\n                type: 'save',\n                payload: {\n                  routes: _toConsumableArray(routes)\n                }\n              });\n\n            case 8:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, reset);\n    })\n  },\n  reducers: {\n    save: function save(state, _ref2) {\n      var payload = _ref2.payload;\n      return _objectSpread(_objectSpread({}, state), payload);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/models/menu/index.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_withLoadable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/withLoadable */ \"./src/utils/withLoadable.js\");\n\nvar Login = Object(_utils_withLoadable__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! @/pages/login */ \"./src/pages/login/index.js\"));\n});\nvar Layout = Object(_utils_withLoadable__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! @/layout */ \"./src/layout/index.js\"));\n});\nvar Layout1 = Object(_utils_withLoadable__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! @/layout/menu2 */ \"./src/layout/menu2.js\"));\n});\nvar Home = Object(_utils_withLoadable__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! @/pages/home */ \"./src/pages/home/index.js\"));\n});\nvar Message = Object(_utils_withLoadable__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! @/pages/message */ \"./src/pages/message/index.jsx\"));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  routes: [{\n    path: '/login',\n    exact: true,\n    component: Login,\n    title: '登录页'\n  }, {\n    path: '/home',\n    exact: true,\n    component: Home,\n    title: '首页'\n  }, {\n    path: '/menu',\n    component: Layout,\n    routes: [{\n      path: '/menu/home',\n      exact: true,\n      component: Home,\n      title: '一级菜单首页',\n      meta: {\n        icon: 'home',\n        keepAlive: true\n      }\n    }, {\n      path: '/menu/message',\n      exact: true,\n      component: Message,\n      title: '一级菜单消息页'\n    }]\n  }, {\n    path: '/menu2',\n    component: Layout1,\n    routes: [{\n      path: '/menu2/home',\n      exact: true,\n      component: Home,\n      title: '二级菜单首页'\n    }, {\n      path: '/menu2/message',\n      exact: true,\n      component: Message,\n      title: '二级菜单消息页'\n    }]\n  }]\n});\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/utils/withLoadable.js":
/*!***********************************!*\
  !*** ./src/utils/withLoadable.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loadable */ \"react-loadable\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);\n\n\n // 水平垂直居中\n\nvar centerMiddle = {\n  position: 'absolute',\n  top: '50%',\n  left: '50%',\n  transform: 'translate(-50%, -50%)'\n};\n\nvar MyLoadingComponent = function MyLoadingComponent(_ref) {\n  var isLoading = _ref.isLoading,\n      error = _ref.error;\n\n  if (isLoading) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      style: centerMiddle\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__[\"Spin\"], {\n      size: \"large\"\n    }));\n  } else if (error) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__[\"Spin\"], {\n      tip: \"\\u51FA\\u73B0\\u4E0D\\u660E\\u9519\\u8BEF\\uFF01\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__[\"Alert\"], {\n      message: \"\\u9875\\u9762\\u52A0\\u8F7D\\u5931\\u8D25\\uFF01\",\n      description: \"\\u7ED9\\u60A8\\u5E26\\u6765\\u4E0D\\u4FBF\\uFF0C\\u8BF7\\u5237\\u65B0\\u91CD\\u8BD5\\uFF01\",\n      type: \"info\"\n    }));\n  } else {\n    return null;\n  }\n};\n\nvar withLoadable = function withLoadable(comp) {\n  return react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\n    loader: comp,\n    loading: MyLoadingComponent\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (withLoadable);\n\n//# sourceURL=webpack:///./src/utils/withLoadable.js?");

/***/ }),

/***/ "@ant-design/icons":
/*!************************************!*\
  !*** external "@ant-design/icons" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@ant-design/icons\");\n\n//# sourceURL=webpack:///external_%22@ant-design/icons%22?");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"antd\");\n\n//# sourceURL=webpack:///external_%22antd%22?");

/***/ }),

/***/ "dva-core":
/*!***************************!*\
  !*** external "dva-core" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dva-core\");\n\n//# sourceURL=webpack:///external_%22dva-core%22?");

/***/ }),

/***/ "dva-loading":
/*!******************************!*\
  !*** external "dva-loading" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dva-loading\");\n\n//# sourceURL=webpack:///external_%22dva-loading%22?");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"glob\");\n\n//# sourceURL=webpack:///external_%22glob%22?");

/***/ }),

/***/ "isomorphic-style-loader/StyleContext":
/*!*******************************************************!*\
  !*** external "isomorphic-style-loader/StyleContext" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"isomorphic-style-loader/StyleContext\");\n\n//# sourceURL=webpack:///external_%22isomorphic-style-loader/StyleContext%22?");

/***/ }),

/***/ "isomorphic-style-loader/useStyles":
/*!****************************************************!*\
  !*** external "isomorphic-style-loader/useStyles" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"isomorphic-style-loader/useStyles\");\n\n//# sourceURL=webpack:///external_%22isomorphic-style-loader/useStyles%22?");

/***/ }),

/***/ "isomorphic-style-loader/withStyles":
/*!*****************************************************!*\
  !*** external "isomorphic-style-loader/withStyles" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"isomorphic-style-loader/withStyles\");\n\n//# sourceURL=webpack:///external_%22isomorphic-style-loader/withStyles%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-helmet\");\n\n//# sourceURL=webpack:///external_%22react-helmet%22?");

/***/ }),

/***/ "react-loadable":
/*!*********************************!*\
  !*** external "react-loadable" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-loadable\");\n\n//# sourceURL=webpack:///external_%22react-loadable%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ })

/******/ });