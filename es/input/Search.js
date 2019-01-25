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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';
import Button from '../button';
import { ConfigConsumer } from '../config-provider';

var Search =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search() {
    var _this;

    _classCallCheck(this, Search);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Search).apply(this, arguments));

    _this.onSearch = function (e) {
      var onSearch = _this.props.onSearch;

      if (onSearch) {
        onSearch(_this.input.input.value, e);
      }

      _this.input.focus();
    };

    _this.saveInput = function (node) {
      _this.input = node;
    };

    _this.renderSearch = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          customizeInputPrefixCls = _a.inputPrefixCls,
          className = _a.className,
          size = _a.size,
          suffix = _a.suffix,
          enterButton = _a.enterButton,
          others = __rest(_a, ["prefixCls", "inputPrefixCls", "className", "size", "suffix", "enterButton"]);

      delete others.onSearch;
      var prefixCls = getPrefixCls('input-search', customizePrefixCls);
      var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

      var buttonOrIcon = _this.getButtonOrIcon(prefixCls);

      var searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;

      if (Array.isArray(searchSuffix)) {
        searchSuffix = searchSuffix.map(function (item, index) {
          if (!React.isValidElement(item) || item.key) {
            return item;
          }

          return React.cloneElement(item, {
            key: index
          });
        });
      }

      var inputClassName = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-enter-button"), !!enterButton), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), !!size), _classNames));
      return React.createElement(Input, _extends({
        onPressEnter: _this.onSearch
      }, others, {
        size: size,
        className: inputClassName,
        prefixCls: inputPrefixCls,
        suffix: searchSuffix,
        ref: _this.saveInput
      }));
    };

    return _this;
  }

  _createClass(Search, [{
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
    key: "getButtonOrIcon",
    value: function getButtonOrIcon(prefixCls) {
      var _this$props = this.props,
          enterButton = _this$props.enterButton,
          size = _this$props.size,
          disabled = _this$props.disabled;
      var enterButtonAsElement = enterButton;
      var node;

      if (!enterButton) {
        node = React.createElement(Icon, {
          className: "".concat(prefixCls, "-icon"),
          type: "search",
          key: "searchIcon"
        });
      } else if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
        node = React.cloneElement(enterButtonAsElement, enterButtonAsElement.type === Button ? {
          className: "".concat(prefixCls, "-button"),
          size: size
        } : {});
      } else {
        node = React.createElement(Button, {
          className: "".concat(prefixCls, "-button"),
          type: "primary",
          size: size,
          disabled: disabled,
          key: "enterButton"
        }, enterButton === true ? React.createElement(Icon, {
          type: "search"
        }) : enterButton);
      }

      return React.cloneElement(node, {
        onClick: this.onSearch
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderSearch);
    }
  }]);

  return Search;
}(React.Component);

export { Search as default };
Search.defaultProps = {
  enterButton: false
};