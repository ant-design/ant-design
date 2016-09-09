import * as React from 'react';
import Tooltip from '../tooltip';
import getPlacements from './placements';

const placements = getPlacements();

export interface PopoverProps {
   /** trigger type, options: `hover` `focus` `click` */
   trigger?: 'hover' | 'focus' | 'click';
   /** Position of popup-container,
   * options: `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight`
   * `leftTop` `leftBottom` `rightTop` `rightBottom`
   */
   placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' |
   'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
   /** title of popup-container */
   title?: React.ReactNode;
   /** classname of popup-container */
   overlayClassName?: string;
   /** Style of overlay */
   overlayStyle?: React.CSSProperties;
   prefixCls?: string;
   /** to control visibility of popup-container */
   visible?: boolean;
   /** callback when visible change */
   onVisibleChange?: (visible: boolean) => void;
   /** specify wrapper of popup-container */
   getTooltipContainer?: (triggerNode: React.ReactNode) => React.ReactNode;
   /** content of popup-container */
   content?: React.ReactNode;
   style?: React.CSSProperties;
   transitionName?: string;
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

  render() {
    return (
      <Tooltip transitionName={this.props.transitionName}
        builtinPlacements={placements}
        ref="tooltip"
        {...this.props}
        overlay={this.getOverlay()}
      >
        {this.props.children}
      </Tooltip>
    );
  }

  getPopupDomNode() {
    return (this.refs as any).tooltip.getPopupDomNode();
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
}
