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
}

export default class Collapse extends React.Component<CollapseProps, any> {
  static Panel = CollapsePanel;

  static defaultProps = {
    bordered: true,
    openAnimation: { ...animation, appear() { } },
  };

  renderExpandIcon = () => {
    return (
      <Icon type="right" className={`arrow`} />
    );
  }

  renderCollapse = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', bordered } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapseClassName = classNames({
      [`${prefixCls}-borderless`]: !bordered,
    }, className);
    return (
      <RcCollapse
        {...this.props}
        prefixCls={prefixCls}
        className={collapseClassName}
        expandIcon={this.renderExpandIcon}
      />
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderCollapse}
      </ConfigConsumer>
    );
  }
}
