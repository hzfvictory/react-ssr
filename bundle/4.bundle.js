exports.ids=[4],exports.modules={52:function(e,t,n){"use strict";n.r(t);var r,o=n(0),a=n.n(o),u=n(1),c=n(39),i=n(7),l=n(15),s=n.n(l);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return d(this,n)}}function d(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=u.Layout.Header,g=u.Layout.Content,x=u.Layout.Footer,k=s()({_getCss:function(){return".ant-layout-header .logo {\n    width: 120px;\n    height: 31px;\n    background: rgba(255, 255, 255, 0.2);\n    margin: 16px 24px 16px 0;\n    float: left;\n}\n\n.site-layout .site-layout-background {\n    background: #fff;\n}\n\n.userSet {\n    height: 56px;\n    float: right;\n}\n\n.userSet > span {\n    display: inline-block;\n    height: 100%;\n    padding: 0 12px;\n    transition: all .3s;\n    color: rgba(255, 255, 255, 0.65);\n}\n\n.site-layout-background {\n  background: rgba(255, 255, 255, 0.2);\n}\n.userSet .avatar {\n    width: 24px;\n    height: 24px;\n    margin-right: 7px;\n}"},_insertCss:function(){}})(r=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(l,e);var t,n,r,o=y(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=o.call(this,e)).handleClick=function(e){t.setState({current:e.key}),t.props.history.push(e.key)},t.state={route:e.route.routes,current:e.location.pathname},t}return t=l,(n=[{key:"render",value:function(){return a.a.createElement(u.Layout,null,a.a.createElement(b,{style:{position:"fixed",zIndex:1,width:"100%"}},a.a.createElement(u.Menu,{theme:"dark",onClick:this.handleClick,selectedKeys:[this.state.current],mode:"horizontal"},a.a.createElement(u.Menu.Item,{key:"/menu2/home",icon:a.a.createElement(c.MailOutlined,null)},"首页"),a.a.createElement(u.Menu.Item,{key:"/menu2/message",icon:a.a.createElement(c.AppstoreOutlined,null)},"Message"),a.a.createElement(u.Menu.Item,{key:"/menu/home",icon:a.a.createElement(c.AppstoreOutlined,null)},"菜单1"))),a.a.createElement(g,{className:"site-layout",style:{padding:"0 50px",marginTop:64}},a.a.createElement(u.Breadcrumb,{style:{margin:"16px 0"}},a.a.createElement(u.Breadcrumb.Item,null,"Home"),a.a.createElement(u.Breadcrumb.Item,null,"List"),a.a.createElement(u.Breadcrumb.Item,null,"App")),a.a.createElement("div",{className:"site-layout-background",style:{padding:24,minHeight:380,backgroundColor:"#fff"}},Object(i.renderRoutes)(this.state.route))),a.a.createElement(x,{style:{textAlign:"center"}},"xxxx-xxxxx-菜单2"))}}])&&p(t.prototype,n),r&&p(t,r),l}(a.a.Component))||r;t.default=k}};