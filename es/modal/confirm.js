var _this = this;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Dialog, { destroyFns } from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';
import warning from '../_util/warning';
var IS_REACT_16 = !!ReactDOM.createPortal;

var ConfirmDialog = function ConfirmDialog(props) {
  var onCancel = props.onCancel,
      onOk = props.onOk,
      close = props.close,
      zIndex = props.zIndex,
      afterClose = props.afterClose,
      visible = props.visible,
      keyboard = props.keyboard,
      centered = props.centered,
      getContainer = props.getContainer,
      maskStyle = props.maskStyle,
      okButtonProps = props.okButtonProps,
      cancelButtonProps = props.cancelButtonProps,
      _props$iconType = props.iconType,
      iconType = _props$iconType === void 0 ? 'question-circle' : _props$iconType;
  warning(!('iconType' in props), "The property 'iconType' is deprecated. Use the property 'icon' instead.");
  var icon = props.icon ? props.icon : iconType;
  var okType = props.okType || 'primary';
  var prefixCls = props.prefixCls || 'ant-modal';
  var contentPrefixCls = "".concat(prefixCls, "-confirm"); // 默认为 true，保持向下兼容

  var okCancel = 'okCancel' in props ? props.okCancel : true;
  var width = props.width || 416;
  var style = props.style || {}; // 默认为 false，保持旧版默认行为

  var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  var runtimeLocale = getConfirmLocale();
  var okText = props.okText || (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  var cancelText = props.cancelText || runtimeLocale.cancelText;
  var autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  var classString = classNames(contentPrefixCls, "".concat(contentPrefixCls, "-").concat(props.type), props.className);
  var cancelButton = okCancel && React.createElement(ActionButton, {
    actionFn: onCancel,
    closeModal: close,
    autoFocus: autoFocusButton === 'cancel',
    buttonProps: cancelButtonProps
  }, cancelText);
  var iconNode = typeof icon === 'string' ? React.createElement(Icon, {
    type: icon
  }) : icon;
  return React.createElement(Dialog, {
    prefixCls: prefixCls,
    className: classString,
    wrapClassName: classNames(_defineProperty({}, "".concat(contentPrefixCls, "-centered"), !!props.centered)),
    onCancel: close.bind(_this, {
      triggerCancel: true
    }),
    visible: visible,
    title: "",
    transitionName: "zoom",
    footer: "",
    maskTransitionName: "fade",
    maskClosable: maskClosable,
    maskStyle: maskStyle,
    style: style,
    width: width,
    zIndex: zIndex,
    afterClose: afterClose,
    keyboard: keyboard,
    centered: centered,
    getContainer: getContainer
  }, React.createElement("div", {
    className: "".concat(contentPrefixCls, "-body-wrapper")
  }, React.createElement("div", {
    className: "".concat(contentPrefixCls, "-body")
  }, iconNode, React.createElement("span", {
    className: "".concat(contentPrefixCls, "-title")
  }, props.title), React.createElement("div", {
    className: "".concat(contentPrefixCls, "-content")
  }, props.content)), React.createElement("div", {
    className: "".concat(contentPrefixCls, "-btns")
  }, cancelButton, React.createElement(ActionButton, {
    type: okType,
    actionFn: onOk,
    closeModal: close,
    autoFocus: autoFocusButton === 'ok',
    buttonProps: okButtonProps
  }, okText))));
};

export default function confirm(config) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  var currentConfig = _extends({}, config, {
    close: close,
    visible: true
  });

  function close() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    currentConfig = _extends({}, currentConfig, {
      visible: false,
      afterClose: destroy.bind.apply(destroy, [this].concat(args))
    });

    if (IS_REACT_16) {
      render(currentConfig);
    } else {
      destroy.apply(void 0, args);
    }
  }

  function update(newConfig) {
    currentConfig = _extends({}, currentConfig, newConfig);
    render(currentConfig);
  }

  function destroy() {
    var unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, args);
    }

    for (var i = 0; i < destroyFns.length; i++) {
      var fn = destroyFns[i];

      if (fn === destroy) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props) {
    ReactDOM.render(React.createElement(ConfirmDialog, props), div);
  }

  render(currentConfig);
  destroyFns.push(close);
  return {
    destroy: close,
    update: update
  };
}