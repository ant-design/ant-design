import Notification from 'rc-notification';

Notification.show = function (args) {
  if (!Notification.notification) {
    Notification.notification = Notification.newInstance({
      prefixCls: 'ant-notification',
      style: {
        top: 0,
        right: 0
      }
    });
  }

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
      onClose: args.onClose,
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
        onClose: args.onClose,
        style: {}
      });
    } else {
      let prefixCls = 'ant-notification-notice-content-';
      let key = 'manual' + new Date().getTime();
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>
          <p className={prefixCls + 'description'}>{args.description}</p>
          <span onClick={args.customClose ? args.customClose.bind(null, key) : Notification.notification.removeNotice.bind(null, key)} className={prefixCls + 'btn'}>
            {args.btn}
          </span>
        </div>,
        duration: null,
        closable: true,
        onClose: args.onClose,
        key: key,
        style: {}
      });
    }
  }
};

export default Notification;
