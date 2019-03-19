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
  };

  renderExpandIcon = (panelProps: PanelProps = {}, prefixCls: string) => {
    const { expandIcon } = this.props;
    const icon = expandIcon ? (
      expandIcon(panelProps)
    ) : (
      <Icon type="right" rotate={panelProps.isActive ? 90 : undefined} />
    );
    return React.isValidElement(icon)
      ? React.cloneElement(icon as any, {
          className: `${prefixCls}-arrow`,
        })
      : icon;
  };

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
