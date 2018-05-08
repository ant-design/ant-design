import * as React from 'react';
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

export type HandleGeneratorFn = (info: {
  value: number,
  dragging: boolean,
  index: number,
  rest: any[],
}) => React.ReactElement<any>;

export interface SliderProps {
  prefixCls?: string;
  tooltipPrefixCls?: string;
  range?: boolean;
  min?: number;
  max?: number;
  step?: number | null;
  marks?: SliderMarks;
  dots?: boolean;
  value?: SliderValue;
  defaultValue?: SliderValue;
  included?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (value: SliderValue) => void;
  onAfterChange?: (value: SliderValue) => void;
  tipFormatter?: null | ((value: number) => React.ReactNode);
  className?: string;
  id?: string;
}

export interface SliderState {
  visibles: { [index: number]: boolean };
}

export default class Slider extends React.Component<SliderProps, SliderState> {
  static defaultProps = {
    prefixCls: 'ant-slider',
    tooltipPrefixCls: 'ant-tooltip',
    tipFormatter(value: number) {
      return value.toString();
    },
  };

  private rcSlider: any;

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      visibles: {},
    };
  }

  toggleTooltipVisible = (index: number, visible: boolean) => {
    this.setState(({ visibles }) => ({
      visibles: {
        ...visibles,
        [index]: visible,
      },
    }));
  }
  handleWithTooltip: HandleGeneratorFn = ({ value, dragging, index, ...restProps }) => {
    const { tooltipPrefixCls, tipFormatter } = this.props;
    const { visibles } = this.state;
    const visible = tipFormatter ? (visibles[index] || dragging)  : false;
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={visible}
        placement="top"
        transitionName="zoom-down"
        key={index}
      >
        <RcHandle
          {...restProps}
          value={value}
          onMouseEnter={() => this.toggleTooltipVisible(index, true)}
          onMouseLeave={() => this.toggleTooltipVisible(index, false)}
        />
      </Tooltip>
    );
  }

  focus() {
    this.rcSlider.focus();
  }

  blur() {
    this.rcSlider.focus();
  }

  saveSlider = (node: any) => {
    this.rcSlider = node;
  }

  render() {
    const { range, ...restProps } = this.props;
    if (range) {
      return <RcRange {...restProps} ref={this.saveSlider} handle={this.handleWithTooltip} />;
    }
    return <RcSlider {...restProps} ref={this.saveSlider} handle={this.handleWithTooltip} />;
  }
}
