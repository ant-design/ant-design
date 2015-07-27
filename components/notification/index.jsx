'use strict';

var Notification = require('rc-notification');

Notification.show = function (args) {
  Notification.notification.notice({
    content: <span>{args.message}</span>,
    duration: args.duration + 1 > 0 ? args.duration : 1.5,
    closable: args.close,
    style: {}
  });
};

module.exports = Notification;
