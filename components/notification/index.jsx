'use strict';

var Notification = require('rc-notification');

Notification.open = function (message, close, duration) {
  Notification.notification.notice({
    content: <span>{message}</span>,
    duration: duration,
    closable: close,
    style: {}
  });
};

module.exports = Notification;
