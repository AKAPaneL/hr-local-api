(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33ce0e39"],{2017:function(e,t,s){"use strict";s("cafe")},"5a77":function(e,t,s){"use strict";s("650e")},"650e":function(e,t,s){},"7cb3":function(e,t,s){e.exports=s.p+"static/img/login-logo.758b34e9.png"},"9ed6":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[n("img",{attrs:{src:s("7cb3"),alt:""}})])]),n("el-form-item",{attrs:{prop:"mobile"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),n("el-input",{ref:"username",attrs:{placeholder:"请输入手机号",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.mobile,callback:function(t){e.$set(e.loginForm,"mobile",t)},expression:"loginForm.mobile"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),n("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"请输入密码",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),n("el-button",{staticClass:"loginBtn",staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录")]),n("div",{staticClass:"tips"},[n("span",{staticStyle:{"margin-right":"20px"}},[e._v("账号: 13800000002")]),n("span",[e._v(" 密码: 123456(管理员密码无法修改,其他用户可以修改)")])]),n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[n("el-button",{attrs:{type:"warning"}},[n("a",{attrs:{target:"_blank",href:"https://shuiruohanyu.gitee.io/yyds/api.html#u767bu5f550a3ca20id3du767bu5f553e203ca3e"}},[e._v(" 接口文档 ")])])],1)])],1)],1)},r=[],a=(s("96cf"),s("1da1")),i=s("5530"),o=s("61f7"),l=s("2f62"),c={name:"Login",data:function(){var e=function(e,t,s){Object(o["b"])(t)?s():s(new Error("手机号格式不正确"))};return{loginForm:{mobile:"13800000002",password:"123456"},loginRules:{mobile:[{required:!0,trigger:"blur",message:"请输入手机号"},{trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",message:"请输入密码"},{min:6,max:16,message:"密码长度在6-16位之间",trigger:"blur"}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:Object(i["a"])(Object(i["a"])({},Object(l["c"])(["user/login"])),{},{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(s){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!s){t.next=13;break}return e.loading=!0,t.prev=2,t.next=5,e["user/login"](e.loginForm);case 5:e.$router.push("/"),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](2);case 10:return t.prev=10,e.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,null,[[2,8,10,13]])})));return function(e){return t.apply(this,arguments)}}())}})},p=c,u=(s("2017"),s("5a77"),s("2877")),d=Object(u["a"])(p,n,r,!1,null,"47ab16c9",null);t["default"]=d.exports},cafe:function(e,t,s){}}]);