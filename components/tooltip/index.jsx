import React from 'react';
import RcTooltip from 'rc-tooltip';
import getPlacements from '../popover/placements';

const placements = getPlacements({
  verticalArrowShift: 8,
});

export default class Tooltip extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-tooltip',
    placement: 'top',
    transitionName: 'zoom-big',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  onVisibleChange = (visible) => {
    this.setState({ visible });
  }

  onPopupAlign = (domNode, align) => {
    // 当前返回的位置;
    let placement;
    Object.keys(placements).forEach(key => {
      const item = placements[key];
      if (item.points[0] === align.points[0] && item.points[1] === align.points[1]) {
        placement = key;
      }
    });
    // 当前坐标;
    const rect = domNode.getBoundingClientRect();
    let top = '50%';
    let left = '50%';
    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      top = `${rect.height - align.offset[1]}px`;
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      top = `${-align.offset[1]}px`;
    }
    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      left = `${rect.width - align.offset[0]}px`;
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${left} ${top}`;
  };

  render() {
    // Hide tooltip when there is no title
    let visible = this.state.visible;
    if (!this.props.title && !this.props.overlay) {
      visible = false;
    }
    return (
      <RcTooltip transitionName={this.props.transitionName}
        builtinPlacements={placements}
        overlay={this.props.title}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        onPopupAlign={this.onPopupAlign}
        {...this.props}>
        {this.props.children}
      </RcTooltip>
    );
  }
}
