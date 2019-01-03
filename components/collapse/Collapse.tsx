import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import CollapsePanel from './CollapsePanel';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import animation from '../_util/openAnimation';

export interface CollapseProps {
  activeKey?: Array<string> | string;
  defaultActiveKey?: Array<string>;
  /** 手风琴效果 */
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: any) => React.ReactNode;
}

export default class Collapse extends React.Component<CollapseProps, any> {
  static Panel = CollapsePanel;

  static defaultProps = {
    bordered: true,
    openAnimation: { ...animation, appear() {} },
  };

  renderExpandIcon = (panelProps: any, prefixCls: string) => {
    const { expandIcon } = this.props;
    if (!expandIcon) {
      return <Icon type="right" className={`${prefixCls}-arrow`} />;
    }
    const icon = expandIcon(panelProps);
    return React.isValidElement(icon) ? React.cloneElement(icon as any, {
      className: `${prefixCls}-arrow`,
    }) : icon;
  }

  renderCollapse = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', bordered } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapseClassName = classNames(
      {
        [`${prefixCls}-borderless`]: !bordered,
      },
      className,
    );
    return (
      <RcCollapse
        {...this.props}
        expandIcon={(panelProps: any) => this.renderExpandIcon(panelProps, prefixCls)}
        prefixCls={prefixCls}
        className={collapseClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCollapse}</ConfigConsumer>;
  }
}
