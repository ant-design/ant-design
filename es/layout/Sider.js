function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import { ConfigConsumer } from '../config-provider'; // matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82

if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import omit from 'omit.js';
import * as PropTypes from 'prop-types';
import Icon from '../icon';
import isNumeric from '../_util/isNumeric';
var dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
};

var generateId = function () {
  var i = 0;
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    i += 1;
    return "".concat(prefix).concat(i);
  };
}();

var Sider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Sider, _React$Component);

  function Sider(props) {
    var _this;

    _classCallCheck(this, Sider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sider).call(this, props));

    _this.responsiveHandler = function (mql) {
      _this.setState({
        below: mql.matches
      });

      var onBreakpoint = _this.props.onBreakpoint;

      if (onBreakpoint) {
        onBreakpoint(mql.matches);
      }

      if (_this.state.collapsed !== mql.matches) {
        _this.setCollapsed(mql.matches, 'responsive');
      }
    };

    _this.setCollapsed = function (collapsed, type) {
      if (!('collapsed' in _this.props)) {
        _this.setState({
          collapsed: collapsed
        });
      }

      var onCollapse = _this.props.onCollapse;

      if (onCollapse) {
        onCollapse(collapsed, type);
      }
    };

    _this.toggle = function () {
      var collapsed = !_this.state.collapsed;

      _this.setCollapsed(collapsed, 'clickTrigger');
    };

    _this.belowShowChange = function () {
      _this.setState({
        belowShow: !_this.state.belowShow
      });
    };

    _this.renderSider = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          className = _a.className,
          theme = _a.theme,
          collapsible = _a.collapsible,
          reverseArrow = _a.reverseArrow,
          trigger = _a.trigger,
          style = _a.style,
          width = _a.width,
          collapsedWidth = _a.collapsedWidth,
          others = __rest(_a, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth"]);

      var prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
      var divProps = omit(others, ['collapsed', 'defaultCollapsed', 'onCollapse', 'breakpoint', 'onBreakpoint']);
      var rawWidth = _this.state.collapsed ? collapsedWidth : width; // use "px" as fallback unit for width

      var siderWidth = isNumeric(rawWidth) ? "".concat(rawWidth, "px") : String(rawWidth); // special trigger when collapsedWidth == 0

      var zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? React.createElement("span", {
        onClick: _this.toggle,
        className: "".concat(prefixCls, "-zero-width-trigger")
      }, React.createElement(Icon, {
        type: "bars"
      })) : null;
      var iconObj = {
        expanded: reverseArrow ? React.createElement(Icon, {
          type: "right"
        }) : React.createElement(Icon, {
          type: "left"
        }),
        collapsed: reverseArrow ? React.createElement(Icon, {
          type: "left"
        }) : React.createElement(Icon, {
          type: "right"
        })
      };
      var status = _this.state.collapsed ? 'collapsed' : 'expanded';
      var defaultTrigger = iconObj[status];
      var triggerDom = trigger !== null ? zeroWidthTrigger || React.createElement("div", {
        className: "".concat(prefixCls, "-trigger"),
        onClick: _this.toggle,
        style: {
          width: siderWidth
        }
      }, trigger || defaultTrigger) : null;

      var divStyle = _extends({}, style, {
        flex: "0 0 ".concat(siderWidth),
        maxWidth: siderWidth,
        minWidth: siderWidth,
        width: siderWidth
      });

      var siderCls = classNames(className, prefixCls, "".concat(prefixCls, "-").concat(theme), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-collapsed"), !!_this.state.collapsed), _defineProperty(_classNames, "".concat(prefixCls, "-has-trigger"), collapsible && trigger !== null && !zeroWidthTrigger), _defineProperty(_classNames, "".concat(prefixCls, "-below"), !!_this.state.below), _defineProperty(_classNames, "".concat(prefixCls, "-zero-width"), parseFloat(siderWidth) === 0), _classNames));
      return React.createElement("div", _extends({
        className: siderCls
      }, divProps, {
        style: divStyle
      }), React.createElement("div", {
        className: "".concat(prefixCls, "-children")
      }, _this.props.children), collapsible || _this.state.below && zeroWidthTrigger ? triggerDom : null);
    };

    _this.uniqueId = generateId('ant-sider-');
    var matchMedia;

    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia;
    }

    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
      _this.mql = matchMedia("(max-width: ".concat(dimensionMap[props.breakpoint], ")"));
    }

    var collapsed;

    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = props.defaultCollapsed;
    }

    _this.state = {
      collapsed: collapsed,
      below: false
    };
    return _this;
  }

  _createClass(Sider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        siderCollapsed: this.state.collapsed,
        collapsedWidth: this.props.collapsedWidth
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.mql) {
        this.mql.addListener(this.responsiveHandler);
        this.responsiveHandler(this.mql);
      }

      if (this.context.siderHook) {
        this.context.siderHook.addSider(this.uniqueId);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.mql) {
        this.mql.removeListener(this.responsiveHandler);
      }

      if (this.context.siderHook) {
        this.context.siderHook.removeSider(this.uniqueId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderSider);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('collapsed' in nextProps) {
        return {
          collapsed: nextProps.collapsed
        };
      }

      return null;
    }
  }]);

  return Sider;
}(React.Component);

Sider.__ANT_LAYOUT_SIDER = true;
Sider.defaultProps = {
  collapsible: false,
  defaultCollapsed: false,
  reverseArrow: false,
  width: 200,
  collapsedWidth: 80,
  style: {},
  theme: 'dark'
};
Sider.childContextTypes = {
  siderCollapsed: PropTypes.bool,
  collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
Sider.contextTypes = {
  siderHook: PropTypes.object
};
polyfill(Sider);
export default Sider;