import React from 'react';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import Tooltip from '../tooltip';

export interface SliderMarks {
  [key: number]: React.ReactNode | {
    style: React.CSSProperties,
    label: React.ReactNode,
  };
}

export type SliderValue = number | [number, number];

export interface SliderProps {
  prefixCls?: string;
  tooltipPrefixCls?: string;
  range?: boolean;
  min?: number;
  max?: number;
  step?: number | void;
  marks?: SliderMarks;
  dots?: boolean;
  value?: SliderValue;
  defaultValue?: SliderValue;
  included?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (value: SliderValue) => void;
  onAfterChange?: (value: SliderValue) => void;
  tipFormatter?: void | ((value: number) => React.ReactNode);
}

export default class Slider extends React.Component<SliderProps, any> {
  static defaultProps = {
    prefixCls: 'ant-slider',
    tooltipPrefixCls: 'ant-tooltip',
    tipFormatter(value) {
      return value.toString();
    },
  };

  constructor(props) {
    super(props);
    this.state = { visibles: {} };
  }

  handleTooltipVisibleChange = (index, visible) => {
    this.setState({
      visibles: {
        ...this.state.visibles,
        [index]: visible,
      },
    });
  }
  handleWithTooltip = ({ value, dragging, index, ...restProps }) => {
    const { tooltipPrefixCls, tipFormatter } = this.props;
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={tipFormatter && (this.state.visibles[index] || dragging)}
        onVisibleChange={visible => this.handleTooltipVisibleChange(index, visible)}
        placement="top"
        transitionName="zoom-down"
        key={index}
      >
        <RcHandle {...restProps} />
      </Tooltip>
    );
  }

  render() {
    const { range, ...restProps } = this.props;
    if (range) {
      return <RcRange {...restProps} handle={this.handleWithTooltip} />;
    }
    return <RcSlider {...restProps} handle={this.handleWithTooltip} />;
  }
}
