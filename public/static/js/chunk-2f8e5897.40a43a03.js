(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f8e5897"],{"24a7":function(e,t,n){},"44b4":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"reset"},[n("el-button",{staticClass:"reset-button",attrs:{loading:e.loading,type:"primary",circle:""},on:{click:e.resetData}},[e._v(" "+e._s(e.loading?"重置中...":"点击重置")+" ")])],1)},r=[],s=(n("96cf"),n("1da1")),c=n("b775"),i={data:function(){return{loading:!1}},methods:{resetData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,Object(c["a"])({url:"/reset",method:"post"});case 4:e.$message.success("重置数据库成功"),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),e.$message.error("重置数据库失败"+t.t0.message);case 10:return t.prev=10,e.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,null,[[1,7,10,13]])})))()}}},o=i,u=(n("a9ee"),n("2877")),l=Object(u["a"])(o,a,r,!1,null,"066a54e9",null);t["default"]=l.exports},a9ee:function(e,t,n){"use strict";n("24a7")}}]);