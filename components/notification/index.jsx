import Notification from 'rc-notification';

function getNotificationInstance(top) {
  if (!Notification.notification) {
    Notification.notification = Notification.newInstance({
      prefixCls: 'ant-notification',
      style: {
        top: isNaN(top) ? 24 : top,
        right: 0
      }
    });
  }
  return Notification.notification;
}

function notice(args) {
  getNotificationInstance(args.top);
  if (args.icon) {
    let prefixCls = ' ant-notification-notice-content-icon-';

    let iconClass = 'anticon anticon-';
    switch (args.icon) {
      case 'success':
        iconClass += 'check-circle-o';
        break;
      case 'info':
        iconClass += 'info-circle-o';
        break;
      case 'error':
        iconClass += 'exclamation-circle-o';
        break;
      case 'warn':
        iconClass += 'question-circle-o';
        break;
      default:
        iconClass += 'info-circle';
    }

    Notification.notification.notice({
      content: <div>
        <i className={iconClass + prefixCls + 'icon-' + args.icon + prefixCls + 'icon'}></i>
        <p className={prefixCls + 'message'}>{args.message}</p>
        <p className={prefixCls + 'description'}>{args.description}</p>
      </div>,
      duration: null,
      closable: true,
      onClose: args.onClose,
      style: {}
    });
  } else {
    let prefixCls = 'ant-notification-notice-content-';
    if (!args.btn) {
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>
          <p className={prefixCls + 'description'}>{args.description}</p>
        </div>,
        duration: null,
        closable: true,
        onClose: args.onClose,
        style: {}
      });
    } else {
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>
          <p className={prefixCls + 'description'}>{args.description}</p>
          <span className={prefixCls + 'btn'}>
            {args.btn}
          </span>
        </div>,
        duration: null,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      });
    }
  }
}

export default {
  open(args){
    notice(args);
  },
  close(key){
    Notification.notification.removeNotice(key);
  }
};
