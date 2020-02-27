import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import { RightOutlined } from '@ant-design/icons';

import CollapsePanel from './CollapsePanel';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import animation from '../_util/openAnimation';

export type ExpandIconPosition = 'left' | 'right';

export interface CollapseProps {
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  /** 手风琴效果 */
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPosition?: ExpandIconPosition;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export default class Collapse extends React.Component<CollapseProps, any> {
  static Panel = CollapsePanel;

  static defaultProps = {
    bordered: true,
    openAnimation: { ...animation, appear() {} },
    expandIconPosition: 'left',
  };

  renderExpandIcon = (panelProps: PanelProps = {}, prefixCls: string) => {
    const { expandIcon } = this.props;
    const icon = (expandIcon ? (
      expandIcon(panelProps)
    ) : (
      <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />
    )) as React.ReactNode;

    return React.isValidElement(icon)
      ? React.cloneElement(icon as any, {
          className: classNames(icon.props.className, `${prefixCls}-arrow`),
        })
      : icon;
  };

  renderCollapse = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      bordered,
      expandIconPosition,
    } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapseClassName = classNames(
      {
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-icon-position-${expandIconPosition}`]: true,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );
    return (
      <RcCollapse
        {...this.props}
        expandIcon={(panelProps: PanelProps) => this.renderExpandIcon(panelProps, prefixCls)}
        prefixCls={prefixCls}
        className={collapseClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCollapse}</ConfigConsumer>;
  }
}
