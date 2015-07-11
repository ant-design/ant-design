'use strict';

//import React from 'react';
import Notification from 'rc-notification';

var defaultDuration = 2.5;

var getMessageInstance = function(){
  return Notification.newInstance({
    prefixCls: 'ant-message',
    transitionName: 'move-up',
    style: {
      top: '16px'
    }
  });
};

export default {
  info: function(m, t) {
    var message = getMessageInstance();
    t = t || defaultDuration;
    message.notice({
      key: 'simpleMessage',
      duration: t,
      style: {
        left: '50%'
      },
      content: <div className='ant-message-custom-content'>
                 <i className='anticon anticon-info-circle ant-message-info'></i>
                 <span>{m}</span>
               </div>
    });
  },
  success: function(m, t) {
    var message = getMessageInstance();
    t = t || defaultDuration;
    message.notice({
      key: 'simpleMessage1',
      transitionName: 'move-up',
      duration: t,
      style: {
        left: '50%'
      },
      content: <div className='ant-message-custom-content'>
                 <i className='anticon anticon-check-circle ant-message-success'></i>
                 <span>{m}</span>
               </div>
    });
  },
  error: function(m, t) {
    var message = getMessageInstance();
    t = t || defaultDuration;
    message.notice({
      key: 'simpleMessage2',
      transitionName: 'move-up',
      duration: t,
      style: {
        left: '50%'
      },
      content: <div className='ant-message-custom-content'>
                 <i className='anticon anticon-exclamation-circle ant-message-error'></i>
                 <span>{m}</span>
               </div>
    });
  }
};
