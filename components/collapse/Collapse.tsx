import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import CollapsePanel from './CollapsePanel';

export interface CollapseProps {
  activeKey?: Array<string> | string;
  defaultActiveKey?: Array<string>;
  /** 手风琴效果 */
  accordion?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
}

export default class Collapse extends React.Component<CollapseProps, any> {
  static Panel = CollapsePanel;

  static defaultProps = {
    prefixCls: 'ant-collapse',
    bordered: true,
    openAnimation: { ...animation, appear() { } },
  };

  render() {
    const { prefixCls, className = '', bordered } = this.props;
    const collapseClassName = classNames({
      [`${prefixCls}-borderless`]: !bordered,
    }, className);
    return <RcCollapse {...this.props} className={collapseClassName} />;
  }
}
