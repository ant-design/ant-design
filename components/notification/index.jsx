import Notification from 'rc-notification';

function close(key, customCallback) {
  Notification.notification.removeNotice(key);
  if (customCallback) {
    customCallback();
  }
}

Notification.show = function (args) {
  if (args.icon) {
    let prefixCls = 'ant-notification-notice-content-icon-';
    Notification.notification.notice({
      content: <div>
        <i className={'anticon anticon-question-circle-o ' + prefixCls + 'icon'}></i>
        <p className={prefixCls + 'message'}>{args.message}</p>
        <p className={prefixCls + 'description'}>{args.description}</p>
      </div>,
      duration: null,
      closable: true,
      onClose: args.defaultClose,
      style: {}
    });
  } else {
    if (!args.btn) {
      let prefixCls = 'ant-notification-notice-content-';
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>
          <p className={prefixCls + 'description'}>{args.description}</p>
        </div>,
        duration: null,
        closable: true,
        onClose: args.defaultClose,
        style: {}
      });
    } else {
      let prefixCls = 'ant-notification-notice-content-';
      let key = 'manual' + new Date().getTime();
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>
          <p className={prefixCls + 'description'}>{args.description}</p>
          <span onClick={close.bind(null, key, args.customClose)} className={prefixCls + 'btn'}>
            {args.btn}
          </span>
        </div>,
        duration: null,
        closable: true,
        onClose: args.defaultClose,
        key: key,
        style: {}
      });
    }
  }
};

export default Notification;
