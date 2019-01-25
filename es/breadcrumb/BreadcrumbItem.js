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
import { ConfigConsumer } from '../config-provider';

var BreadcrumbItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BreadcrumbItem, _React$Component);

  function BreadcrumbItem() {
    var _this;

    _classCallCheck(this, BreadcrumbItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BreadcrumbItem).apply(this, arguments));

    _this.renderBreadcrumbItem = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          separator = _a.separator,
          children = _a.children,
          restProps = __rest(_a, ["prefixCls", "separator", "children"]);

      var prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
      var link;

      if ('href' in _this.props) {
        link = React.createElement("a", _extends({
          className: "".concat(prefixCls, "-link")
        }, restProps), children);
      } else {
        link = React.createElement("span", _extends({
          className: "".concat(prefixCls, "-link")
        }, restProps), children);
      }

      if (children) {
        return React.createElement("span", null, link, React.createElement("span", {
          className: "".concat(prefixCls, "-separator")
        }, separator));
      }

      return null;
    };

    return _this;
  }

  _createClass(BreadcrumbItem, [{
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderBreadcrumbItem);
    }
  }]);

  return BreadcrumbItem;
}(React.Component);

export { BreadcrumbItem as default };
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
BreadcrumbItem.defaultProps = {
  separator: '/'
};
BreadcrumbItem.propTypes = {
  prefixCls: PropTypes.string,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  href: PropTypes.string
};