import React from 'react';
import { PropTypes } from 'react';
import RcRate from 'rc-rate';
import Icon from '../icon';

export interface RateProps {
  prefixCls?: string;
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => any;
  onHoverChange?: (value: number) => any;
  charactor?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default class Rate extends React.Component<RateProps, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    charactor: PropTypes.node,
  };
  static defaultProps = {
    prefixCls: 'ant-rate',
    charactor: <Icon type="star" />,
  };
  render() {
    return <RcRate {...this.props} />;
  }
}
