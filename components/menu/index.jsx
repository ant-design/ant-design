import React from 'react';
import Menu from 'rc-menu';
import velocity from 'velocity-animate';

const animation = {
  enter(node, done) {
    // Fix safari flash bug
    node.style.display = 'none';
    this.animate(node, 'slideDown', done);
  },
  leave(node, done) {
    this.animate(node, 'slideUp', done);
  },
  appear() {
    return this.enter.apply(this, arguments);
  },
  animate(node, transitionName, done) {
    let ok;
    function complete() {
      if (!ok) {
        ok = true;
        done();
      }
    }
    velocity(node, transitionName, {
      duration: 240,
      complete: complete,
      easing: 'easeInOutQuad'
    });
    return {
      stop() {
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
    if (this.props.mode === 'inline') {
      return <Menu {...this.props} openAnimation={openAnimation} />;
    } else {
      return <Menu {...this.props} openTransitionName={openAnimation} />;
    }
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
