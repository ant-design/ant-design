import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

let defaultTop = 24;
let notificationInstance;
let defaultDuration = 4.5;

function getNotificationInstance() {
  if (notificationInstance) {
    return notificationInstance;
  }
  notificationInstance = Notification.newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: defaultTop,
      right: 0,
    }
  });
  return notificationInstance;
}

function notice(args) {
  let duration;
  if (args.duration === undefined) {
    duration = defaultDuration;
  } else {
    duration = args.duration;
  }
  if (args.icon) {
    let prefixCls = ' ant-notification-notice-content-icon-';
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
      case 'warn':
        iconType = 'exclamation-circle-o';
        break;
      default:
        iconType = 'info-circle';
    }

    getNotificationInstance().notice({
      content: <div>
        <Icon className={`${prefixCls}icon-${args.icon}${prefixCls}icon`} type={iconType} />

        <div className={`${prefixCls}message`}>{args.message}</div>

        <div className={`${prefixCls}description`}>{args.description}</div>
      </div>,
      duration,
      closable: true,
      onClose: args.onClose,
      key: args.key,
      style: {}
    });
  } else {
    let prefixCls = 'ant-notification-notice-content-';
    if (!args.btn) {
      getNotificationInstance().notice({
        content: <div>
          <div className={`${prefixCls}message`}>{args.message}</div>

          <div className={`${prefixCls}description`}>{args.description}</div>
        </div>,
        duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      });
    } else {
      getNotificationInstance().notice({
        content: <div>
          <div className={`${prefixCls}message`}>{args.message}</div>

          <div className={`${prefixCls}description`}>{args.description}</div>
          <span className={`${prefixCls}btn`}>
            {args.btn}
          </span>
        </div>,
        duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      });
    }
  }
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

['success', 'info', 'warn', 'error'].forEach((type) => {
  api[type] = (args) => {
    let newArgs = {
      ...args,
      icon: type
    };
    return api.open(newArgs);
  };
});

export default api;
