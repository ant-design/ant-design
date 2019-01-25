function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';

function noop() {}

var Alert =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert() {
    var _this;

    _classCallCheck(this, Alert);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Alert).apply(this, arguments));
    _this.state = {
      closing: true,
      closed: false
    };

    _this.handleClose = function (e) {
      e.preventDefault();
      var dom = ReactDOM.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this)));
      dom.style.height = "".concat(dom.offsetHeight, "px"); // Magic code
      // 重复一次后才能正确设置 height

      dom.style.height = "".concat(dom.offsetHeight, "px");

      _this.setState({
        closing: false
      });

      (_this.props.onClose || noop)(e);
    };

    _this.animationEnd = function () {
      _this.setState({
        closed: true,
        closing: true
      });

      (_this.props.afterClose || noop)();
    };

    _this.renderAlert = function (_ref) {
      var _classNames, _classNames2;

      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          description = _this$props.description,
          customizePrefixCls = _this$props.prefixCls,
          message = _this$props.message,
          closeText = _this$props.closeText,
          banner = _this$props.banner,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          style = _this$props.style,
          icon = _this$props.icon;
      var _this$props2 = _this.props,
          closable = _this$props2.closable,
          type = _this$props2.type,
          showIcon = _this$props2.showIcon,
          iconType = _this$props2.iconType;
      var prefixCls = getPrefixCls('alert', customizePrefixCls); // banner模式默认有 Icon

      showIcon = banner && showIcon === undefined ? true : showIcon; // banner模式默认为警告

      type = banner && type === undefined ? 'warning' : type || 'info';
      var iconTheme = 'filled'; // should we give a warning?
      // warning(!iconType, `The property 'iconType' is deprecated. Use the property 'icon' instead.`);

      if (!iconType) {
        switch (type) {
          case 'success':
            iconType = 'check-circle';
            break;

          case 'info':
            iconType = 'info-circle';
            break;

          case 'error':
            iconType = 'close-circle';
            break;

          case 'warning':
            iconType = 'exclamation-circle';
            break;

          default:
            iconType = 'default';
        } // use outline icon in alert with description


        if (!!description) {
          iconTheme = 'outlined';
        }
      } // closeable when closeText is assigned


      if (closeText) {
        closable = true;
      }

      var alertCls = classNames(prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-close"), !_this.state.closing), _defineProperty(_classNames, "".concat(prefixCls, "-with-description"), !!description), _defineProperty(_classNames, "".concat(prefixCls, "-no-icon"), !showIcon), _defineProperty(_classNames, "".concat(prefixCls, "-banner"), !!banner), _defineProperty(_classNames, "".concat(prefixCls, "-closable"), closable), _classNames), className);
      var closeIcon = closable ? React.createElement("a", {
        onClick: _this.handleClose,
        className: "".concat(prefixCls, "-close-icon")
      }, closeText || React.createElement(Icon, {
        type: "close"
      })) : null;
      var dataOrAriaProps = getDataOrAriaProps(_this.props);
      var iconNode = icon && (React.isValidElement(icon) ? React.cloneElement(icon, {
        className: classNames((_classNames2 = {}, _defineProperty(_classNames2, icon.props.className, icon.props.className), _defineProperty(_classNames2, "".concat(prefixCls, "-icon"), true), _classNames2))
      }) : React.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icon)) || React.createElement(Icon, {
        className: "".concat(prefixCls, "-icon"),
        type: iconType,
        theme: iconTheme
      });
      return _this.state.closed ? null : React.createElement(Animate, {
        component: "",
        showProp: "data-show",
        transitionName: "".concat(prefixCls, "-slide-up"),
        onEnd: _this.animationEnd
      }, React.createElement("div", _extends({
        "data-show": _this.state.closing,
        className: alertCls,
        style: style
      }, dataOrAriaProps), showIcon ? iconNode : null, React.createElement("span", {
        className: "".concat(prefixCls, "-message")
      }, message), React.createElement("span", {
        className: "".concat(prefixCls, "-description")
      }, description), closeIcon));
    };

    return _this;
  }

  _createClass(Alert, [{
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderAlert);
    }
  }]);

  return Alert;
}(React.Component);

export { Alert as default };