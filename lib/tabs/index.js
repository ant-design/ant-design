"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _rcTabs = _interopRequireWildcard(require("rc-tabs"));

var _TabContent = _interopRequireDefault(require("rc-tabs/lib/TabContent"));

var _TabBar = _interopRequireDefault(require("./TabBar"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _configProvider = require("../config-provider");

var _warning = _interopRequireDefault(require("../_util/warning"));

var _isFlexSupported = _interopRequireDefault(require("../_util/isFlexSupported"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).apply(this, arguments));

    _this.removeTab = function (targetKey, e) {
      e.stopPropagation();

      if (!targetKey) {
        return;
      }

      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(targetKey, 'remove');
      }
    };

    _this.handleChange = function (activeKey) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(activeKey);
      }
    };

    _this.createNewTab = function (targetKey) {
      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(targetKey, 'add');
      }
    };

    _this.renderTabs = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          size = _this$props.size,
          _this$props$type = _this$props.type,
          type = _this$props$type === void 0 ? 'line' : _this$props$type,
          tabPosition = _this$props.tabPosition,
          children = _this$props.children,
          _this$props$animated = _this$props.animated,
          animated = _this$props$animated === void 0 ? true : _this$props$animated,
          hideAdd = _this$props.hideAdd;
      var tabBarExtraContent = _this.props.tabBarExtraContent;
      var tabPaneAnimated = _typeof(animated) === 'object' ? animated.tabPane : animated; // card tabs should not have animation

      if (type !== 'line') {
        tabPaneAnimated = 'animated' in _this.props ? tabPaneAnimated : false;
      }

      (0, _warning["default"])(!(type.indexOf('card') >= 0 && (size === 'small' || size === 'large')), "Tabs[type=card|editable-card] doesn't have small or large size, it's by design.");
      var prefixCls = getPrefixCls('tabs', customizePrefixCls);
      var cls = (0, _classnames["default"])(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-vertical"), tabPosition === 'left' || tabPosition === 'right'), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), !!size), _defineProperty(_classNames, "".concat(prefixCls, "-card"), type.indexOf('card') >= 0), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type), true), _defineProperty(_classNames, "".concat(prefixCls, "-no-animation"), !tabPaneAnimated), _classNames)); // only card type tabs can be added and closed

      var childrenWithClose = [];

      if (type === 'editable-card') {
        childrenWithClose = [];
        React.Children.forEach(children, function (child, index) {
          var closable = child.props.closable;
          closable = typeof closable === 'undefined' ? true : closable;
          var closeIcon = closable ? React.createElement(_icon["default"], {
            type: "close",
            className: "".concat(prefixCls, "-close-x"),
            onClick: function onClick(e) {
              return _this.removeTab(child.key, e);
            }
          }) : null;
          childrenWithClose.push(React.cloneElement(child, {
            tab: React.createElement("div", {
              className: closable ? undefined : "".concat(prefixCls, "-tab-unclosable")
            }, child.props.tab, closeIcon),
            key: child.key || index
          }));
        }); // Add new tab handler

        if (!hideAdd) {
          tabBarExtraContent = React.createElement("span", null, React.createElement(_icon["default"], {
            type: "plus",
            className: "".concat(prefixCls, "-new-tab"),
            onClick: _this.createNewTab
          }), tabBarExtraContent);
        }
      }

      tabBarExtraContent = tabBarExtraContent ? React.createElement("div", {
        className: "".concat(prefixCls, "-extra-content")
      }, tabBarExtraContent) : null;

      var _a = _this.props,
          dropped = _a.className,
          tabBarProps = __rest(_a, ["className"]);

      var contentCls = (0, _classnames["default"])("".concat(prefixCls, "-").concat(tabPosition, "-content"), type.indexOf('card') >= 0 && "".concat(prefixCls, "-card-content"));
      return React.createElement(_rcTabs["default"], _extends({}, _this.props, {
        prefixCls: prefixCls,
        className: cls,
        tabBarPosition: tabPosition,
        renderTabBar: function renderTabBar() {
          return React.createElement(_TabBar["default"], _extends({}, tabBarProps, {
            tabBarExtraContent: tabBarExtraContent
          }));
        },
        renderTabContent: function renderTabContent() {
          return React.createElement(_TabContent["default"], {
            className: contentCls,
            animated: tabPaneAnimated,
            animatedWithMargin: true
          });
        },
        onChange: _this.handleChange
      }), childrenWithClose.length > 0 ? childrenWithClose : children);
    };

    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var NO_FLEX = ' no-flex';
      var tabNode = ReactDOM.findDOMNode(this);

      if (tabNode && !(0, _isFlexSupported["default"])() && tabNode.className.indexOf(NO_FLEX) === -1) {
        tabNode.className += NO_FLEX;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderTabs);
    }
  }]);

  return Tabs;
}(React.Component);

exports["default"] = Tabs;
Tabs.TabPane = _rcTabs.TabPane;
Tabs.defaultProps = {
  hideAdd: false,
  tabPosition: 'top'
};