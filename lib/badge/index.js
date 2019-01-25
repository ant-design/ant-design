"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ScrollNumber = _interopRequireDefault(require("./ScrollNumber"));

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

var Badge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Badge, _React$Component);

  function Badge() {
    var _this;

    _classCallCheck(this, Badge);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Badge).apply(this, arguments));

    _this.renderBadge = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          count = _a.count,
          showZero = _a.showZero,
          customizePrefixCls = _a.prefixCls,
          customizeScrollNumberPrefixCls = _a.scrollNumberPrefixCls,
          overflowCount = _a.overflowCount,
          className = _a.className,
          style = _a.style,
          children = _a.children,
          dot = _a.dot,
          status = _a.status,
          text = _a.text,
          offset = _a.offset,
          title = _a.title,
          restProps = __rest(_a, ["count", "showZero", "prefixCls", "scrollNumberPrefixCls", "overflowCount", "className", "style", "children", "dot", "status", "text", "offset", "title"]);

      var prefixCls = getPrefixCls('badge', customizePrefixCls);
      var scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);

      var scrollNumber = _this.renderBadgeNumber(prefixCls, scrollNumberPrefixCls);

      var statusText = _this.renderStatusText(prefixCls);

      var statusCls = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-status-dot"), !!status), _defineProperty(_classNames, "".concat(prefixCls, "-status-").concat(status), !!status), _classNames)); // <Badge status="success" />

      if (!children && status) {
        return React.createElement("span", _extends({}, restProps, {
          className: _this.getBadgeClassName(prefixCls),
          style: _this.getStyleWithOffset()
        }), React.createElement("span", {
          className: statusCls
        }), React.createElement("span", {
          className: "".concat(prefixCls, "-status-text")
        }, text));
      }

      return React.createElement("span", _extends({}, restProps, {
        className: _this.getBadgeClassName(prefixCls)
      }), children, React.createElement(_rcAnimate["default"], {
        component: "",
        showProp: "data-show",
        transitionName: children ? "".concat(prefixCls, "-zoom") : '',
        transitionAppear: true
      }, scrollNumber), statusText);
    };

    return _this;
  }

  _createClass(Badge, [{
    key: "getBadgeClassName",
    value: function getBadgeClassName(prefixCls) {
      var _classNames2;

      var _this$props = this.props,
          className = _this$props.className,
          status = _this$props.status,
          children = _this$props.children;
      return (0, _classnames["default"])(className, prefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-status"), !!status), _defineProperty(_classNames2, "".concat(prefixCls, "-not-a-wrapper"), !children), _classNames2));
    }
  }, {
    key: "isZero",
    value: function isZero() {
      var numberedDispayCount = this.getNumberedDispayCount();
      return numberedDispayCount === '0' || numberedDispayCount === 0;
    }
  }, {
    key: "isDot",
    value: function isDot() {
      var _this$props2 = this.props,
          dot = _this$props2.dot,
          status = _this$props2.status;
      var isZero = this.isZero();
      return dot && !isZero || status;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      var showZero = this.props.showZero;
      var displayCount = this.getDispayCount();
      var isZero = this.isZero();
      var isDot = this.isDot();
      var isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
      return (isEmpty || isZero && !showZero) && !isDot;
    }
  }, {
    key: "getNumberedDispayCount",
    value: function getNumberedDispayCount() {
      var _this$props3 = this.props,
          count = _this$props3.count,
          overflowCount = _this$props3.overflowCount;
      var displayCount = count > overflowCount ? "".concat(overflowCount, "+") : count;
      return displayCount;
    }
  }, {
    key: "getDispayCount",
    value: function getDispayCount() {
      var isDot = this.isDot(); // dot mode don't need count

      if (isDot) {
        return '';
      }

      return this.getNumberedDispayCount();
    }
  }, {
    key: "getScrollNumberTitle",
    value: function getScrollNumberTitle() {
      var _this$props4 = this.props,
          title = _this$props4.title,
          count = _this$props4.count;

      if (title) {
        return title;
      }

      return typeof count === 'string' || typeof count === 'number' ? count : undefined;
    }
  }, {
    key: "getStyleWithOffset",
    value: function getStyleWithOffset() {
      var _this$props5 = this.props,
          offset = _this$props5.offset,
          style = _this$props5.style;
      return offset ? _extends({
        right: -parseInt(offset[0], 10),
        marginTop: offset[1]
      }, style) : style;
    }
  }, {
    key: "renderStatusText",
    value: function renderStatusText(prefixCls) {
      var text = this.props.text;
      var hidden = this.isHidden();
      return hidden || !text ? null : React.createElement("span", {
        className: "".concat(prefixCls, "-status-text")
      }, text);
    }
  }, {
    key: "renderDispayComponent",
    value: function renderDispayComponent() {
      var count = this.props.count;
      var customNode = count;

      if (!customNode || _typeof(customNode) !== 'object') {
        return undefined;
      }

      return React.cloneElement(customNode, {
        style: _extends({}, this.getStyleWithOffset(), customNode.props && customNode.props.style)
      });
    }
  }, {
    key: "renderBadgeNumber",
    value: function renderBadgeNumber(prefixCls, scrollNumberPrefixCls) {
      var _classNames3;

      var _this$props6 = this.props,
          count = _this$props6.count,
          status = _this$props6.status;
      var displayCount = this.getDispayCount();
      var isDot = this.isDot();
      var hidden = this.isHidden();
      var scrollNumberCls = (0, _classnames["default"])((_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefixCls, "-dot"), isDot), _defineProperty(_classNames3, "".concat(prefixCls, "-count"), !isDot), _defineProperty(_classNames3, "".concat(prefixCls, "-multiple-words"), !isDot && count && count.toString && count.toString().length > 1), _defineProperty(_classNames3, "".concat(prefixCls, "-status-").concat(status), !!status), _classNames3));
      return hidden ? null : React.createElement(_ScrollNumber["default"], {
        prefixCls: scrollNumberPrefixCls,
        "data-show": !hidden,
        className: scrollNumberCls,
        count: displayCount,
        displayComponent: this.renderDispayComponent() // <Badge status="success" count={<Icon type="xxx" />}></Badge>
        ,
        title: this.getScrollNumberTitle(),
        style: this.getStyleWithOffset(),
        key: "scrollNumber"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderBadge);
    }
  }]);

  return Badge;
}(React.Component);

exports["default"] = Badge;
Badge.defaultProps = {
  count: null,
  showZero: false,
  dot: false,
  overflowCount: 99
};
Badge.propTypes = {
  count: PropTypes.node,
  showZero: PropTypes.bool,
  dot: PropTypes.bool,
  overflowCount: PropTypes.number
};