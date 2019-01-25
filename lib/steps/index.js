"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _rcSteps = _interopRequireDefault(require("rc-steps"));

var _icon = _interopRequireDefault(require("../icon"));

var _configProvider = require("../config-provider");

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

var Steps =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Steps, _React$Component);

  function Steps() {
    var _this;

    _classCallCheck(this, Steps);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Steps).apply(this, arguments));

    _this.renderSteps = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var prefixCls = getPrefixCls('steps', _this.props.prefixCls);
      var iconPrefix = getPrefixCls('', _this.props.iconPrefix);
      var icons = {
        finish: React.createElement(_icon["default"], {
          type: "check",
          className: "".concat(prefixCls, "-finish-icon")
        }),
        error: React.createElement(_icon["default"], {
          type: "close",
          className: "".concat(prefixCls, "-error-icon")
        })
      };
      return React.createElement(_rcSteps["default"], _extends({
        icons: icons
      }, _this.props, {
        prefixCls: prefixCls,
        iconPrefix: iconPrefix
      }));
    };

    return _this;
  }

  _createClass(Steps, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderSteps);
    }
  }]);

  return Steps;
}(React.Component);

exports["default"] = Steps;
Steps.Step = _rcSteps["default"].Step;
Steps.defaultProps = {
  current: 0
};
Steps.propTypes = {
  prefixCls: PropTypes.string,
  iconPrefix: PropTypes.string,
  current: PropTypes.number
};