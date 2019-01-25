function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import * as PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import omit from 'omit.js';
import Icon from '../icon';
import Tooltip from '../tooltip';
import { ConfigConsumer } from '../config-provider';

var Rate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Rate, _React$Component);

  function Rate() {
    var _this;

    _classCallCheck(this, Rate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rate).apply(this, arguments));

    _this.saveRate = function (node) {
      _this.rcRate = node;
    };

    _this.characterRender = function (node, _ref) {
      var index = _ref.index;
      var tooltips = _this.props.tooltips;
      if (!tooltips) return node;
      return React.createElement(Tooltip, {
        title: tooltips[index]
      }, node);
    };

    _this.renderRate = function (_ref2) {
      var getPrefixCls = _ref2.getPrefixCls;

      var _a = _this.props,
          prefixCls = _a.prefixCls,
          restProps = __rest(_a, ["prefixCls"]);

      var rateProps = omit(restProps, ['tooltips']);
      return React.createElement(RcRate, _extends({
        ref: _this.saveRate,
        characterRender: _this.characterRender
      }, rateProps, {
        prefixCls: getPrefixCls('rate', prefixCls)
      }));
    };

    return _this;
  }

  _createClass(Rate, [{
    key: "focus",
    value: function focus() {
      this.rcRate.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.rcRate.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderRate);
    }
  }]);

  return Rate;
}(React.Component);

export { Rate as default };
Rate.propTypes = {
  prefixCls: PropTypes.string,
  character: PropTypes.node
};
Rate.defaultProps = {
  character: React.createElement(Icon, {
    type: "star",
    theme: "filled"
  })
};