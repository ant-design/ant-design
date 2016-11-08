import React from 'react';
import assign from 'object-assign';
import Tooltip from '../tooltip';

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
   getTooltipContainer?: (triggerNode: React.ReactNode) => HTMLElement;
   /** content of popup-container */
   content?: React.ReactNode | string;
   style?: React.CSSProperties;
   transitionName?: string;
   openClassName?: string;
   arrowPointAtCenter?: boolean;
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
    const props = assign({}, this.props);
    delete props.title;
    return (
      <Tooltip
        ref="tooltip"
        {...props}
        overlay={this.getOverlay()}
      />
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
