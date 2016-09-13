import * as React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

let defaultDuration = 1.5;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'ant-message';

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls,
    transitionName: 'move-up',
    style: { top: defaultTop }, // 覆盖原来的样式
  });
  return messageInstance;
}

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

function notice(
  content: React.ReactNode,
  duration: number = defaultDuration,
  type: NoticeType,
  onClose: () => void) {
  let iconType = ({
    info: 'info-circle',
    success: 'check-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle',
    loading: 'loading',
  })[type];

  let instance = getMessageInstance();
  instance.notice({
    key,
    duration,
    style: {},
    content: (
      <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
        <Icon type={iconType} />
        <span>{content}</span>
      </div>
    ),
    onClose,
  });
  return (function () {
    let target = key++;
    return function () {
      instance.removeNotice(target);
    };
  }());
}

type ConfigContent = React.ReactNode;
type ConfigDuration = number;
type ConfigOnClose = () => void;

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
}

export default {
  info(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    return notice(content, duration, 'info', onClose);
  },
  success(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    return notice(content, duration, 'error', onClose);
  },
  // Departed usage, please use warning()
  warn(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    return notice(content, duration, 'warning', onClose);
  },
  warning(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    return notice(content, duration, 'warning', onClose);
  },
  loading(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    return notice(content, duration, 'loading', onClose);
  },

  config(options: ConfigOptions) {
    if ('top' in options) {
      defaultTop = options.top;
    }
    if ('duration' in options) {
      defaultDuration = options.duration;
    }
    if ('prefixCls' in options) {
      prefixCls = options.prefixCls;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
