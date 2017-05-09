import React from 'react';
import PropTypes from 'prop-types';
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
  character?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default class Rate extends React.Component<RateProps, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node,
  };
  static defaultProps = {
    prefixCls: 'ant-rate',
    character: <Icon type="star" />,
  };
  render() {
    return <RcRate {...this.props} />;
  }
}
