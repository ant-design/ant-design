"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _omit = _interopRequireDefault(require("omit.js"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _calculateNodeHeight = _interopRequireDefault(require("./calculateNodeHeight"));

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

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }

  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

var TextArea =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextArea, _React$Component);

  function TextArea() {
    var _this;

    _classCallCheck(this, TextArea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextArea).apply(this, arguments));
    _this.state = {
      textareaStyles: {}
    };

    _this.resizeOnNextFrame = function () {
      if (_this.nextFrameActionId) {
        clearNextFrameAction(_this.nextFrameActionId);
      }

      _this.nextFrameActionId = onNextFrame(_this.resizeTextarea);
    };

    _this.resizeTextarea = function () {
      var autosize = _this.props.autosize;

      if (!autosize || !_this.textAreaRef) {
        return;
      }

      var minRows = autosize ? autosize.minRows : null;
      var maxRows = autosize ? autosize.maxRows : null;
      var textareaStyles = (0, _calculateNodeHeight["default"])(_this.textAreaRef, false, minRows, maxRows);

      _this.setState({
        textareaStyles: textareaStyles
      });
    };

    _this.handleTextareaChange = function (e) {
      if (!('value' in _this.props)) {
        _this.resizeTextarea();
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(e);
      }
    };

    _this.handleKeyDown = function (e) {
      var _this$props = _this.props,
          onPressEnter = _this$props.onPressEnter,
          onKeyDown = _this$props.onKeyDown;

      if (e.keyCode === 13 && onPressEnter) {
        onPressEnter(e);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    _this.saveTextAreaRef = function (textArea) {
      _this.textAreaRef = textArea;
    };

    _this.renderTextArea = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props2 = _this.props,
          customizePrefixCls = _this$props2.prefixCls,
          className = _this$props2.className,
          disabled = _this$props2.disabled;

      var props = __rest(_this.props, []);

      var otherProps = (0, _omit["default"])(props, ['prefixCls', 'onPressEnter', 'autosize']);
      var prefixCls = getPrefixCls('input', customizePrefixCls);
      var cls = (0, _classnames["default"])(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled));

      var style = _extends({}, props.style, _this.state.textareaStyles); // Fix https://github.com/ant-design/ant-design/issues/6776
      // Make sure it could be reset when using form.getFieldDecorator


      if ('value' in otherProps) {
        otherProps.value = otherProps.value || '';
      }

      return React.createElement("textarea", _extends({}, otherProps, {
        className: cls,
        style: style,
        onKeyDown: _this.handleKeyDown,
        onChange: _this.handleTextareaChange,
        ref: _this.saveTextAreaRef
      }));
    };

    return _this;
  }

  _createClass(TextArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeTextarea();
      this.updateResizeObserverHook();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Re-render with the new content then recalculate the height as required.
      if (prevProps.value !== this.props.value) {
        this.resizeOnNextFrame();
      }

      this.updateResizeObserverHook();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    } // We will update hooks if `autosize` prop change

  }, {
    key: "updateResizeObserverHook",
    value: function updateResizeObserverHook() {
      if (!this.resizeObserver && this.props.autosize) {
        // Add resize observer
        this.resizeObserver = new _resizeObserverPolyfill["default"](this.resizeOnNextFrame);
        this.resizeObserver.observe(this.textAreaRef);
      } else if (this.resizeObserver && !this.props.autosize) {
        // Remove resize observer
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.textAreaRef.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.textAreaRef.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderTextArea);
    }
  }]);

  return TextArea;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(TextArea);
var _default = TextArea;
exports["default"] = _default;