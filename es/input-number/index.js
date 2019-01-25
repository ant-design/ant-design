function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Icon from '../icon';
import { ConfigConsumer } from '../config-provider';

var InputNumber =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputNumber, _React$Component);

  function InputNumber() {
    var _this;

    _classCallCheck(this, InputNumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputNumber).apply(this, arguments));

    _this.renderInputNumber = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          className = _a.className,
          size = _a.size,
          customizePrefixCls = _a.prefixCls,
          others = __rest(_a, ["className", "size", "prefixCls"]);

      var prefixCls = getPrefixCls('input-number', customizePrefixCls);
      var inputNumberClass = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames), className);
      var upIcon = React.createElement(Icon, {
        type: "up",
        className: "".concat(prefixCls, "-handler-up-inner")
      });
      var downIcon = React.createElement(Icon, {
        type: "down",
        className: "".concat(prefixCls, "-handler-down-inner")
      });
      return React.createElement(RcInputNumber, _extends({
        ref: function ref(c) {
          return _this.inputNumberRef = c;
        },
        className: inputNumberClass,
        upHandler: upIcon,
        downHandler: downIcon,
        prefixCls: prefixCls
      }, others));
    };

    return _this;
  }

  _createClass(InputNumber, [{
    key: "focus",
    value: function focus() {
      this.inputNumberRef.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.inputNumberRef.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderInputNumber);
    }
  }]);

  return InputNumber;
}(React.Component);

export { InputNumber as default };
InputNumber.defaultProps = {
  step: 1
};