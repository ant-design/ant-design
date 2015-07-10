'use strict';

//import React from 'react';
import Notification from 'rc-notification';

var message;

var getMessageInstance = function(){
  message = Notification.newInstance({
    prefixCls: 'ant-message',
    transitionName: 'move-up',
    style: {
      top: '16px'
    }
  });
  return message;
};


module.exports = {

  info: function(m) {
    if (!message) {
      message = getMessageInstance();
    }

    message.notice({
      key: 'simpleMessage',
      duration: 2.5,
      style: {
        left: '50%'
      },
      content: <div className='ant-message-custom-content'><i className='anticon anticon-info-circle ant-message-info'></i><span>{m}</span></div>
    });
  },
  success: function(m) {

    if (!message) {
      message = getMessageInstance();
    }

    message.notice({
      key: 'simpleMessage1',
      transitionName: 'move-up',
      duration: 2.5,
      style: {
        left: '50%'
      },
      content: <div className='ant-message-custom-content'><i className='anticon anticon-check-circle ant-message-success'></i><span>{m}</span></div>
    });
  },
  error: function(m) {

    if (!message) {
      message = getMessageInstance();
    }

    message.notice({
      key: 'simpleMessage2',
      transitionName: 'move-up',
      duration: 2.5,
      style: {
        left: '50%'
      },
      content: <div className='ant-message-custom-content'><i className='anticon anticon-exclamation-circle ant-message-error'></i><span>{m}</span></div>
    });
  }
};
