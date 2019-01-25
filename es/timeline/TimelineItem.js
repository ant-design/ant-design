function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import { ConfigConsumer } from '../config-provider';

var TimelineItem = function TimelineItem(props) {
  return React.createElement(ConfigConsumer, null, function (_ref) {
    var _classNames, _classNames2;

    var getPrefixCls = _ref.getPrefixCls;

    var customizePrefixCls = props.prefixCls,
        className = props.className,
        _props$color = props.color,
        color = _props$color === void 0 ? '' : _props$color,
        children = props.children,
        pending = props.pending,
        dot = props.dot,
        restProps = __rest(props, ["prefixCls", "className", "color", "children", "pending", "dot"]);

    var prefixCls = getPrefixCls('timeline', customizePrefixCls);
    var itemClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-item"), true), _defineProperty(_classNames, "".concat(prefixCls, "-item-pending"), pending), _classNames), className);
    var dotClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-item-head"), true), _defineProperty(_classNames2, "".concat(prefixCls, "-item-head-custom"), dot), _defineProperty(_classNames2, "".concat(prefixCls, "-item-head-").concat(color), true), _classNames2));
    return React.createElement("li", _extends({}, restProps, {
      className: itemClassName
    }), React.createElement("div", {
      className: "".concat(prefixCls, "-item-tail")
    }), React.createElement("div", {
      className: dotClassName,
      style: {
        borderColor: /blue|red|green/.test(color) ? undefined : color
      }
    }, dot), React.createElement("div", {
      className: "".concat(prefixCls, "-item-content")
    }, children));
  });
};

TimelineItem.defaultProps = {
  color: 'blue',
  pending: false
};
export default TimelineItem;