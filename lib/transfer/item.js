"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _PureRenderMixin = _interopRequireDefault(require("rc-util/lib/PureRenderMixin"));

var _reactLazyLoad = _interopRequireDefault(require("react-lazy-load"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

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

var Item =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _getPrototypeOf(Item).apply(this, arguments));
  }

  _createClass(Item, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _PureRenderMixin["default"].shouldComponentUpdate.apply(this, args);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          renderedText = _this$props.renderedText,
          renderedEl = _this$props.renderedEl,
          item = _this$props.item,
          lazy = _this$props.lazy,
          checked = _this$props.checked,
          disabled = _this$props.disabled,
          prefixCls = _this$props.prefixCls,
          onClick = _this$props.onClick;
      var className = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-content-item"), true), _defineProperty(_classNames, "".concat(prefixCls, "-content-item-disabled"), disabled || item.disabled), _classNames));
      var title = undefined;

      if (typeof renderedText === 'string' || typeof renderedText === 'number') {
        title = String(renderedText);
      }

      var listItem = React.createElement("li", {
        className: className,
        title: title,
        onClick: disabled || item.disabled ? undefined : function () {
          return onClick(item);
        }
      }, React.createElement(_checkbox["default"], {
        checked: checked,
        disabled: disabled || item.disabled
      }), React.createElement("span", null, renderedEl));
      var children = null;

      if (lazy) {
        var lazyProps = _extends({
          height: 32,
          offset: 500,
          throttle: 0,
          debounce: false
        }, lazy);

        children = React.createElement(_reactLazyLoad["default"], lazyProps, listItem);
      } else {
        children = listItem;
      }

      return children;
    }
  }]);

  return Item;
}(React.Component);

exports["default"] = Item;