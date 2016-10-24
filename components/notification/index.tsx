import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
import assign from 'object-assign';
let defaultTop = 24;
let notificationInstance;
let defaultDuration = 4.5;

export interface ArgsProps {
  message: React.ReactNode | string;
  description: React.ReactNode | string;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number;
  icon?: React.ReactNode;
}

export interface ConfigProps {
  top?: number;
  duration?: number;
}

function getNotificationInstance(prefixCls) {
  if (notificationInstance) {
    return notificationInstance;
  }
  notificationInstance = (Notification as any).newInstance({
    prefixCls: prefixCls,
    style: {
      top: defaultTop,
      right: 0,
    },
  });
  return notificationInstance;
}

function notice(args) {
  const outerPrefixCls = args.prefixCls || 'ant-notification';
  const prefixCls = `${outerPrefixCls}-notice`;

  let duration;
  if (args.duration === undefined) {
    duration = defaultDuration;
  } else {
    duration = args.duration;
  }

  let iconType = '';
  switch (args.type) {
    case 'success':
      iconType = 'check-circle-o';
      break;
    case 'info':
      iconType = 'info-circle-o';
      break;
    case 'error':
      iconType = 'cross-circle-o';
      break;
    case 'warning':
      iconType = 'exclamation-circle-o';
      break;
    default:
      iconType = 'info-circle';
  }

  let iconNode;
  if (args.icon) {
    iconNode = (
      <span className={`${prefixCls}-icon`}>
        {args.icon}
      </span>
    );
  } else if (args.type) {
    iconNode = <Icon className={`${prefixCls}-icon ${prefixCls}-icon-${args.type}`} type={iconType} />;
  }

  getNotificationInstance(outerPrefixCls).notice({
    content: (
      <div className={`${prefixCls}-content ${iconNode ? `${prefixCls}-with-icon` : ''}`}>
        {iconNode}
        <div className={`${prefixCls}-message`}>{args.message}</div>
        <div className={`${prefixCls}-description`}>{args.description}</div>
        {args.btn ? <span className={`${prefixCls}-btn`}>{args.btn}</span> : null}
      </div>
    ),
    duration,
    closable: true,
    onClose: args.onClose,
    key: args.key,
    style: {},
  });
}

const api: {
  success?(args: ArgsProps): void;
  error?(args: ArgsProps): void;
  info?(args: ArgsProps): void;
  warn?(args: ArgsProps): void;
  warning?(args: ArgsProps): void;

  open(args: ArgsProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;
} = {
  open(args: ArgsProps) {
    notice(args);
  },
  close(key) {
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
  },
  config(options: ConfigProps) {
    if (options.top !== undefined) {
      defaultTop = options.top;
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
  },
  destroy() {
    if (notificationInstance) {
      notificationInstance.destroy();
      notificationInstance = null;
    }
  },
};

['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args: ArgsProps) => api.open(assign({}, args, { type }));
});

(api as any).warn = (api as any).warning;

export default api;
