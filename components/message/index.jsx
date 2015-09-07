import React from 'react';
import Notification from 'rc-notification';

let defaultDuration = 1.5;
let top;
let messageInstance;
let key = 1;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: 'ant-message',
    transitionName: 'move-up',
    style: {
      top: top
    }  // 覆盖原来的样式
  });
  return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
  let iconClass = ({
    'info': 'anticon-info-circle ant-message-info',
    'success': 'anticon-check-circle ant-message-success',
    'error': 'anticon-exclamation-circle ant-message-error',
    'loading': 'anticon-loading ant-message-loading'
  })[type];
  let instance = getMessageInstance();
  instance.notice({
    key: key,
    duration: duration,
    style: {},
    content: <div className="ant-message-custom-content">
      <i className={'anticon ' + iconClass}></i>
      <span>{content}</span>
    </div>,
    onClose: onClose
  });
  return (function() {
    let target = key++;
    return function() {
      instance.removeNotice(target);
    };
  })();
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
  loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config(options) {
    if (options.top) {
      top = options.top;
    }
  }
};
