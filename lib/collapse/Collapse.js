"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcCollapse = _interopRequireDefault(require("rc-collapse"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CollapsePanel = _interopRequireDefault(require("./CollapsePanel"));

var _icon = _interopRequireDefault(require("../icon"));

var _configProvider = require("../config-provider");

var _openAnimation = _interopRequireDefault(require("../_util/openAnimation"));

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

var Collapse =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse() {
    var _this;

    _classCallCheck(this, Collapse);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Collapse).apply(this, arguments));

    _this.renderExpandIcon = function () {
      return React.createElement(_icon["default"], {
        type: "right",
        className: "arrow"
      });
    };

    _this.renderCollapse = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          bordered = _this$props.bordered;
      var prefixCls = getPrefixCls('collapse', customizePrefixCls);
      var collapseClassName = (0, _classnames["default"])(_defineProperty({}, "".concat(prefixCls, "-borderless"), !bordered), className);
      return React.createElement(_rcCollapse["default"], _extends({}, _this.props, {
        prefixCls: prefixCls,
        className: collapseClassName,
        expandIcon: _this.renderExpandIcon
      }));
    };

    return _this;
  }

  _createClass(Collapse, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderCollapse);
    }
  }]);

  return Collapse;
}(React.Component);

exports["default"] = Collapse;
Collapse.Panel = _CollapsePanel["default"];
Collapse.defaultProps = {
  bordered: true,
  openAnimation: _extends({}, _openAnimation["default"], {
    appear: function appear() {}
  })
};