import React from 'react';
import Menu from 'rc-menu';
import velocity from 'velocity-animate';

const animation = {
  enter(node, done) {
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }
    node.style.display = 'none';
    velocity(node, 'slideDown', {
      duration: 300,
      complete: complete,
      easing: 'easeInOutQuad'
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        complete();
      }
    };
  },
  appear() {
    return this.enter.apply(this, arguments);
  },
  leave(node, done) {
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideUp', {
      duration: 300,
      complete: complete,
      easing: 'easeInOutQuad'
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        complete();
      }
    };
  }
};

const AntMenu = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-menu'
    };
  },
  render() {
    let openAnimation = '';
    switch (this.props.mode) {
      case 'horizontal':
        openAnimation = 'slide-up';
        break;
      case 'vertical':
        openAnimation = 'zoom';
        break;
      case 'inline':
        openAnimation = animation;
        break;
    }
    let html = '';
    if (this.props.mode === 'inline') {
      html = <Menu {...this.props} openAnimation={openAnimation} onOpen={this.toggle} onClose={this.toggle}/>;
    } else {
      html = <Menu {...this.props} openTransitionName={openAnimation} onOpen={this.toggle} onClose={this.toggle}/>;
    }
    return html;
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
