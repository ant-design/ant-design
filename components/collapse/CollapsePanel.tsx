import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CollapsePanelProps {
  key: string | number;
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  prefixCls?: string;
  forceRender?: boolean;
  id?: string;
  extra?: React.ReactNode;
}

export default class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
  renderCollapsePanel = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', showArrow = true } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapsePanelClassName = classNames(
      {
        [`${prefixCls}-no-arrow`]: !showArrow,
      },
      className,
    );
    return (
      <RcCollapse.Panel {...this.props} prefixCls={prefixCls} className={collapsePanelClassName} />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCollapsePanel}</ConfigConsumer>;
  }
}
