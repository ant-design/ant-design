import React from 'react';
import Menu from 'rc-menu';
import velocity from 'velocity-animate';
import EnterAnimation from 'enter-animation';

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
  toggle(info) {
    let dom = React.findDOMNode(info.item || info);
    let ul = dom.getElementsByTagName('ul')[0];
    function TweenAnimate(_dom) {
      let num=Number((.12/_dom.children.length).toFixed(3));
      if(info.open){
        EnterAnimation.to(_dom,{duration:.15,data:'scale',interval:num});
      }else{
        EnterAnimation.to(_dom,{duration:.15,data:'scale',interval:num,direction:'leave',upend:true,ease:'cubic-bezier(0.6, 0.04, 0.98, 0.335)'});
      }
    }
    if (this.props.mode && info.item && !ul) {
      setTimeout(()=> {
        ul = dom.getElementsByTagName('ul')[0];
        TweenAnimate(ul);
      }, 1);
    } else {
      if (!ul) {
        ul = dom;
      }
      TweenAnimate(ul);
    }
  },
  componentDidMount() {
    this.componentDidUpdate(this.props);
  },
  componentDidUpdate(prevProps) {
    //更改初始进场(dropdown)
    if (!prevProps.mode) {
      var height = React.findDOMNode(this).offsetHeight;
      this.open = height ? true : false;//!this.open;
      this.toggle(this);
    }
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
