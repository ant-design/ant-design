import * as React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
import assign from 'object-assign';
let defaultTop = 24;
let notificationInstance;
let defaultDuration = 4.5;

export interface ArgsProps {
  /** 通知提醒标题，必选 */
  message: React.ReactNode;
  /** 通知提醒内容，必选*/
  description: React.ReactNode;
  /** 自定义关闭按钮*/
  btn?: React.ReactNode;
  /** 当前通知唯一标志*/
  key?: string;
  /** 点击默认关闭按钮时触发的回调函数*/
  onClose?: () => void;
  /** 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭*/
  duration?: number;
}

function getNotificationInstance() {
  if (notificationInstance) {
    return notificationInstance;
  }
  notificationInstance = (Notification as any).newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: defaultTop,
      right: 0,
    },
  });
  return notificationInstance;
}

function notice(args) {
  const prefixCls = args.prefixCls || 'ant-notification-notice';

  let duration;
  if (args.duration === undefined) {
    duration = defaultDuration;
  } else {
    duration = args.duration;
  }

  let iconType = '';
  switch (args.icon) {
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

  getNotificationInstance().notice({
    content: (
      <div className={`${prefixCls}-content ${args.icon ? `${prefixCls}-with-icon` : ''}`}>
        {args.icon ? <Icon className={`${prefixCls}-icon ${prefixCls}-icon-${args.icon}`} type={iconType} /> : null}
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

const api = {
  open(args) {
    notice(args);
  },
  close(key) {
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
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
    if (notificationInstance) {
      notificationInstance.destroy();
      notificationInstance = null;
    }
  },
};

['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args: ArgsProps) => api.open(assign({}, args, { icon: type }));
});

(api as any).warn = (api as any).warning;

export default api;
