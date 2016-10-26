import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

const messageInstances = {};
let prefixCls = 'ant-message';
let defaultTop;
let defaultStack = true;

let key = 1;
let defaultDuration = 1.5;

function getMessageInstance() {
  const cachedKey = `${prefixCls}-${defaultTop}-${defaultStack}`;
  if (!messageInstances[cachedKey]) {
    messageInstances[cachedKey] = Notification.newInstance({
      prefixCls,
      className: defaultStack ? '' : `${prefixCls}-unstack`,
      transitionName: 'move-up',
      style: { top: defaultTop }, // 覆盖原来的样式
    });
  }
  return messageInstances[cachedKey];
}

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

const iconTypeMap = {
  info: 'info-circle',
  success: 'check-circle',
  error: 'cross-circle',
  warning: 'exclamation-circle',
  loading: 'loading',
};
function notice(
  content: React.ReactNode,
  duration: number = defaultDuration,
  type: NoticeType,
  onClose?: () => void
) {
  const iconType = iconTypeMap[type];
  const instance = getMessageInstance();
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

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number;
export type ConfigOnClose = () => void;

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  stack?: boolean;
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
    if (options.top !== undefined) {
      defaultTop = options.top;
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.stack !== undefined) {
      defaultStack = options.stack;
    }
  },
  destroy() {
    for (const cachedKey in messageInstances) {
      if (messageInstances.hasOwnProperty(cachedKey)) {
        messageInstances[cachedKey].destroy();
        delete messageInstances[cachedKey];
      }
    }
  },
};
