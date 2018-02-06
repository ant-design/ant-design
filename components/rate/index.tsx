import * as React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';

export interface RateProps {
  prefixCls?: string;
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
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

  private rcRate: any;

  focus() {
    this.rcRate.focus();
  }

  blur() {
    this.rcRate.blur();
  }

  saveRate = (node: any) => {
    this.rcRate = node;
  }

  render() {
    return <RcRate ref={this.saveRate} {...this.props} />;
  }
}
