/* global Promise */
import * as React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

let defaultDuration = 3;
let defaultTop: number;
let messageInstance: any;
let key = 1;
let prefixCls = 'ant-message';
let transitionName = 'move-up';
let getContainer: () => HTMLElement;
let maxCount: number;

function getMessageInstance(callback: (i: any) => void) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification.newInstance({
    prefixCls,
    transitionName,
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer,
    maxCount,
  }, (instance: any) => {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }
    messageInstance = instance;
    callback(instance);
  });
}

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface ThenableArgument {
  (_: any): any;
}

export interface MessageType {
  (): void;
  then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<any>;
  promise: Promise<any>;
}

function notice(
  content: React.ReactNode,
  duration: (() => void) | number = defaultDuration,
  type: NoticeType,
  onClose?: () => void,
): MessageType {
  const iconType = ({
    info: 'info-circle',
    success: 'check-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle',
    loading: 'loading',
  })[type];

  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }

  const target = key++;
  const closePromise = new Promise((resolve) => {
    const callback =  () => {
      if (typeof onClose === 'function') {
        onClose();
      }
      return resolve(true);
    };
    getMessageInstance((instance) => {
      instance.notice({
        key: target,
        duration,
        style: {},
        content: (
          <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
            <Icon type={iconType} />
            <span>{content}</span>
          </div>
        ),
        onClose: callback,
      });
    });
  });
  const result: any = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number | (() => void);
export type ConfigOnClose = () => void;

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
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
    if (options.transitionName !== undefined) {
      transitionName = options.transitionName;
      messageInstance = null; // delete messageInstance for new transitionName
    }
    if (options.maxCount !== undefined) {
      maxCount = options.maxCount;
      messageInstance = null;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
