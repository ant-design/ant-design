import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';

export interface CollapsePanelProps {
  key: string;
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  prefixCls?: string;
  forceRender?: boolean;
}

export default class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
  render() {
    const { prefixCls, className = '', showArrow = true } = this.props;
    const collapsePanelClassName = classNames({
      [`${prefixCls}-no-arrow`]: !showArrow,
    }, className);
    return <RcCollapse.Panel {...this.props} className={collapsePanelClassName} />;
  }
}
