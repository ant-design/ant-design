"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _select = _interopRequireDefault(require("../select"));

var _radio = require("../radio");

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Option = _select["default"].Option;

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    var _this;

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));

    _this.onYearChange = function (year) {
      var _this$props = _this.props,
          value = _this$props.value,
          validRange = _this$props.validRange;
      var newValue = value.clone();
      newValue.year(parseInt(year, 10)); // switch the month so that it remains within range when year changes

      if (validRange) {
        var _validRange = _slicedToArray(validRange, 2),
            start = _validRange[0],
            end = _validRange[1];

        var newYear = newValue.get('year');
        var newMonth = newValue.get('month');

        if (newYear === end.get('year') && newMonth > end.get('month')) {
          newValue.month(end.get('month'));
        }

        if (newYear === start.get('year') && newMonth < start.get('month')) {
          newValue.month(start.get('month'));
        }
      }

      var onValueChange = _this.props.onValueChange;

      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    _this.onMonthChange = function (month) {
      var newValue = _this.props.value.clone();

      newValue.month(parseInt(month, 10));
      var onValueChange = _this.props.onValueChange;

      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    _this.onTypeChange = function (e) {
      var onTypeChange = _this.props.onTypeChange;

      if (onTypeChange) {
        onTypeChange(e.target.value);
      }
    };

    _this.getCalenderHeaderNode = function (node) {
      _this.calenderHeaderNode = node;
    };

    _this.renderHeader = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props2 = _this.props,
          customizePrefixCls = _this$props2.prefixCls,
          type = _this$props2.type,
          value = _this$props2.value,
          locale = _this$props2.locale,
          fullscreen = _this$props2.fullscreen;
      var prefixCls = getPrefixCls('fullcalendar', customizePrefixCls);

      var yearSelect = _this.getYearSelectElement(prefixCls, value.year());

      var monthSelect = type === 'date' ? _this.getMonthSelectElement(prefixCls, value.month(), _this.getMonthsLocale(value)) : null;
      var size = fullscreen ? 'default' : 'small';
      var typeSwitch = React.createElement(_radio.Group, {
        onChange: _this.onTypeChange,
        value: type,
        size: size
      }, React.createElement(_radio.Button, {
        value: "date"
      }, locale.month), React.createElement(_radio.Button, {
        value: "month"
      }, locale.year));
      return React.createElement("div", {
        className: "".concat(prefixCls, "-header"),
        ref: _this.getCalenderHeaderNode
      }, yearSelect, monthSelect, typeSwitch);
    };

    return _this;
  }

  _createClass(Header, [{
    key: "getYearSelectElement",
    value: function getYearSelectElement(prefixCls, year) {
      var _this2 = this;

      var _this$props3 = this.props,
          yearSelectOffset = _this$props3.yearSelectOffset,
          yearSelectTotal = _this$props3.yearSelectTotal,
          locale = _this$props3.locale,
          fullscreen = _this$props3.fullscreen,
          validRange = _this$props3.validRange;
      var start = year - yearSelectOffset;
      var end = start + yearSelectTotal;

      if (validRange) {
        start = validRange[0].get('year');
        end = validRange[1].get('year') + 1;
      }

      var suffix = locale.year === '年' ? '年' : '';
      var options = [];

      for (var index = start; index < end; index++) {
        options.push(React.createElement(Option, {
          key: "".concat(index)
        }, index + suffix));
      }

      return React.createElement(_select["default"], {
        size: fullscreen ? 'default' : 'small',
        dropdownMatchSelectWidth: false,
        className: "".concat(prefixCls, "-year-select"),
        onChange: this.onYearChange,
        value: String(year),
        getPopupContainer: function getPopupContainer() {
          return _this2.calenderHeaderNode;
        }
      }, options);
    }
  }, {
    key: "getMonthsLocale",
    value: function getMonthsLocale(value) {
      var current = value.clone();
      var localeData = value.localeData();
      var months = [];

      for (var i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
      }

      return months;
    }
  }, {
    key: "getMonthSelectElement",
    value: function getMonthSelectElement(prefixCls, month, months) {
      var _this3 = this;

      var _this$props4 = this.props,
          fullscreen = _this$props4.fullscreen,
          validRange = _this$props4.validRange,
          value = _this$props4.value;
      var options = [];
      var start = 0;
      var end = 12;

      if (validRange) {
        var _validRange2 = _slicedToArray(validRange, 2),
            rangeStart = _validRange2[0],
            rangeEnd = _validRange2[1];

        var currentYear = value.get('year');

        if (rangeEnd.get('year') === currentYear) {
          end = rangeEnd.get('month') + 1;
        }

        if (rangeStart.get('year') === currentYear) {
          start = rangeStart.get('month');
        }
      }

      for (var index = start; index < end; index++) {
        options.push(React.createElement(Option, {
          key: "".concat(index)
        }, months[index]));
      }

      return React.createElement(_select["default"], {
        size: fullscreen ? 'default' : 'small',
        dropdownMatchSelectWidth: false,
        className: "".concat(prefixCls, "-month-select"),
        value: String(month),
        onChange: this.onMonthChange,
        getPopupContainer: function getPopupContainer() {
          return _this3.calenderHeaderNode;
        }
      }, options);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderHeader);
    }
  }]);

  return Header;
}(React.Component);

exports["default"] = Header;
Header.defaultProps = {
  yearSelectOffset: 10,
  yearSelectTotal: 20
};