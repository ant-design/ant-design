/* global Promise */
import * as React from 'react';
import Notification from 'rc-notification';
import InfoCircleFilled from '../icon/icons/InfoCircleFilled';
import CheckCircleFilled from '../icon/icons/CheckCircleFilled';
import CloseCircleFilled from '../icon/icons/CloseCircleFilled';
import ExclamationCircleFilled from '../icon/icons/ExclamationCircleFilled';
import Loading from '../icon/icons/Loading';

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
  Notification.newInstance(
    {
      prefixCls,
      transitionName,
      style: { top: defaultTop }, // 覆盖原来的样式
      getContainer,
      maxCount,
    },
    (instance: any) => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    },
  );
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

export interface ArgsProps {
  content: React.ReactNode;
  duration: number | null;
  type: NoticeType;
  onClose?: () => void;
  icon?: React.ReactNode;
}

function notice(args: ArgsProps): MessageType {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const Icon = {
    info: InfoCircleFilled,
    success: CheckCircleFilled,
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled,
    loading: Loading,
  }[args.type];

  const target = key++;
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance(instance => {
      const iconNode = <Icon />;
      instance.notice({
        key: target,
        duration,
        style: {},
        content: (
          <div
            className={`${prefixCls}-custom-content${
              args.type ? ` ${prefixCls}-${args.type}` : ''
            }`}
          >
            {args.icon ? args.icon : Icon ? iconNode : ''}
            <span>{args.content}</span>
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
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
    closePromise.then(filled, rejected);
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

const api: any = {
  open: notice,
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

['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
  api[type] = (content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => {
    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }
    return api.open({ content, duration: duration, type, onClose });
  };
});

api.warn = api.warning;

export interface MessageApi {
  info(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  success(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  error(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  warn(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  warning(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  loading(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  open(args: ArgsProps): MessageType;
  config(options: ConfigOptions): void;
  destroy(): void;
}

export default api as MessageApi;
