function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';

function generator(_ref) {
  var suffixCls = _ref.suffixCls;
  return function (BasicComponent) {
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(Adapter, _React$Component);

        function Adapter() {
          var _this;

          _classCallCheck(this, Adapter);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(Adapter).apply(this, arguments));

          _this.renderComponent = function (_ref2) {
            var getPrefixCls = _ref2.getPrefixCls;
            var customizePrefixCls = _this.props.prefixCls;
            var prefixCls = getPrefixCls(suffixCls, customizePrefixCls);
            return React.createElement(BasicComponent, _extends({
              prefixCls: prefixCls
            }, _this.props));
          };

          return _this;
        }

        _createClass(Adapter, [{
          key: "render",
          value: function render() {
            return React.createElement(ConfigConsumer, null, this.renderComponent);
          }
        }]);

        return Adapter;
      }(React.Component)
    );
  };
}

var Basic =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Basic, _React$Component2);

  function Basic() {
    _classCallCheck(this, Basic);

    return _possibleConstructorReturn(this, _getPrototypeOf(Basic).apply(this, arguments));
  }

  _createClass(Basic, [{
    key: "render",
    value: function render() {
      var _a = this.props,
          prefixCls = _a.prefixCls,
          className = _a.className,
          children = _a.children,
          others = __rest(_a, ["prefixCls", "className", "children"]);

      var divCls = classNames(className, prefixCls);
      return React.createElement("div", _extends({
        className: divCls
      }, others), children);
    }
  }]);

  return Basic;
}(React.Component);

var BasicLayout =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(BasicLayout, _React$Component3);

  function BasicLayout() {
    var _this2;

    _classCallCheck(this, BasicLayout);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(BasicLayout).apply(this, arguments));
    _this2.state = {
      siders: []
    };
    return _this2;
  }

  _createClass(BasicLayout, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this3 = this;

      return {
        siderHook: {
          addSider: function addSider(id) {
            _this3.setState(function (state) {
              return {
                siders: [].concat(_toConsumableArray(state.siders), [id])
              };
            });
          },
          removeSider: function removeSider(id) {
            _this3.setState(function (state) {
              return {
                siders: state.siders.filter(function (currentId) {
                  return currentId !== id;
                })
              };
            });
          }
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _a = this.props,
          prefixCls = _a.prefixCls,
          className = _a.className,
          children = _a.children,
          hasSider = _a.hasSider,
          others = __rest(_a, ["prefixCls", "className", "children", "hasSider"]);

      var divCls = classNames(className, prefixCls, _defineProperty({}, "".concat(prefixCls, "-has-sider"), hasSider || this.state.siders.length > 0));
      return React.createElement("div", _extends({
        className: divCls
      }, others), children);
    }
  }]);

  return BasicLayout;
}(React.Component);

BasicLayout.childContextTypes = {
  siderHook: PropTypes.object
};
var Layout = generator({
  suffixCls: 'layout'
})(BasicLayout);
var Header = generator({
  suffixCls: 'layout-header'
})(Basic);
var Footer = generator({
  suffixCls: 'layout-footer'
})(Basic);
var Content = generator({
  suffixCls: 'layout-content'
})(Basic);
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
export default Layout;