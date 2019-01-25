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

import * as React from 'react';
import createReactContext from 'create-react-context';
import defaultRenderEmpty from './renderEmpty';
var ConfigContext = createReactContext({
  // We provide a default function for Context without provider
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return "ant-".concat(suffixCls);
  },
  renderEmpty: defaultRenderEmpty
});
export var ConfigConsumer = ConfigContext.Consumer;

var ConfigProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfigProvider, _React$Component);

  function ConfigProvider() {
    var _this;

    _classCallCheck(this, ConfigProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigProvider).apply(this, arguments));

    _this.getPrefixCls = function (suffixCls, customizePrefixCls) {
      var _this$props$prefixCls = _this.props.prefixCls,
          prefixCls = _this$props$prefixCls === void 0 ? 'ant' : _this$props$prefixCls;
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
    };

    _this.renderProvider = function (context) {
      var _this$props = _this.props,
          children = _this$props.children,
          getPopupContainer = _this$props.getPopupContainer,
          renderEmpty = _this$props.renderEmpty;

      var config = _extends({}, context, {
        getPrefixCls: _this.getPrefixCls
      });

      if (getPopupContainer) {
        config.getPopupContainer = getPopupContainer;
      }

      if (renderEmpty) {
        config.renderEmpty = renderEmpty;
      }

      return React.createElement(ConfigContext.Provider, {
        value: config
      }, children);
    };

    return _this;
  }

  _createClass(ConfigProvider, [{
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderProvider);
    }
  }]);

  return ConfigProvider;
}(React.Component);

export function withConfigConsumer(config) {
  return function (Component) {
    // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
    return function (props) {
      return React.createElement(ConfigConsumer, null, function (configProps) {
        var basicPrefixCls = config.prefixCls;
        var getPrefixCls = configProps.getPrefixCls;
        var customizePrefixCls = props.prefixCls;
        var prefixCls = getPrefixCls(basicPrefixCls, customizePrefixCls);
        return React.createElement(Component, _extends({}, configProps, props, {
          prefixCls: prefixCls
        }));
      });
    };
  };
}
export default ConfigProvider;