import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import omit from 'omit.js';
import Icon from '../icon';
import Tooltip from '../tooltip';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface RateProps {
  prefixCls?: string;
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  tooltips?: Array<string>;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  character?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface RateNodeProps {
  index: number;
}

export default class Rate extends React.Component<RateProps, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node,
  };

  static defaultProps = {
    character: <Icon type="star" theme="filled" />,
  };

  private rcRate: any;

  saveRate = (node: any) => {
    this.rcRate = node;
  };

  characterRender = (node: React.ReactNode, { index }: RateNodeProps) => {
    const { tooltips } = this.props;
    if (!tooltips) return node;

    return <Tooltip title={tooltips[index]}>{node}</Tooltip>;
  };

  focus() {
    this.rcRate.focus();
  }

  blur() {
    this.rcRate.blur();
  }

  renderRate = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, ...restProps } = this.props;

    const rateProps = omit(restProps, ['tooltips']);

    return (
      <RcRate
        ref={this.saveRate}
        characterRender={this.characterRender}
        {...rateProps}
        prefixCls={getPrefixCls('rate', prefixCls)}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderRate}</ConfigConsumer>;
  }
}
