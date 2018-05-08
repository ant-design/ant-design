import * as React from 'react';
import Tooltip, { AbstractTooltipProps, TooltipPlacement, TooltipTrigger } from '../tooltip';
import warning from '../_util/warning';

export interface PopoverProps extends AbstractTooltipProps {
   title?: React.ReactNode;
   content?: React.ReactNode;
}

export default class Popover extends React.Component<PopoverProps, {}> {
  static defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top' as TooltipPlacement,
    transitionName: 'zoom-big',
    trigger: 'hover' as TooltipTrigger,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
  };

  private tooltip: Tooltip;

  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }

  getOverlay() {
    const { title, prefixCls, content } = this.props;
    warning(
      !('overlay' in this.props),
      'Popover[overlay] is removed, please use Popover[content] instead, ' +
      'see: https://u.ant.design/popover-content',
    );
    return (
      <div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {content}
        </div>
      </div>
    );
  }

  saveTooltip = (node: any) => {
    this.tooltip = node;
  }

  render() {
    const props = { ...this.props };
    delete props.title;
    return (
      <Tooltip
        {...props}
        ref={this.saveTooltip}
        overlay={this.getOverlay()}
      />
    );
  }
}
