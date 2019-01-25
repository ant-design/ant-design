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

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import { ConfigConsumer } from '../config-provider';
import Icon from '../icon';
import { tuple } from '../_util/type';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}

var InputSizes = tuple('small', 'default', 'large');

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props));

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

    _this.saveInput = function (node) {
      _this.input = node;
    };

    _this.handleReset = function (e) {
      _this.setValue('', e);
    };

    _this.handleChange = function (e) {
      _this.setValue(e.target.value, e);
    };

    _this.renderComponent = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var customizePrefixCls = _this.props.prefixCls;
      var prefixCls = getPrefixCls('input', customizePrefixCls);
      return _this.renderLabeledInput(prefixCls, _this.renderInput(prefixCls));
    };

    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(Input, [{
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "select",
    value: function select() {
      this.input.select();
    }
  }, {
    key: "getInputClassName",
    value: function getInputClassName(prefixCls) {
      var _classNames;

      var _this$props2 = this.props,
          size = _this$props2.size,
          disabled = _this$props2.disabled;
      return classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
    }
  }, {
    key: "setValue",
    value: function setValue(value, e) {
      if (!('value' in this.props)) {
        this.setState({
          value: value
        });
      }

      var onChange = this.props.onChange;

      if (onChange) {
        var event = e;

        if (e.type === 'click') {
          // click clear icon
          event = Object.create(e);
          event.target = this.input;
          event.currentTarget = this.input;
          var originalInputValue = this.input.value; // change input value cause e.target.value should be '' when clear input

          this.input.value = '';
          onChange(event); // reset input value

          this.input.value = originalInputValue;
          return;
        }

        onChange(event);
      }
    }
  }, {
    key: "renderClearIcon",
    value: function renderClearIcon(prefixCls) {
      var allowClear = this.props.allowClear;
      var value = this.state.value;

      if (!allowClear || value === undefined || value === '') {
        return null;
      }

      return React.createElement(Icon, {
        type: "close-circle",
        theme: "filled",
        onClick: this.handleReset,
        className: "".concat(prefixCls, "-clear-icon"),
        role: "button"
      });
    }
  }, {
    key: "renderSuffix",
    value: function renderSuffix(prefixCls) {
      var _this$props3 = this.props,
          suffix = _this$props3.suffix,
          allowClear = _this$props3.allowClear;

      if (suffix || allowClear) {
        return React.createElement("span", {
          className: "".concat(prefixCls, "-suffix")
        }, this.renderClearIcon(prefixCls), suffix);
      }

      return null;
    }
  }, {
    key: "renderLabeledInput",
    value: function renderLabeledInput(prefixCls, children) {
      var _classNames3;

      var props = this.props; // Not wrap when there is not addons

      if (!props.addonBefore && !props.addonAfter) {
        return children;
      }

      var wrapperClassName = "".concat(prefixCls, "-group");
      var addonClassName = "".concat(wrapperClassName, "-addon");
      var addonBefore = props.addonBefore ? React.createElement("span", {
        className: addonClassName
      }, props.addonBefore) : null;
      var addonAfter = props.addonAfter ? React.createElement("span", {
        className: addonClassName
      }, props.addonAfter) : null;
      var className = classNames("".concat(prefixCls, "-wrapper"), _defineProperty({}, wrapperClassName, addonBefore || addonAfter));
      var groupClassName = classNames("".concat(prefixCls, "-group-wrapper"), (_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefixCls, "-group-wrapper-sm"), props.size === 'small'), _defineProperty(_classNames3, "".concat(prefixCls, "-group-wrapper-lg"), props.size === 'large'), _classNames3)); // Need another wrapper for changing display:table to display:inline-block
      // and put style prop in wrapper

      return React.createElement("span", {
        className: groupClassName,
        style: props.style
      }, React.createElement("span", {
        className: className
      }, addonBefore, React.cloneElement(children, {
        style: null
      }), addonAfter));
    }
  }, {
    key: "renderLabeledIcon",
    value: function renderLabeledIcon(prefixCls, children) {
      var _classNames4;

      var props = this.props;
      var suffix = this.renderSuffix(prefixCls);

      if (!('prefix' in props) && !suffix) {
        return children;
      }

      var prefix = props.prefix ? React.createElement("span", {
        className: "".concat(prefixCls, "-prefix")
      }, props.prefix) : null;
      var affixWrapperCls = classNames(props.className, "".concat(prefixCls, "-affix-wrapper"), (_classNames4 = {}, _defineProperty(_classNames4, "".concat(prefixCls, "-affix-wrapper-sm"), props.size === 'small'), _defineProperty(_classNames4, "".concat(prefixCls, "-affix-wrapper-lg"), props.size === 'large'), _classNames4));
      return React.createElement("span", {
        className: affixWrapperCls,
        style: props.style
      }, prefix, React.cloneElement(children, {
        style: null,
        className: this.getInputClassName(prefixCls)
      }), suffix);
    }
  }, {
    key: "renderInput",
    value: function renderInput(prefixCls) {
      var className = this.props.className;
      var value = this.state.value; // Fix https://fb.me/react-unknown-prop

      var otherProps = omit(this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'allowClear', // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue']);
      return this.renderLabeledIcon(prefixCls, React.createElement("input", _extends({}, otherProps, {
        value: fixControlledValue(value),
        onChange: this.handleChange,
        className: classNames(this.getInputClassName(prefixCls), className),
        onKeyDown: this.handleKeyDown,
        ref: this.saveInput
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderComponent);
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

  return Input;
}(React.Component);

Input.defaultProps = {
  type: 'text',
  disabled: false
};
Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(InputSizes),
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  prefixCls: PropTypes.string,
  onPressEnter: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  allowClear: PropTypes.bool
};
polyfill(Input);
export default Input;