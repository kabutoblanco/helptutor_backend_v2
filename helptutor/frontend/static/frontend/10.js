(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./frontend/src/components/auth/SetRole.js":
/*!*************************************************!*\
  !*** ./frontend/src/components/auth/SetRole.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SetRole; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_actions_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../redux/actions/auth */ \"./frontend/src/redux/actions/auth/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\n\n\n\nfunction SetRole() {\n  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"useHistory\"])();\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useDispatch\"])();\n  var roles = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useSelector\"])(function (state) {\n    return state.auth.roles;\n  });\n\n  var onSelect = function onSelect(e) {\n    var name = e.target.name;\n\n    if (name == 'tutor') {\n      dispatch(Object(_redux_actions_auth__WEBPACK_IMPORTED_MODULE_2__[\"setRole\"])('tutor'));\n      history.push('tutor');\n    } else if (name == 'student') {\n      dispatch(Object(_redux_actions_auth__WEBPACK_IMPORTED_MODULE_2__[\"setRole\"])('estudiante'));\n      history.push('estudiante');\n    }\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"set-role\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    name: \"tutor\",\n    onClick: onSelect,\n    disabled: !roles[0]\n  }, \"Tutor\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    name: \"student\",\n    onClick: onSelect,\n    disabled: !roles[1]\n  }, \"Estudiante\"));\n}\n\n//# sourceURL=webpack:///./frontend/src/components/auth/SetRole.js?");

/***/ })

}]);