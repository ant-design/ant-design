import RcCollapse from 'rc-collapse';
import React from 'react';

export interface CollapseProps {
  activeKey?: Array<string> | string;
  defaultActiveKey?: Array<string>;
  /** 手风琴效果 */
  accordion?: boolean;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
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
  };

  render() {
    return <RcCollapse {...this.props} />;
  }
}
