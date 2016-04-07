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
    mouseLeaveDelay: 0.1,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onVisibleChange = (visible) => {
    this.setState({ visible });
  }

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  // 动态设置动画点
  onPopupAlign = (domNode, align) => {
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key => (
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1]
      )
    )[0];
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = {
      top: '50%',
      left: '50%',
    };
    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }
    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  }

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
        ref="tooltip"
        {...this.props}>
        {this.props.children}
      </RcTooltip>
    );
  }
}
