function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPlacement = 'topRight';
var defaultGetContainer;

function setNotificationConfig(options) {
  var duration = options.duration,
      placement = options.placement,
      bottom = options.bottom,
      top = options.top,
      getContainer = options.getContainer;

  if (duration !== undefined) {
    defaultDuration = duration;
  }

  if (placement !== undefined) {
    defaultPlacement = placement;
  }

  if (bottom !== undefined) {
    defaultBottom = bottom;
  }

  if (top !== undefined) {
    defaultTop = top;
  }

  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }
}

function getPlacementStyle(placement) {
  var style;

  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: defaultTop,
        bottom: 'auto'
      };
      break;

    case 'topRight':
      style = {
        right: 0,
        top: defaultTop,
        bottom: 'auto'
      };
      break;

    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: defaultBottom
      };
      break;

    default:
      style = {
        right: 0,
        top: 'auto',
        bottom: defaultBottom
      };
      break;
  }

  return style;
}

function getNotificationInstance(prefixCls, placement, callback) {
  var cacheKey = "".concat(prefixCls, "-").concat(placement);

  if (notificationInstance[cacheKey]) {
    callback(notificationInstance[cacheKey]);
    return;
  }

  Notification.newInstance({
    prefixCls: prefixCls,
    className: "".concat(prefixCls, "-").concat(placement),
    style: getPlacementStyle(placement),
    getContainer: defaultGetContainer,
    closeIcon: React.createElement(Icon, {
      className: "".concat(prefixCls, "-close-icon"),
      type: 'close'
    })
  }, function (notification) {
    notificationInstance[cacheKey] = notification;
    callback(notification);
  });
}

var typeToIcon = {
  success: 'check-circle-o',
  info: 'info-circle-o',
  error: 'close-circle-o',
  warning: 'exclamation-circle-o'
};

function notice(args) {
  var outerPrefixCls = args.prefixCls || 'ant-notification';
  var prefixCls = "".concat(outerPrefixCls, "-notice");
  var duration = args.duration === undefined ? defaultDuration : args.duration;
  var iconNode = null;

  if (args.icon) {
    iconNode = React.createElement("span", {
      className: "".concat(prefixCls, "-icon")
    }, args.icon);
  } else if (args.type) {
    var iconType = typeToIcon[args.type];
    iconNode = React.createElement(Icon, {
      className: "".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(args.type),
      type: iconType
    });
  }

  var autoMarginTag = !args.description && iconNode ? React.createElement("span", {
    className: "".concat(prefixCls, "-message-single-line-auto-margin")
  }) : null;
  getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement, function (notification) {
    notification.notice({
      content: React.createElement("div", {
        className: iconNode ? "".concat(prefixCls, "-with-icon") : ''
      }, iconNode, React.createElement("div", {
        className: "".concat(prefixCls, "-message")
      }, autoMarginTag, args.message), React.createElement("div", {
        className: "".concat(prefixCls, "-description")
      }, args.description), args.btn ? React.createElement("span", {
        className: "".concat(prefixCls, "-btn")
      }, args.btn) : null),
      duration: duration,
      closable: true,
      onClose: args.onClose,
      onClick: args.onClick,
      key: args.key,
      style: args.style || {},
      className: args.className
    });
  });
}

var api = {
  open: notice,
  close: function close(key) {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      return notificationInstance[cacheKey].removeNotice(key);
    });
  },
  config: setNotificationConfig,
  destroy: function destroy() {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      notificationInstance[cacheKey].destroy();
      delete notificationInstance[cacheKey];
    });
  }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
  api[type] = function (args) {
    return api.open(_extends({}, args, {
      type: type
    }));
  };
});
api.warn = api.warning;
export default api;