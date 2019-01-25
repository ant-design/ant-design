"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _raf = _interopRequireDefault(require("raf"));

var _configProvider = require("../config-provider");

var _getScroll = _interopRequireDefault(require("../_util/getScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

function noop() {}

function getDefaultTarget() {
  return window;
}

var BackTop =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BackTop, _React$Component);

  function BackTop(props) {
    var _this;

    _classCallCheck(this, BackTop);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BackTop).call(this, props));

    _this.getCurrentScrollTop = function () {
      var getTarget = _this.props.target || getDefaultTarget;
      var targetNode = getTarget();

      if (targetNode === window) {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      }

      return targetNode.scrollTop;
    };

    _this.scrollToTop = function (e) {
      var scrollTop = _this.getCurrentScrollTop();

      var startTime = Date.now();

      var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;

        _this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));

        if (time < 450) {
          (0, _raf["default"])(frameFunc);
        } else {
          _this.setScrollTop(0);
        }
      };

      (0, _raf["default"])(frameFunc);
      (_this.props.onClick || noop)(e);
    };

    _this.handleScroll = function () {
      var _this$props = _this.props,
          visibilityHeight = _this$props.visibilityHeight,
          _this$props$target = _this$props.target,
          target = _this$props$target === void 0 ? getDefaultTarget : _this$props$target;
      var scrollTop = (0, _getScroll["default"])(target(), true);

      _this.setState({
        visible: scrollTop > visibilityHeight
      });
    };

    _this.renderBackTop = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props2 = _this.props,
          customizePrefixCls = _this$props2.prefixCls,
          _this$props2$classNam = _this$props2.className,
          className = _this$props2$classNam === void 0 ? '' : _this$props2$classNam,
          children = _this$props2.children;
      var prefixCls = getPrefixCls('back-top', customizePrefixCls);
      var classString = (0, _classnames["default"])(prefixCls, className);
      var defaultElement = React.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-icon")
      })); // fix https://fb.me/react-unknown-prop

      var divProps = (0, _omit["default"])(_this.props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target', 'visible']);
      var visible = 'visible' in _this.props ? _this.props.visible : _this.state.visible;
      var backTopBtn = visible ? React.createElement("div", _extends({}, divProps, {
        className: classString,
        onClick: _this.scrollToTop
      }), children || defaultElement) : null;
      return React.createElement(_rcAnimate["default"], {
        component: "",
        transitionName: "fade"
      }, backTopBtn);
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(BackTop, [{
    key: "setScrollTop",
    value: function setScrollTop(value) {
      var getTarget = this.props.target || getDefaultTarget;
      var targetNode = getTarget();

      if (targetNode === window) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
      } else {
        targetNode.scrollTop = value;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var getTarget = this.props.target || getDefaultTarget;
      this.scrollEvent = (0, _addEventListener["default"])(getTarget(), 'scroll', this.handleScroll);
      this.handleScroll();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollEvent) {
        this.scrollEvent.remove();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderBackTop);
    }
  }]);

  return BackTop;
}(React.Component);

exports["default"] = BackTop;
BackTop.defaultProps = {
  visibilityHeight: 400
};