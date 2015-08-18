import Menu from 'rc-menu';
import React, {findDOMNode} from 'react';

const AntMenu = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-menu'
    };
  },

  onCancel(e) {
    function whichTransitionEvent() {
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (var t in transitions) {
        if (t in document.documentElement.style) {
          return transitions[t];
        }
      }
      return false;
    };
    function whichAnimationEvent() {
      var animation = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
      };
      for (var t in animation) {
        if (t in document.documentElement.style) {
          return animation[t];
        }
      }
      return false;
    };

    var self = this, dom = findDOMNode(e.item), ul = dom.getElementsByClassName(`${this.props.prefixCls}-sub`)[0], props = self.props;
    var tEnd = whichTransitionEvent();

    ul.style.display = 'block';
    if (props.mode === 'inline') {
      var _event = function (e) {
        var m = e.target;
        m.removeEventListener(tEnd, _event);
        if (m === ul) {
          ul.style.height = '';
          ul.style.display = '';
        }
      };
      ul.addEventListener(tEnd, _event);
      var h = ul.offsetHeight;
      if (e.open) {
        ul.style.height = 0;
      } else {
        ul.style.height = h + 'px';
        h = 0;
      }
      setTimeout(()=> {
        ul.style.height = h + 'px';
      }, 10);
      ul.style.animation = 'none';
    } else {
      var aEnd = whichAnimationEvent();
      var __event = function (e) {
        var m = e.target;
        m.removeEventListener(aEnd, _event);
        if (m === ul) {
          ul.style.display = '';
        }
      };
      ul.addEventListener(aEnd, __event);
      if (props.mode === 'vertical') {
        ul.style.transformOrigin = '0 0';
      }
    }

    var ulChild = ul.children;
    for (var i = 0; i < ulChild.length; i++) {
      var m = ulChild[i];
      var delay = e.open ? i : (ulChild.length - 1 - i);
      m.style.animationDelay = 0.04 * delay + 's';
      m.style.animationDuration = (0.8 / ulChild.length + 0.2) + 's';
      if (props.mode === 'vertical') {
        m.style.transformOrigin = '0 0';
      }
    }

  },

  render() {
    return <Menu {...this.props} onOpen={this.onCancel} onClose={this.onCancel}/>;
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
