import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

let defaultDuration = 1.5;
let defaultTop;
let messageInstance;
let key = 1;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: 'ant-message',
    transitionName: 'move-up',
    style: { defaultTop }, // 覆盖原来的样式
  });
  return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
  let iconClass = ({
    info: 'ant-message-info',
    success: 'ant-message-success',
    error: 'ant-message-error',
    warning: 'ant-message-warning',
    loading: 'ant-message-loading'
  })[type];

  let iconType = ({
    info: 'info-circle',
    success: 'check-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  })[type];

  let instance = getMessageInstance();
  instance.notice({
    key,
    duration,
    style: {},
    content: <div className={`ant-message-custom-content ${iconClass}`}>
      <Icon className={iconClass} type={iconType} />
      <span>{content}</span>
    </div>,
    onClose
  });
  return (function () {
    let target = key++;
    return function () {
      instance.removeNotice(target);
    };
  }());
}

export default {
  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  warning(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config(options) {
    if ('top' in options) {
      defaultTop = options.top;
    }
    if ('duration' in options) {
      defaultDuration = options.duration;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
