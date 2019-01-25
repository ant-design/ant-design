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

var Divider = function Divider(props) {
  return React.createElement(ConfigConsumer, null, function (_ref) {
    var _classNames;

    var getPrefixCls = _ref.getPrefixCls;

    var customizePrefixCls = props.prefixCls,
        _props$type = props.type,
        type = _props$type === void 0 ? 'horizontal' : _props$type,
        _props$orientation = props.orientation,
        orientation = _props$orientation === void 0 ? '' : _props$orientation,
        className = props.className,
        children = props.children,
        dashed = props.dashed,
        restProps = __rest(props, ["prefixCls", "type", "orientation", "className", "children", "dashed"]);

    var prefixCls = getPrefixCls('divider', customizePrefixCls);
    var orientationPrefix = orientation.length > 0 ? '-' + orientation : orientation;
    var classString = classNames(className, prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-with-text").concat(orientationPrefix), children), _defineProperty(_classNames, "".concat(prefixCls, "-dashed"), !!dashed), _classNames));
    return React.createElement("div", _extends({
      className: classString
    }, restProps), children && React.createElement("span", {
      className: "".concat(prefixCls, "-inner-text")
    }, children));
  });
};

export default Divider;