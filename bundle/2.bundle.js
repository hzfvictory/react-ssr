exports.ids=[2],exports.modules={34:function(e,t,n){var r=n(35),a=n(14),o="string"==typeof r?[[e.i,r,""]]:r;(t=e.exports=r.locals||{})._getContent=function(){return o},t._getCss=function(){return""+r},t._insertCss=function(e){return a(o,e)}},35:function(e,t,n){(t=n(13)(!1)).push([e.i,"._3LshDDk3hH6Z8Cq8A0pP01 ._2lhv4a_ZLdMU7rffzcuSza {\n  width: 120px;\n  height: 31px;\n  background: rgba(255, 255, 255, 0.2);\n  margin: 16px 24px 16px 0;\n  float: left;\n}\n._21JGryooPkSBrthQrWUo-w .L8qrDClNcdcDGSvk8IsNA {\n  background: #fff;\n}\n._3GSNxWWOlXidTkJn__mKi {\n  height: 56px;\n  float: right;\n}\n._3GSNxWWOlXidTkJn__mKi > span {\n  display: inline-block;\n  height: 100%;\n  padding: 0 12px;\n  transition: all 0.3s;\n  color: rgba(255, 255, 255, 0.65);\n}\n._3GSNxWWOlXidTkJn__mKi .UyTcVoAkkwFYcevGz8YV5 {\n  width: 24px;\n  height: 24px;\n  margin-right: 7px;\n}\n",""]),t.locals={"ant-layout-header":"_3LshDDk3hH6Z8Cq8A0pP01",logo:"_2lhv4a_ZLdMU7rffzcuSza","site-layout":"_21JGryooPkSBrthQrWUo-w","site-layout-background":"L8qrDClNcdcDGSvk8IsNA",userSet:"_3GSNxWWOlXidTkJn__mKi",avatar:"UyTcVoAkkwFYcevGz8YV5"},e.exports=t},43:function(e,t,n){"use strict";n.r(t);var r,a=n(0),o=n.n(a),l=n(1),u=n(31),i=n(6),c=n(2),s=n(15),A=n.n(s),m=n(34),f=n.n(m);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=k(e);if(t){var a=k(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return y(this,n)}}function y(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var E=l.Layout.Header,b=l.Layout.Content,x=l.Layout.Footer,S=A()(f.a)(r=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(s,e);var t,n,r,a=d(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=a.call(this,e)).handleClick=function(e){t.setState({current:e.key}),t.props.history.push(e.key)},t.curRoute=function(e){var n=t.state.route,r=t.props.location.pathname;return n.find((function(e){return e.path===r}))[e]},t.onLogout=function(){t.props.history.push("/login")},t.state={route:e.route.routes,current:e.location.pathname},t}return t=s,r=[{key:"getDerivedStateFromProps",value:function(e,t){return t.current!==e.location.pathname?{current:e.location.pathname}:null}}],(n=[{key:"render",value:function(){var e=o.a.createElement(l.Menu,null,o.a.createElement(l.Menu.Item,null,o.a.createElement(c.Link,{to:"/set"},o.a.createElement(u.SettingOutlined,{style:{marginRight:8}}),"个人设置")),o.a.createElement(l.Menu.Item,{onClick:this.onLogout},o.a.createElement(u.LogoutOutlined,{style:{marginRight:8}}),"退出登录"));return o.a.createElement(l.Layout,null,o.a.createElement(E,{style:{position:"fixed",zIndex:1,width:"100%"}},o.a.createElement("div",{className:f.a.logo}),o.a.createElement("span",{className:f.a.userSet},o.a.createElement(l.Dropdown,{overlay:e},o.a.createElement("span",{className:f.a["ant-dropdown-link"]},o.a.createElement("img",{alt:"",className:f.a.avatar,src:"data:image/png;base64,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"}),"禾口和 ",o.a.createElement(u.CaretDownOutlined,null)))),o.a.createElement(l.Menu,{theme:"dark",onClick:this.handleClick,selectedKeys:[this.state.current],mode:"horizontal"},o.a.createElement(l.Menu.Item,{key:"/menu/home",icon:o.a.createElement(u.MailOutlined,null)},"首页"),o.a.createElement(l.Menu.Item,{key:"/menu/message",icon:o.a.createElement(u.AppstoreOutlined,null)},"Message"),o.a.createElement(l.Menu.Item,{key:"/menu2/home",icon:o.a.createElement(u.SettingOutlined,null)},"菜单2"),o.a.createElement(l.Menu.Item,{key:"/login",icon:o.a.createElement(u.SettingOutlined,null)},"login"),o.a.createElement(l.Menu.Item,{key:"/404",icon:o.a.createElement(u.SettingOutlined,null)},"404"))),o.a.createElement(b,{className:f.a["site-layout"],style:{padding:"0 50px",marginTop:64}},o.a.createElement(l.Breadcrumb,{style:{margin:"16px 0"}},o.a.createElement(l.Breadcrumb.Item,{href:"/menu/home"},"首页"),o.a.createElement(l.Breadcrumb.Item,null,this.curRoute("f_title")),o.a.createElement(l.Breadcrumb.Item,null,this.curRoute("title"))),o.a.createElement("div",{className:f.a["site-layout-background"],style:{padding:24,minHeight:380}},Object(i.renderRoutes)(this.state.route))),o.a.createElement(x,{style:{textAlign:"center"}},"xxxx-xxxxx-菜单1"))}}])&&h(t.prototype,n),r&&h(t,r),s}(o.a.Component))||r;t.default=S}};