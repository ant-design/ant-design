import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import RightOutlined from '@ant-design/icons/RightOutlined';

import CollapsePanel from './CollapsePanel';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import animation from '../_util/openAnimation';
import { cloneElement } from '../_util/reactNode';

export type ExpandIconPosition = 'left' | 'right' | undefined;

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
  };

  getIconPosition(direction: string = 'ltr') {
    const { expandIconPosition } = this.props;
    if (expandIconPosition !== undefined) {
      return expandIconPosition;
    }
    return direction === 'rtl' ? 'right' : 'left';
  }

  renderExpandIcon = (panelProps: PanelProps = {}, prefixCls: string) => {
    const { expandIcon } = this.props;
    const icon = (expandIcon ? (
      expandIcon(panelProps)
    ) : (
      <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />
    )) as React.ReactNode;

    return cloneElement(icon, () => ({
      className: classNames((icon as any).props.className, `${prefixCls}-arrow`),
    }));
  };

  renderCollapse = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', bordered } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const iconPosition = this.getIconPosition(direction);
    const collapseClassName = classNames(
      {
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-icon-position-${iconPosition}`]: true,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );
    const openAnimation = { ...animation, appear() {} };

    return (
      <RcCollapse
        openAnimation={openAnimation}
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
