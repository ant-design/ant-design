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
    let dom = React.findDOMNode(info.item || info);
    let ul = dom.getElementsByTagName('ul')[0] || dom;
    ul.style.display = 'block';

    let animStr = this.props.mode === 'horizontal' || !this.props.mode ? ' slide-up' : ' zoom', childAnimStr = ' zoom';
    let enterAndleave = info.open ? '-enter' : '-leave';

    if (this.props.mode === 'inline') {
      addEventListenerOnce(ul, transitionEndEvent, function (e) {
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
      }, 1);
    } else {
      ul.className += animStr + enterAndleave + animStr + enterAndleave + '-active';
      addEventListenerOnce(ul, animationEndEvent, function (e) {
        ul.style.display = '';
        ul.className = ul.className.replace(/(slide-up-|zoom-|enter|-active|leave)/g, '').trim();
      });
    }

    let ulChild = ul.children, len = ulChild.length;
    for (let i = 0; i < len; i++) {
      let li = ulChild[i];
      let delayNum = info.open ? i : (len - 1 - i);
      let delay = 0.2 / len * delayNum;
      li.style.animationDelay = delay + 's';
      li.style.animationDuration = (0.2 - delay + 0.1) + 's';
      li.className += childAnimStr + enterAndleave + childAnimStr + enterAndleave + '-active';
      addEventListenerOnce(li, animationEndEvent, function (e) {
        li.style.animationDelay = '';
        li.style.animationDuration = '';
        li.className = li.className.replace(/(slide-up-|zoom-|enter|-active|leave)/g, '').trim();
      });
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
    return <Menu {...this.props} onOpen={this.toggle} onClose={this.toggle}/>;
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
