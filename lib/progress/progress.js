"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var PropTypes = _interopRequireWildcard(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _icon = _interopRequireDefault(require("../icon"));

var _rcProgress = require("rc-progress");

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _type = require("../_util/type");

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

var statusColorMap = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068'
};
var ProgressTypes = (0, _type.tuple)('line', 'circle', 'dashboard');
var ProgressStatuses = (0, _type.tuple)('normal', 'exception', 'active', 'success');

var validProgress = function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  } else if (progress > 100) {
    return 100;
  }

  return progress;
};

var Progress =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Progress, _React$Component);

  function Progress() {
    var _this;

    _classCallCheck(this, Progress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));

    _this.renderProgress = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;
      var props = _this.props;

      var customizePrefixCls = props.prefixCls,
          className = props.className,
          _props$percent = props.percent,
          percent = _props$percent === void 0 ? 0 : _props$percent,
          status = props.status,
          format = props.format,
          trailColor = props.trailColor,
          size = props.size,
          successPercent = props.successPercent,
          type = props.type,
          strokeWidth = props.strokeWidth,
          width = props.width,
          showInfo = props.showInfo,
          _props$gapDegree = props.gapDegree,
          gapDegree = _props$gapDegree === void 0 ? 0 : _props$gapDegree,
          gapPosition = props.gapPosition,
          strokeColor = props.strokeColor,
          _props$strokeLinecap = props.strokeLinecap,
          strokeLinecap = _props$strokeLinecap === void 0 ? 'round' : _props$strokeLinecap,
          restProps = __rest(props, ["prefixCls", "className", "percent", "status", "format", "trailColor", "size", "successPercent", "type", "strokeWidth", "width", "showInfo", "gapDegree", "gapPosition", "strokeColor", "strokeLinecap"]);

      var prefixCls = getPrefixCls('progress', customizePrefixCls);
      var progressStatus = parseInt(successPercent ? successPercent.toString() : percent.toString(), 10) >= 100 && !('status' in props) ? 'success' : status || 'normal';
      var progressInfo;
      var progress;

      var textFormatter = format || function (percentNumber) {
        return "".concat(percentNumber, "%");
      };

      if (showInfo) {
        var text;
        var iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';

        if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
          text = textFormatter(validProgress(percent), validProgress(successPercent));
        } else if (progressStatus === 'exception') {
          text = React.createElement(_icon["default"], {
            type: "close".concat(iconType),
            theme: type === 'line' ? 'filled' : 'outlined'
          });
        } else if (progressStatus === 'success') {
          text = React.createElement(_icon["default"], {
            type: "check".concat(iconType),
            theme: type === 'line' ? 'filled' : 'outlined'
          });
        }

        progressInfo = React.createElement("span", {
          className: "".concat(prefixCls, "-text"),
          title: typeof text === 'string' ? text : undefined
        }, text);
      }

      if (type === 'line') {
        var percentStyle = {
          width: "".concat(validProgress(percent), "%"),
          height: strokeWidth || (size === 'small' ? 6 : 8),
          background: strokeColor,
          borderRadius: strokeLinecap === 'square' ? 0 : '100px'
        };
        var successPercentStyle = {
          width: "".concat(validProgress(successPercent), "%"),
          height: strokeWidth || (size === 'small' ? 6 : 8),
          borderRadius: strokeLinecap === 'square' ? 0 : '100px'
        };
        var successSegment = successPercent !== undefined ? React.createElement("div", {
          className: "".concat(prefixCls, "-success-bg"),
          style: successPercentStyle
        }) : null;
        progress = React.createElement("div", null, React.createElement("div", {
          className: "".concat(prefixCls, "-outer")
        }, React.createElement("div", {
          className: "".concat(prefixCls, "-inner")
        }, React.createElement("div", {
          className: "".concat(prefixCls, "-bg"),
          style: percentStyle
        }), successSegment)), progressInfo);
      } else if (type === 'circle' || type === 'dashboard') {
        var circleSize = width || 120;
        var circleStyle = {
          width: circleSize,
          height: circleSize,
          fontSize: circleSize * 0.15 + 6
        };
        var circleWidth = strokeWidth || 6;
        var gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
        var gapDeg = gapDegree || type === 'dashboard' && 75;
        progress = React.createElement("div", {
          className: "".concat(prefixCls, "-inner"),
          style: circleStyle
        }, React.createElement(_rcProgress.Circle, {
          percent: validProgress(percent),
          strokeWidth: circleWidth,
          trailWidth: circleWidth,
          strokeColor: strokeColor || statusColorMap[progressStatus],
          strokeLinecap: strokeLinecap,
          trailColor: trailColor,
          prefixCls: prefixCls,
          gapDegree: gapDeg,
          gapPosition: gapPos
        }), progressInfo);
      }

      var classString = (0, _classnames["default"])(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type === 'dashboard' && 'circle' || type), true), _defineProperty(_classNames, "".concat(prefixCls, "-status-").concat(progressStatus), true), _defineProperty(_classNames, "".concat(prefixCls, "-show-info"), showInfo), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _classNames), className);
      return React.createElement("div", _extends({}, restProps, {
        className: classString
      }), progress);
    };

    return _this;
  }

  _createClass(Progress, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderProgress);
    }
  }]);

  return Progress;
}(React.Component);

exports["default"] = Progress;
Progress.defaultProps = {
  type: 'line',
  percent: 0,
  showInfo: true,
  trailColor: '#f3f3f3',
  size: 'default'
};
Progress.propTypes = {
  status: PropTypes.oneOf(ProgressStatuses),
  type: PropTypes.oneOf(ProgressTypes),
  showInfo: PropTypes.bool,
  percent: PropTypes.number,
  width: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  strokeColor: PropTypes.string,
  trailColor: PropTypes.string,
  format: PropTypes.func,
  gapDegree: PropTypes.number,
  "default": PropTypes.oneOf(['default', 'small'])
};