import React from 'react';
import Menu from 'rc-menu';
import { transitionEndEvent, animationEndEvent, addEventListenerOnce } from '../util/index';

const AntMenu = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-menu'
    };
  },

  toggle(info) {
    let dom = React.findDOMNode(info.item);
    let ul = dom.getElementsByClassName(`${this.props.prefixCls}-sub`)[0];
    ul.style.display = 'block';

    if (this.props.mode === 'inline') {
      addEventListenerOnce(ul, transitionEndEvent, function(e) {
        ul.style.height = '';
        ul.style.display = '';
      });
      let offsetHeight = ul.offsetHeight;
      if (info.open) {
        ul.style.height = 0;
      } else {
        ul.style.height = offsetHeight + 'px';
        offsetHeight = 0;
      }
      setTimeout(() => {
        ul.style.height = offsetHeight + 'px';
      }, 10);
      ul.style.animation = 'none';
    } else {
      addEventListenerOnce(ul, animationEndEvent, function(e) {
        ul.style.display = '';
      });
      if (this.props.mode === 'vertical') {
        ul.style.transformOrigin = '0 0';
      }
    }

    let ulChild = ul.children;
    for (let i = 0; i < ulChild.length; i++) {
      let li = ulChild[i];
      let delay = info.open ? i : (ulChild.length - 1 - i);
      li.style.animationDelay = 0.04 * delay + 's';
      li.style.animationDuration = (0.8 / ulChild.length + 0.2) + 's';

      if (this.props.mode === 'vertical') {
        li.style.transformOrigin = '0 0';
      }
    }
  },

  render() {
    return <Menu {...this.props} onOpen={this.toggle} onClose={this.toggle}/>;
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
