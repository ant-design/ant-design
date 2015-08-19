import Menu from 'rc-menu';
import React, {findDOMNode} from 'react';

const AntMenu = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-menu'
    };
  },

  onCancel(e) {
    var self = this, dom = findDOMNode(e.item), ul = dom.getElementsByClassName(`${this.props.prefixCls}-sub`)[0], props = self.props;
    var animStr = props.mode === 'horizontal' ? ' slide-up' : ' zoom', childAnimStr = ' zoom';
    var enterAndleave = e.open ? '-enter' : '-leave';

    ul.style.display = 'block';
    if (props.mode === 'inline') {
      var h = ul.offsetHeight;
      if (e.open) {
        ul.style.height = 0;
      } else {
        ul.style.height = h + 'px';
        h = 0;
      }
      setTimeout(()=> {
        ul.style.height = h + 'px';
      }, 1);
    } else {
      ul.className += animStr + enterAndleave + animStr + enterAndleave + '-active';
    }


    var ulChild = ul.children, len = ulChild.length;
    for (var i = 0; i < len; i++) {
      var m = ulChild[i];
      var delayNum = e.open ? i : (len - 1 - i);
      var delay = 0.3 / len * delayNum;
      m.style.animationDelay = delay + 's';
      m.style.animationDuration = (0.3 - delay + 0.1) + 's';
      m.className += childAnimStr + enterAndleave + childAnimStr + enterAndleave + '-active';
    }
    setTimeout(()=> {
      ul.style.display = '';
      ul.style.height = '';
      ul.className = ul.className.replace(/(slide-up-|zoom-|enter|-active|leave)/g, '').trim();
      for (var j = 0; j < len; j++) {
        var mc = ulChild[j];
        mc.style.animationDelay = '';
        mc.style.animationDuration = '';
        mc.className = mc.className.replace(/(slide-up-|zoom-|enter|-active|leave)/g, '').trim();
      }
    }, 401);

  },


  componentDidMount() {
    this.componentDidUpdate(this.props);
  },
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    //更改初始进场
  },

  render() {
    return <Menu {...this.props} onOpen={this.onCancel} onClose={this.onCancel}/>;
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
