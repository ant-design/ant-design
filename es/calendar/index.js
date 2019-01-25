function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import FullCalendar from "rc-calendar/es/FullCalendar";
import Header from './Header';
import enUS from './locale/en_US';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer } from '../config-provider';
import interopDefault from '../_util/interopDefault';

function noop() {
  return null;
}

function zerofixed(v) {
  if (v < 10) {
    return "0".concat(v);
  }

  return "".concat(v);
}

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

    _this.monthCellRender = function (value) {
      var _this$props$monthCell = _this.props.monthCellRender,
          monthCellRender = _this$props$monthCell === void 0 ? noop : _this$props$monthCell;

      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          prefixCls = _assertThisInitialize.prefixCls;

      return React.createElement("div", {
        className: "".concat(prefixCls, "-month")
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-value")
      }, value.localeData().monthsShort(value)), React.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, monthCellRender(value)));
    };

    _this.dateCellRender = function (value) {
      var _this$props$dateCellR = _this.props.dateCellRender,
          dateCellRender = _this$props$dateCellR === void 0 ? noop : _this$props$dateCellR;

      var _assertThisInitialize2 = _assertThisInitialized(_assertThisInitialized(_this)),
          prefixCls = _assertThisInitialize2.prefixCls;

      return React.createElement("div", {
        className: "".concat(prefixCls, "-date")
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-value")
      }, zerofixed(value.date())), React.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, dateCellRender(value)));
    };

    _this.setValue = function (value, way) {
      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      if (way === 'select') {
        if (_this.props.onSelect) {
          _this.props.onSelect(value);
        }
      } else if (way === 'changePanel') {
        _this.onPanelChange(value, _this.state.mode);
      }
    };

    _this.setType = function (type) {
      var mode = type === 'date' ? 'month' : 'year';

      if (_this.state.mode !== mode) {
        _this.setState({
          mode: mode
        });

        _this.onPanelChange(_this.state.value, mode);
      }
    };

    _this.onHeaderValueChange = function (value) {
      _this.setValue(value, 'changePanel');
    };

    _this.onHeaderTypeChange = function (type) {
      _this.setType(type);
    };

    _this.onSelect = function (value) {
      _this.setValue(value, 'select');
    };

    _this.getDateRange = function (validRange, disabledDate) {
      return function (current) {
        if (!current) {
          return false;
        }

        var _validRange = _slicedToArray(validRange, 2),
            startDate = _validRange[0],
            endDate = _validRange[1];

        var inRange = !current.isBetween(startDate, endDate, 'days', '[]');

        if (disabledDate) {
          return disabledDate(current) || inRange;
        }

        return inRange;
      };
    };

    _this.getDefaultLocale = function () {
      var result = _extends({}, enUS, _this.props.locale);

      result.lang = _extends({}, result.lang, (_this.props.locale || {}).lang);
      return result;
    };

    _this.renderCalendar = function (locale, localeCode) {
      var _assertThisInitialize3 = _assertThisInitialized(_assertThisInitialized(_this)),
          state = _assertThisInitialize3.state,
          props = _assertThisInitialize3.props;

      var value = state.value,
          mode = state.mode;

      if (value && localeCode) {
        value.locale(localeCode);
      }

      var customizePrefixCls = props.prefixCls,
          style = props.style,
          className = props.className,
          fullscreen = props.fullscreen,
          dateFullCellRender = props.dateFullCellRender,
          monthFullCellRender = props.monthFullCellRender;
      var type = mode === 'year' ? 'month' : 'date';
      var monthCellRender = monthFullCellRender || _this.monthCellRender;
      var dateCellRender = dateFullCellRender || _this.dateCellRender;
      var disabledDate = props.disabledDate;

      if (props.validRange) {
        disabledDate = _this.getDateRange(props.validRange, disabledDate);
      }

      return React.createElement(ConfigConsumer, null, function (_ref) {
        var getPrefixCls = _ref.getPrefixCls;
        var prefixCls = getPrefixCls('fullcalendar', customizePrefixCls); // To support old version react.
        // Have to add prefixCls on the instance.
        // https://github.com/facebook/react/issues/12397

        _this.prefixCls = prefixCls;
        var cls = className || '';

        if (fullscreen) {
          cls += " ".concat(prefixCls, "-fullscreen");
        }

        return React.createElement("div", {
          className: cls,
          style: style
        }, React.createElement(Header, {
          fullscreen: fullscreen,
          type: type,
          value: value,
          locale: locale.lang,
          prefixCls: prefixCls,
          onTypeChange: _this.onHeaderTypeChange,
          onValueChange: _this.onHeaderValueChange,
          validRange: props.validRange
        }), React.createElement(FullCalendar, _extends({}, props, {
          disabledDate: disabledDate,
          Select: noop,
          locale: locale.lang,
          type: type,
          prefixCls: prefixCls,
          showHeader: false,
          value: value,
          monthCellRender: monthCellRender,
          dateCellRender: dateCellRender,
          onSelect: _this.onSelect
        })));
      });
    };

    var value = props.value || props.defaultValue || interopDefault(moment)();

    if (!interopDefault(moment).isMoment(value)) {
      throw new Error('The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' + 'see: https://u.ant.design/calendar-value');
    }

    _this.state = {
      value: value,
      mode: props.mode
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value
        });
      }

      if ('mode' in nextProps && nextProps.mode !== this.props.mode) {
        this.setState({
          mode: nextProps.mode
        });
      }
    }
  }, {
    key: "onPanelChange",
    value: function onPanelChange(value, mode) {
      var _this$props = this.props,
          onPanelChange = _this$props.onPanelChange,
          onChange = _this$props.onChange;

      if (onPanelChange) {
        onPanelChange(value, mode);
      }

      if (onChange && value !== this.state.value) {
        onChange(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(LocaleReceiver, {
        componentName: "Calendar",
        defaultLocale: this.getDefaultLocale
      }, this.renderCalendar);
    }
  }]);

  return Calendar;
}(React.Component);

export { Calendar as default };
Calendar.defaultProps = {
  locale: {},
  fullscreen: true,
  mode: 'month',
  onSelect: noop,
  onPanelChange: noop,
  onChange: noop
};
Calendar.propTypes = {
  monthCellRender: PropTypes.func,
  dateCellRender: PropTypes.func,
  monthFullCellRender: PropTypes.func,
  dateFullCellRender: PropTypes.func,
  fullscreen: PropTypes.bool,
  locale: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onPanelChange: PropTypes.func,
  value: PropTypes.object,
  onSelect: PropTypes.func,
  onChange: PropTypes.func
};