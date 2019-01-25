function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
import * as allIcons from '@ant-design/icons/lib/dist';
import ReactIcon from '@ant-design/icons-react';
import createFromIconfontCN from './IconFont';
import { svgBaseProps, withThemeSuffix, removeTypeTheme, getThemeFromTypeName, alias } from './utils';
import warning from '../_util/warning';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor'; // Initial setting

ReactIcon.add.apply(ReactIcon, _toConsumableArray(Object.keys(allIcons).map(function (key) {
  return allIcons[key];
})));
setTwoToneColor('#1890ff');
var defaultTheme = 'outlined';
var dangerousTheme = undefined;

var Icon = function Icon(props) {
  var _classNames;

  var className = props.className,
      type = props.type,
      Component = props.component,
      viewBox = props.viewBox,
      spin = props.spin,
      children = props.children,
      theme = props.theme,
      twoToneColor = props.twoToneColor,
      restProps = __rest(props, ["className", "type", "component", "viewBox", "spin", "children", "theme", "twoToneColor"]);

  warning(Boolean(type || Component || children), 'Icon should have `type` prop or `component` prop or `children`.');
  var classString = classNames((_classNames = {}, _defineProperty(_classNames, "anticon", true), _defineProperty(_classNames, "anticon-".concat(type), Boolean(type)), _classNames), className);
  var svgClassString = classNames(_defineProperty({}, "anticon-spin", !!spin || type === 'loading'));
  var innerNode; // component > children > type

  if (Component) {
    var innerSvgProps = _extends({}, svgBaseProps, {
      className: svgClassString,
      viewBox: viewBox
    });

    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }

    innerNode = React.createElement(Component, innerSvgProps, children);
  }

  if (children) {
    warning(Boolean(viewBox) || React.Children.count(children) === 1 && React.isValidElement(children) && React.Children.only(children).type === 'use', 'Make sure that you provide correct `viewBox`' + ' prop (default `0 0 1024 1024`) to the icon.');

    var _innerSvgProps = _extends({}, svgBaseProps, {
      className: svgClassString
    });

    innerNode = React.createElement("svg", _extends({}, _innerSvgProps, {
      viewBox: viewBox
    }), children);
  }

  if (typeof type === 'string') {
    var computedType = type;

    if (theme) {
      var themeInName = getThemeFromTypeName(type);
      warning(!themeInName || theme === themeInName, "The icon name '".concat(type, "' already specify a theme '").concat(themeInName, "',") + " the 'theme' prop '".concat(theme, "' will be ignored."));
    }

    computedType = withThemeSuffix(removeTypeTheme(alias(computedType)), dangerousTheme || theme || defaultTheme);
    innerNode = React.createElement(ReactIcon, {
      className: svgClassString,
      type: computedType,
      primaryColor: twoToneColor
    });
  }

  return React.createElement("i", _extends({}, restProps, {
    className: classString
  }), innerNode);
};

function unstable_ChangeThemeOfIconsDangerously(theme) {
  warning(false, "You are using the unstable method 'Icon.unstable_ChangeThemeOfAllIconsDangerously', " + "make sure that all the icons with theme '".concat(theme, "' display correctly."));
  dangerousTheme = theme;
}

function unstable_ChangeDefaultThemeOfIcons(theme) {
  warning(false, "You are using the unstable method 'Icon.unstable_ChangeDefaultThemeOfIcons', " + "make sure that all the icons with theme '".concat(theme, "' display correctly."));
  defaultTheme = theme;
}

Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
export default Icon;