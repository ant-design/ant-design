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
import Dialog from 'rc-dialog';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from "rc-util/es/Dom/addEventListener";
import { getConfirmLocale } from './locale';
import Icon from '../icon';
import Button from '../button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer } from '../config-provider';
var mousePosition;
var mousePositionEventBinded;
export var destroyFns = [];

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).apply(this, arguments));

    _this.handleCancel = function (e) {
      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel(e);
      }
    };

    _this.handleOk = function (e) {
      var onOk = _this.props.onOk;

      if (onOk) {
        onOk(e);
      }
    };

    _this.renderFooter = function (locale) {
      var _this$props = _this.props,
          okText = _this$props.okText,
          okType = _this$props.okType,
          cancelText = _this$props.cancelText,
          confirmLoading = _this$props.confirmLoading;
      return React.createElement("div", null, React.createElement(Button, _extends({
        onClick: _this.handleCancel
      }, _this.props.cancelButtonProps), cancelText || locale.cancelText), React.createElement(Button, _extends({
        type: okType,
        loading: confirmLoading,
        onClick: _this.handleOk
      }, _this.props.okButtonProps), okText || locale.okText));
    };

    _this.renderModal = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          footer = _a.footer,
          visible = _a.visible,
          wrapClassName = _a.wrapClassName,
          centered = _a.centered,
          restProps = __rest(_a, ["prefixCls", "footer", "visible", "wrapClassName", "centered"]);

      var prefixCls = getPrefixCls('modal', customizePrefixCls);
      var defaultFooter = React.createElement(LocaleReceiver, {
        componentName: "Modal",
        defaultLocale: getConfirmLocale()
      }, _this.renderFooter);
      var closeIcon = React.createElement("span", {
        className: "".concat(prefixCls, "-close-x")
      }, React.createElement(Icon, {
        className: "".concat(prefixCls, "-close-icon"),
        type: 'close'
      }));
      return React.createElement(Dialog, _extends({}, restProps, {
        prefixCls: prefixCls,
        wrapClassName: classNames(_defineProperty({}, "".concat(prefixCls, "-centered"), !!centered), wrapClassName),
        footer: footer === undefined ? defaultFooter : footer,
        visible: visible,
        mousePosition: mousePosition,
        onClose: _this.handleCancel,
        closeIcon: closeIcon
      }));
    };

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (mousePositionEventBinded) {
        return;
      } // 只有点击事件支持从鼠标位置动画展开


      addEventListener(document.documentElement, 'click', function (e) {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        }; // 100ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开

        setTimeout(function () {
          return mousePosition = null;
        }, 100);
      });
      mousePositionEventBinded = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderModal);
    }
  }]);

  return Modal;
}(React.Component);

export { Modal as default };
Modal.defaultProps = {
  width: 520,
  transitionName: 'zoom',
  maskTransitionName: 'fade',
  confirmLoading: false,
  visible: false,
  okType: 'primary',
  okButtonDisabled: false,
  cancelButtonDisabled: false
};
Modal.propTypes = {
  prefixCls: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  centered: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  confirmLoading: PropTypes.bool,
  visible: PropTypes.bool,
  align: PropTypes.object,
  footer: PropTypes.node,
  title: PropTypes.node,
  closable: PropTypes.bool
};