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
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import InputElement from './InputElement';
import Input from '../input';
import Select from '../select';
import { ConfigConsumer } from '../config-provider';

function isSelectOptionOrSelectOptGroup(child) {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

var AutoComplete =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutoComplete, _React$Component);

  function AutoComplete() {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoComplete).apply(this, arguments));

    _this.getInputElement = function () {
      var children = _this.props.children;
      var element = children && React.isValidElement(children) && children.type !== Option ? React.Children.only(_this.props.children) : React.createElement(Input, null);

      var elementProps = _extends({}, element.props); // https://github.com/ant-design/ant-design/pull/7742


      delete elementProps.children;
      return React.createElement(InputElement, elementProps, element);
    };

    _this.saveSelect = function (node) {
      _this.select = node;
    };

    _this.renderAutoComplete = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          size = _this$props.size,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          notFoundContent = _this$props.notFoundContent,
          optionLabelProp = _this$props.optionLabelProp,
          dataSource = _this$props.dataSource,
          children = _this$props.children;
      var prefixCls = getPrefixCls('select', customizePrefixCls);
      var cls = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, "".concat(prefixCls, "-show-search"), true), _defineProperty(_classNames, "".concat(prefixCls, "-auto-complete"), true), _classNames));
      var options;
      var childArray = React.Children.toArray(children);

      if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
        options = children;
      } else {
        options = dataSource ? dataSource.map(function (item) {
          if (React.isValidElement(item)) {
            return item;
          }

          switch (_typeof(item)) {
            case 'string':
              return React.createElement(Option, {
                key: item
              }, item);

            case 'object':
              return React.createElement(Option, {
                key: item.value
              }, item.text);

            default:
              throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
          }
        }) : [];
      }

      return React.createElement(Select, _extends({}, _this.props, {
        className: cls,
        mode: Select.SECRET_COMBOBOX_MODE_DO_NOT_USE,
        optionLabelProp: optionLabelProp,
        getInputElement: _this.getInputElement,
        notFoundContent: notFoundContent,
        ref: _this.saveSelect
      }), options);
    };

    return _this;
  }

  _createClass(AutoComplete, [{
    key: "focus",
    value: function focus() {
      this.select.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.select.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderAutoComplete);
    }
  }]);

  return AutoComplete;
}(React.Component);

export { AutoComplete as default };
AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;
AutoComplete.defaultProps = {
  transitionName: 'slide-up',
  optionLabelProp: 'children',
  choiceTransitionName: 'zoom',
  showSearch: false,
  filterOption: false
};