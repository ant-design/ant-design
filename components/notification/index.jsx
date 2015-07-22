'use strict';

var React = require('react');
var CSSTransitionGroup = require('rc-css-transition-group');

function createChainedFunction() {
  var args = arguments;

  return function chainedFunction() {
    for (var i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}

var Notice = React.createClass({
  getDefaultProps() {
    return {
      onEnd() {
      },
      duration: 1.5
    };
  },
  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  },
  componentDidUpdate() {
    this.componentDidMount();
  },
  componentDidMount() {
    this.clearCloseTimer();
    if (this.props.duration) {
      this.closeTimer = setTimeout(()=> {
        this.close();
      }, this.props.duration * 1000);
    }
  },
  componentWillUnmount() {
    this.clearCloseTimer();
  },
  close() {
    this.clearCloseTimer();
    this.props.onClose();
  },
  render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var className = `${prefixCls}-notice`;
    var componentClass = `${prefixCls}-notice`;
    if (props.closable) {
      className += ` ${componentClass}-closable`;
    }
    if (props.className) {
      className += ' ' + props.className;
    }
    return (
      <div className={className}>
        <div className={`${componentClass}-content`}>{this.props.children}</div>
        {props.closable ?
          <a tabIndex="0" onClick={this.close} className={`${componentClass}-close`}>
            <span className={`${componentClass}-close-x`}>×</span>
          </a> : null
        }
      </div>
    );
  }
});

var seed = 0;
var now = Date.now();

function getUuid() {
  return 'rcNotification_' + now + '_' + (seed++);
}

var Notification = React.createClass({
  getInitialState() {
    return {
      notices: []
    };
  },
  getDefaultProps() {
    return {
      prefixCls: 'ant-notification',
      animation: 'fade',
      style: {
        top: 0,
        right: 0
      }
    };
  },
  remove(key) {
    var notices = [];
    this.state.notices.forEach((notice) => {
      if (notice.key !== key) {
        notices.push(notice);
      }
    });
    this.setState({
      notices: notices
    });
  },
  add(notice) {
    var find = false;
    var notices = this.state.notices.concat();
    for (var i = 0; i < notices.length; i++) {
      var n = notices[i];
      if (n.key !== undefined && n.key === notice.key) {
        notices[i] = notice;
        find = true;
      }
    }
    if (!find) {
      notices.push(notice);
    }
    this.setState({
      notices: notices
    });
  },
  getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  },
  render() {
    var props = this.props;
    var noticeNodes = this.state.notices.map((notice)=> {
      if (notice.key === undefined) {
        notice.key = getUuid();
      }
      var onClose = createChainedFunction(this.remove.bind(this, notice.key), notice.onClose);
      return (<Notice prefixCls={props.prefixCls} {...notice} onClose={onClose}>{notice.content}</Notice>);
    });
    var className = props.prefixCls;
    if (props.className) {
      className += ' ' + props.className;
    }
    return (
      <div className={className} style={props.style}>
        <CSSTransitionGroup transitionName={this.getTransitionName()}>{noticeNodes}</CSSTransitionGroup>
      </div>
    );
  }
});

Notification.newInstance = function (props) {
  props = props || {};
  var div = document.createElement('div');
  document.body.appendChild(div);
  var notification = React.render(<Notification {...props}/>, div);
  return {
    notice(noticeProps) {
      notification.add(noticeProps);
    },
    component: notification,
    destroy() {
      React.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  };
};

module.exports = Notification;