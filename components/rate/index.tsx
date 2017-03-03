import React from 'react';
import { PropTypes } from 'react';
import RcRate from 'rc-rate';

export interface RateProps {
  prefixCls?: string;
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => any;
}

export default class Rate extends React.Component<RateProps, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
  };
  static defaultProps = {
    prefixCls: 'ant-rate',
  };
  render() {
    return <RcRate {...this.props} />;
  }
}
