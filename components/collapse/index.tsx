import RcCollapse from 'rc-collapse';
import React from 'react';

export interface CollapseProps {
  activeKey?: Array<string> | string;
  /** 初始化选中面板的key */
  defaultActiveKey?: Array<string>;
  /** accordion 为 true 的时候，一次只可以打开一个面板 */
  accordion?: boolean;
  /** 切换面板的回调 */
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}

export interface CollapsePanelProps {
  /** 对应 activeKey */
  key: string;
  /** 面板头内容 */
  header: React.ReactNode;
  style?: React.CSSProperties;
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
