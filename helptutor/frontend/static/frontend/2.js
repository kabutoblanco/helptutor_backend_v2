(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./frontend/src/components/auth/SetRole.js":
/*!*************************************************!*\
  !*** ./frontend/src/components/auth/SetRole.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SetRole; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\n\nfunction SetRole() {\n  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"useHistory\"])();\n\n  var onSelect = function onSelect(e) {\n    var name = e.target.name;\n    if (name == 'tutor') history.replace('tutor');else if (name == 'student') history.replace('estudiante');\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    name: \"tutor\",\n    onClick: onSelect\n  }, \"Tutor\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    name: \"student\",\n    onClick: onSelect\n  }, \"Estudiante\"));\n}\n\n//# sourceURL=webpack:///./frontend/src/components/auth/SetRole.js?");

/***/ })

}]);