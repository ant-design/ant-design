"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var warned = {};

var _default = function _default(valid, message) {
  if (!valid && !warned[message]) {
    (0, _warning["default"])(false, message);
    warned[message] = true;
  }
};

exports["default"] = _default;