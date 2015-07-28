import Notification from 'rc-notification';

function close(key, callback) {
  Notification.notification.removeNotice(key);
  if (callback) {
    callback();
  }
}

Notification.show = function (args) {
  if (args.icon) {
    let prefixCls = 'ant-notification-notice-content-icon-';
    Notification.notification.notice({
      content: <div>
        <i className={'anticon anticon-question-circle-o ' + prefixCls + 'icon'}></i>
        <p className={prefixCls + 'title'}>{args.title}</p>
        <p className={prefixCls + 'message'}>{args.message}</p>
      </div>,
      duration: null,
      closable: true,
      onClose: args.callback,
      style: {}
    });
  } else {
    if (!args.btn) {
      let prefixCls = 'ant-notification-notice-content-';
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'title'}>{args.title}</p>
          <p className={prefixCls + 'message'}>{args.message}</p>
        </div>,
        duration: null,
        closable: true,
        onClose: args.callback,
        style: {}
      });
    } else {
      let prefixCls = 'ant-notification-notice-content-';
      let key = 'manual' + new Date().getTime();
      Notification.notification.notice({
        content: <div>
          <p className={prefixCls + 'title'}>{args.title}</p>
          <p className={prefixCls + 'message'}>{args.message}</p>
          <button onClick={close.bind(null, key, args.callback)} className={'ant-btn ant-btn-primary ant-btn-sm ' + prefixCls + 'btn'}>立即操作
          </button>
        </div>,
        duration: null,
        closable: true,
        onClose: args.callback,
        key: key,
        style: {}
      });
    }
  }
};

export default Notification;
