(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./frontend/src/components/layout/NavBar.js":
/*!**************************************************!*\
  !*** ./frontend/src/components/layout/NavBar.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return NavBar; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_actions_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions/auth */ \"./frontend/src/redux/actions/auth/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n\n // ROUTER\n\n // REDUX\n\n // ACTIONS\n\n\n\nfunction NavBar() {\n  var dispacth = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"])();\n  var auth = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useSelector\"])(function (state) {\n    return state.auth;\n  });\n  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useHistory\"])();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(null),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      anchorEl = _useState2[0],\n      setAnchorEl = _useState2[1];\n\n  var handleOpen = function handleOpen(e) {\n    setAnchorEl(e.currentTarget);\n  };\n\n  var handleClose = function handleClose() {\n    setAnchorEl(null);\n  };\n\n  var authLinks = auth.roleCurrent != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"Avatar\"], {\n    \"aria-controls\": \"menu\",\n    onClick: handleOpen,\n    alt: \"user photo\",\n    src: auth.user != null ? auth.user.photo : ''\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"b\", null, auth.user != null ? auth.user.first_name[0] : '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"Menu\"], {\n    id: \"menu\",\n    \"aria-labelledby\": \"menu\",\n    anchorEl: anchorEl,\n    open: Boolean(anchorEl),\n    onClose: handleClose\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"MenuItem\"], {\n    onClick: function onClick() {\n      history.push('/' + auth.roleCurrent + '/perfil');\n      handleClose();\n    }\n  }, \"Perfil\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"MenuItem\"], {\n    onClick: function onClick() {\n      handleClose();\n      dispacth(Object(_redux_actions_auth__WEBPACK_IMPORTED_MODULE_4__[\"logout\"])());\n    }\n  }, \"Cerrar sesi\\xF3n\"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null);\n  var guestLinks = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n    className: \"btn btn-outline-primary mr-2\",\n    onClick: function onClick() {\n      return history.push('registro');\n    }\n  }, \"REGISTRARME\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n    className: \"btn btn-outline-primary\",\n    onClick: function onClick() {\n      return history.push('login');\n    }\n  }, \"INICIAR SESION\"));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"navbar navbar-main\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"container-fluid\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"a\", {\n    href: \"\",\n    className: \"navbar-brand\"\n  }, \"Helptutor\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"navbar-profile\"\n  }, auth.isAuthenticated ? authLinks : guestLinks)));\n}\n\n//# sourceURL=webpack:///./frontend/src/components/layout/NavBar.js?");

/***/ })

}]);