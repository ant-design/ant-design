import React from 'react';
import assign from 'object-assign';
import Tooltip from '../tooltip';
import { AbstractTooltipProps } from '../tooltip';

export interface PopoverProps extends AbstractTooltipProps {
   title?: React.ReactNode;
   content?: React.ReactNode | string;
}

export default class Popover extends React.Component<PopoverProps, any> {
  static defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
  };

  refs: {
    tooltip: Tooltip,
  };

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  getOverlay() {
    const { title, prefixCls, content } = this.props;

    return (
      <div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {content}
        </div>
      </div>
    );
  }

  render() {
    const props = assign({}, this.props);
    delete props.title;
    return (
      <Tooltip
        {...props}
        ref="tooltip"
        overlay={this.getOverlay()}
      />
    );
  }
}
