(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{209:function(e,t,n){var r=n(210);e.exports=function(e,t){if(null==e)return{};var n,o,u=r(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u},e.exports.default=e.exports,e.exports.__esModule=!0},210:function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o},e.exports.default=e.exports,e.exports.__esModule=!0},354:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var r=n(39),o=n.n(r),u=n(209),a=n.n(u),c=n(0),i=n.n(c),l=n(7),p=n(22),s=["component"];function f(e){var t=e.component,n=a()(e,s),r=Object(p.d)((function(e){return e.auth}));return r.isLoading?i.a.createElement("div",null,"Cargando..."):i.a.createElement(l.b,o()({},n,{render:function(e){return r.isAuthenticated?i.a.createElement(t,e):i.a.createElement(l.a,{to:"/login"})}}))}}}]);