"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateShowHourMinuteSecond = generateShowHourMinuteSecond;
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var moment = _interopRequireWildcard(require("moment"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _TimePicker = _interopRequireDefault(require("rc-time-picker/lib/TimePicker"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _configProvider = require("../config-provider");

var _en_US = _interopRequireDefault(require("./locale/en_US"));

var _interopDefault = _interopRequireDefault(require("../_util/interopDefault"));

var _icon = _interopRequireDefault(require("../icon"));

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

function generateShowHourMinuteSecond(format) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1,
    showMinute: format.indexOf('m') > -1,
    showSecond: format.indexOf('s') > -1
  };
}

var TimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    var _this;

    _classCallCheck(this, TimePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimePicker).call(this, props));

    _this.handleChange = function (value) {
      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          _this$props$format = _this$props.format,
          format = _this$props$format === void 0 ? 'HH:mm:ss' : _this$props$format;

      if (onChange) {
        onChange(value, value && value.format(format) || '');
      }
    };

    _this.handleOpenClose = function (_ref) {
      var open = _ref.open;
      var onOpenChange = _this.props.onOpenChange;

      if (onOpenChange) {
        onOpenChange(open);
      }
    };

    _this.saveTimePicker = function (timePickerRef) {
      _this.timePickerRef = timePickerRef;
    };

    _this.renderTimePicker = function (locale) {
      return React.createElement(_configProvider.ConfigConsumer, null, function (_ref2) {
        var _classNames2;

        var getContextPopupContainer = _ref2.getPopupContainer,
            getPrefixCls = _ref2.getPrefixCls;

        var _a = _this.props,
            getPopupContainer = _a.getPopupContainer,
            customizePrefixCls = _a.prefixCls,
            props = __rest(_a, ["getPopupContainer", "prefixCls"]);

        delete props.defaultValue;

        var format = _this.getDefaultFormat();

        var prefixCls = getPrefixCls('time-picker', customizePrefixCls);
        var className = (0, _classnames["default"])(props.className, _defineProperty({}, "".concat(prefixCls, "-").concat(props.size), !!props.size));

        var addon = function addon(panel) {
          return props.addon ? React.createElement("div", {
            className: "".concat(prefixCls, "-panel-addon")
          }, props.addon(panel)) : null;
        };

        var suffixIcon = props.suffixIcon;
        var clockIcon = suffixIcon && (React.isValidElement(suffixIcon) ? React.cloneElement(suffixIcon, {
          className: (0, _classnames["default"])((_classNames2 = {}, _defineProperty(_classNames2, suffixIcon.props.className, suffixIcon.props.className), _defineProperty(_classNames2, "".concat(prefixCls, "-clock-icon"), true), _classNames2))
        }) : React.createElement("span", {
          className: "".concat(prefixCls, "-clock-icon")
        }, suffixIcon)) || React.createElement(_icon["default"], {
          type: "clock-circle",
          className: "".concat(prefixCls, "-clock-icon"),
          theme: "outlined"
        });
        var inputIcon = React.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, clockIcon);
        var clearIcon = React.createElement(_icon["default"], {
          type: "close-circle",
          className: "".concat(prefixCls, "-panel-clear-btn-icon"),
          theme: "filled"
        });
        return React.createElement(_TimePicker["default"], _extends({}, generateShowHourMinuteSecond(format), props, {
          prefixCls: prefixCls,
          getPopupContainer: getPopupContainer || getContextPopupContainer,
          ref: _this.saveTimePicker,
          format: format,
          className: className,
          value: _this.state.value,
          placeholder: props.placeholder === undefined ? locale.placeholder : props.placeholder,
          onChange: _this.handleChange,
          onOpen: _this.handleOpenClose,
          onClose: _this.handleOpenClose,
          addon: addon,
          inputIcon: inputIcon,
          clearIcon: clearIcon
        }));
      });
    };

    var value = props.value || props.defaultValue;

    if (value && !(0, _interopDefault["default"])(moment).isMoment(value)) {
      throw new Error('The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' + 'see: https://u.ant.design/time-picker-value');
    }

    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: "focus",
    value: function focus() {
      this.timePickerRef.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.timePickerRef.blur();
    }
  }, {
    key: "getDefaultFormat",
    value: function getDefaultFormat() {
      var _this$props2 = this.props,
          format = _this$props2.format,
          use12Hours = _this$props2.use12Hours;

      if (format) {
        return format;
      } else if (use12Hours) {
        return 'h:mm:ss a';
      }

      return 'HH:mm:ss';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_LocaleReceiver["default"], {
        componentName: "TimePicker",
        defaultLocale: _en_US["default"]
      }, this.renderTimePicker);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('value' in nextProps) {
        return {
          value: nextProps.value
        };
      }

      return null;
    }
  }]);

  return TimePicker;
}(React.Component);

TimePicker.defaultProps = {
  align: {
    offset: [0, -2]
  },
  disabled: false,
  disabledHours: undefined,
  disabledMinutes: undefined,
  disabledSeconds: undefined,
  hideDisabledOptions: false,
  placement: 'bottomLeft',
  transitionName: 'slide-up',
  focusOnOpen: true
};
(0, _reactLifecyclesCompat.polyfill)(TimePicker);
var _default = TimePicker;
exports["default"] = _default;