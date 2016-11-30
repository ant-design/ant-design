import React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';

export interface CollapseProps {
  activeKey?: Array<string> | string;
  defaultActiveKey?: Array<string>;
  /** 手风琴效果 */
  accordion?: boolean;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
}

export interface CollapsePanelProps {
  key: string;
  header: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
}

export default class Collapse extends React.Component<CollapseProps, any> {
  static Panel: typeof CollapsePanel = RcCollapse.Panel;

  static defaultProps = {
    prefixCls: 'ant-collapse',
    bordered: true,
  };

  render() {
    const { prefixCls, className = '', bordered } = this.props;
    const collapseClassName = classNames({
      [`${prefixCls}-borderless`]: !bordered,
    }, className);
    return <RcCollapse {...this.props} className={collapseClassName} />;
  }
}
