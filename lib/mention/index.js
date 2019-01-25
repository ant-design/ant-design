"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcEditorMention = _interopRequireWildcard(require("rc-editor-mention"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

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

var Mention =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Mention, _React$Component);

  function Mention(props) {
    var _this;

    _classCallCheck(this, Mention);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mention).call(this, props));

    _this.onSearchChange = function (value, prefix) {
      if (_this.props.onSearchChange) {
        return _this.props.onSearchChange(value, prefix);
      }

      return _this.defaultSearchChange(value);
    };

    _this.onChange = function (editorState) {
      if (_this.props.onChange) {
        _this.props.onChange(editorState);
      }
    };

    _this.onFocus = function (ev) {
      _this.setState({
        focus: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(ev);
      }
    };

    _this.onBlur = function (ev) {
      _this.setState({
        focus: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(ev);
      }
    };

    _this.focus = function () {
      _this.mentionEle._editor.focusEditor();
    };

    _this.mentionRef = function (ele) {
      _this.mentionEle = ele;
    };

    _this.renderMention = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          loading = _this$props.loading,
          placement = _this$props.placement,
          suggestions = _this$props.suggestions;
      var _this$state = _this.state,
          filteredSuggestions = _this$state.filteredSuggestions,
          focus = _this$state.focus;
      var prefixCls = getPrefixCls('mention', customizePrefixCls);
      var cls = (0, _classnames["default"])(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-active"), focus), _defineProperty(_classNames, "".concat(prefixCls, "-placement-top"), placement === 'top'), _classNames));
      var notFoundContent = loading ? React.createElement(_icon["default"], {
        type: "loading"
      }) : _this.props.notFoundContent;
      return React.createElement(_rcEditorMention["default"], _extends({}, _this.props, {
        prefixCls: prefixCls,
        className: cls,
        ref: _this.mentionRef,
        onSearchChange: _this.onSearchChange,
        onChange: _this.onChange,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        suggestions: suggestions || filteredSuggestions,
        notFoundContent: notFoundContent
      }));
    };

    _this.state = {
      filteredSuggestions: props.defaultSuggestions,
      focus: false
    };
    return _this;
  }

  _createClass(Mention, [{
    key: "defaultSearchChange",
    value: function defaultSearchChange(value) {
      var searchValue = value.toLowerCase();
      var filteredSuggestions = (this.props.defaultSuggestions || []).filter(function (suggestion) {
        if (suggestion.type && suggestion.type === _rcEditorMention.Nav) {
          return suggestion.props.value ? suggestion.props.value.toLowerCase().indexOf(searchValue) !== -1 : true;
        }

        return suggestion.toLowerCase().indexOf(searchValue) !== -1;
      });
      this.setState({
        filteredSuggestions: filteredSuggestions
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderMention);
    }
  }]);

  return Mention;
}(React.Component);

Mention.getMentions = _rcEditorMention.getMentions;
Mention.defaultProps = {
  notFoundContent: '无匹配结果，轻敲空格完成输入',
  loading: false,
  multiLines: false,
  placement: 'bottom'
};
Mention.Nav = _rcEditorMention.Nav;
Mention.toString = _rcEditorMention.toString;
Mention.toContentState = _rcEditorMention.toEditorState;
(0, _reactLifecyclesCompat.polyfill)(Mention);
var _default = Mention;
exports["default"] = _default;