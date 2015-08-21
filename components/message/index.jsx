import React from 'react';
import Notification from 'rc-notification';

let defaultDuration = 1.5;
let top;

var messageInstance;

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

function notice(content, duration = defaultDuration, type) {
  let iconClass = ({
    'info': 'anticon-info-circle ant-message-info',
    'success': 'anticon-check-circle ant-message-success',
    'error': 'anticon-exclamation-circle ant-message-error'
  })[type];
  getMessageInstance().notice({
    duration: duration,
    style: {},
    content: <div className="ant-message-custom-content">
      <i className={'anticon ' + iconClass}></i>
      <span>{content}</span>
    </div>
  });
}

export default {
  info(content, duration) {
    notice(content, duration, 'info');
  },
  success(content, duration) {
    notice(content, duration, 'success');
  },
  error(content, duration) {
    notice(content, duration, 'error');
  },
  config(options) {
    if (options.top) {
      top = options.top;
    }
  }
};
