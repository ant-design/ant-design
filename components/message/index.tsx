import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
import assign from 'object-assign';

let defaultDuration = 1.5;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'ant-message';
let getContainer;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls,
    transitionName: 'move-up',
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer,
  });
  return messageInstance;
}

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

function notice(
  content: React.ReactNode,
  duration: number = defaultDuration,
  type: NoticeType,
  onClose?: () => void,
  className?: string,
  style?: React.CSSProperties,
) {
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
    style: assign({}, style),
    content: (
      <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
        <Icon type={iconType} />
        <span>{content}</span>
      </div>
    ),
    onClose,
    className,
  });
  return (function () {
    let target = key++;
    return function () {
      instance.removeNotice(target);
    };
  }());
}

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number;
export type ConfigOnClose = () => void;

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
}

export default {
  info(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose,
       className?: string, style?: React.CSSProperties) {
    return notice(content, duration, 'info', onClose, className, style);
  },
  success(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose,
          className?: string, style?: React.CSSProperties) {
    return notice(content, duration, 'success', onClose, className, style);
  },
  error(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose,
        className?: string, style?: React.CSSProperties) {
    return notice(content, duration, 'error', onClose, className, style);
  },
  // Departed usage, please use warning()
  warn(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose,
       className?: string, style?: React.CSSProperties) {
    return notice(content, duration, 'warning', onClose, className, style);
  },
  warning(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose,
          className?: string, style?: React.CSSProperties) {
    return notice(content, duration, 'warning', onClose, className, style);
  },
  loading(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose,
          className?: string, style?: React.CSSProperties) {
    return notice(content, duration, 'loading', onClose, className, style);
  },
  config(options: ConfigOptions) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
