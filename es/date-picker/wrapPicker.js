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

import * as React from 'react';
import TimePickerPanel from "rc-time-picker/es/Panel";
import classNames from 'classnames';
import enUS from './locale/en_US';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker';
import { ConfigConsumer } from '../config-provider';

function getColumns(_ref) {
  var showHour = _ref.showHour,
      showMinute = _ref.showMinute,
      showSecond = _ref.showSecond,
      use12Hours = _ref.use12Hours;
  var column = 0;

  if (showHour) {
    column += 1;
  }

  if (showMinute) {
    column += 1;
  }

  if (showSecond) {
    column += 1;
  }

  if (use12Hours) {
    column += 1;
  }

  return column;
}

export default function wrapPicker(Picker, defaultFormat) {
  var _a;

  return _a =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(PickerWrapper, _React$Component);

    function PickerWrapper() {
      var _this;

      _classCallCheck(this, PickerWrapper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PickerWrapper).apply(this, arguments));

      _this.handleOpenChange = function (open) {
        var onOpenChange = _this.props.onOpenChange;
        onOpenChange(open);
      };

      _this.handleFocus = function (e) {
        var onFocus = _this.props.onFocus;

        if (onFocus) {
          onFocus(e);
        }
      };

      _this.handleBlur = function (e) {
        var onBlur = _this.props.onBlur;

        if (onBlur) {
          onBlur(e);
        }
      };

      _this.handleMouseEnter = function (e) {
        var onMouseEnter = _this.props.onMouseEnter;

        if (onMouseEnter) {
          onMouseEnter(e);
        }
      };

      _this.handleMouseLeave = function (e) {
        var onMouseLeave = _this.props.onMouseLeave;

        if (onMouseLeave) {
          onMouseLeave(e);
        }
      };

      _this.savePicker = function (node) {
        _this.picker = node;
      };

      _this.getDefaultLocale = function () {
        var result = _extends({}, enUS, _this.props.locale);

        result.lang = _extends({}, result.lang, (_this.props.locale || {}).lang);
        return result;
      };

      _this.renderPicker = function (locale, localeCode) {
        return React.createElement(ConfigConsumer, null, function (_ref2) {
          var _classNames2;

          var getPrefixCls = _ref2.getPrefixCls;
          var _this$props = _this.props,
              customizePrefixCls = _this$props.prefixCls,
              customizeInputPrefixCls = _this$props.inputPrefixCls,
              size = _this$props.size,
              disabled = _this$props.disabled,
              showTime = _this$props.showTime;
          var prefixCls = getPrefixCls('calendar', customizePrefixCls);
          var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
          var pickerClass = classNames("".concat(prefixCls, "-picker"), _defineProperty({}, "".concat(prefixCls, "-picker-").concat(size), !!size));
          var pickerInputClass = classNames("".concat(prefixCls, "-picker-input"), inputPrefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(inputPrefixCls, "-lg"), size === 'large'), _defineProperty(_classNames2, "".concat(inputPrefixCls, "-sm"), size === 'small'), _defineProperty(_classNames2, "".concat(inputPrefixCls, "-disabled"), disabled), _classNames2));
          var timeFormat = showTime && showTime.format || 'HH:mm:ss';

          var rcTimePickerProps = _extends({}, generateShowHourMinuteSecond(timeFormat), {
            format: timeFormat,
            use12Hours: showTime && showTime.use12Hours
          });

          var columns = getColumns(rcTimePickerProps);
          var timePickerCls = "".concat(prefixCls, "-time-picker-column-").concat(columns);
          var timePicker = showTime ? React.createElement(TimePickerPanel, _extends({}, rcTimePickerProps, showTime, {
            prefixCls: "".concat(prefixCls, "-time-picker"),
            className: timePickerCls,
            placeholder: locale.timePickerLocale.placeholder,
            transitionName: "slide-up"
          })) : null;
          return React.createElement(Picker, _extends({}, _this.props, {
            ref: _this.savePicker,
            pickerClass: pickerClass,
            pickerInputClass: pickerInputClass,
            locale: locale,
            localeCode: localeCode,
            timePicker: timePicker,
            onOpenChange: _this.handleOpenChange,
            onFocus: _this.handleFocus,
            onBlur: _this.handleBlur,
            onMouseEnter: _this.handleMouseEnter,
            onMouseLeave: _this.handleMouseLeave
          }));
        });
      };

      return _this;
    }

    _createClass(PickerWrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props2 = this.props,
            autoFocus = _this$props2.autoFocus,
            disabled = _this$props2.disabled;

        if (autoFocus && !disabled) {
          this.focus();
        }
      }
    }, {
      key: "focus",
      value: function focus() {
        this.picker.focus();
      }
    }, {
      key: "blur",
      value: function blur() {
        this.picker.blur();
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(LocaleReceiver, {
          componentName: "DatePicker",
          defaultLocale: this.getDefaultLocale
        }, this.renderPicker);
      }
    }]);

    return PickerWrapper;
  }(React.Component), _a.defaultProps = {
    format: defaultFormat || 'YYYY-MM-DD',
    transitionName: 'slide-up',
    popupStyle: {},
    onChange: function onChange() {},
    onOk: function onOk() {},
    onOpenChange: function onOpenChange() {},
    locale: {}
  }, _a;
}