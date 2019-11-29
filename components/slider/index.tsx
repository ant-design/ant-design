import * as React from 'react';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import Tooltip, { TooltipPlacement } from '../tooltip';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SliderMarks {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
      };
}

export type SliderValue = number | [number, number];

interface HandleGeneratorInfo {
  value: number;
  dragging: boolean;
  index: number;
  rest: any[];
}
export type HandleGeneratorFn = (
  tooltipPrefixCls: string,
  info: HandleGeneratorInfo,
) => React.ReactNode;

export interface SliderProps {
  prefixCls?: string;
  tooltipPrefixCls?: string;
  range?: boolean;
  reverse?: boolean;
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
  style?: React.CSSProperties;
  tooltipVisible?: boolean;
  tooltipPlacement?: TooltipPlacement;
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export interface SliderState {
  visibles: { [index: number]: boolean };
}

export default class Slider extends React.Component<SliderProps, SliderState> {
  static defaultProps = {
    tipFormatter(value: number) {
      return value.toString();
    },
  };

  rcSlider: any;

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
  };

  handleWithTooltip: HandleGeneratorFn = (
    tooltipPrefixCls: string,
    { value, dragging, index, ...restProps },
  ) => {
    const { tipFormatter, tooltipVisible, tooltipPlacement, getTooltipPopupContainer } = this.props;
    const { visibles } = this.state;
    const isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
    const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter);
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={visible}
        placement={tooltipPlacement || 'top'}
        transitionName="zoom-down"
        key={index}
        getPopupContainer={getTooltipPopupContainer || (() => document.body)}
      >
        <RcHandle
          {...restProps}
          value={value}
          onMouseEnter={() => this.toggleTooltipVisible(index, true)}
          onMouseLeave={() => this.toggleTooltipVisible(index, false)}
        />
      </Tooltip>
    );
  };

  saveSlider = (node: any) => {
    this.rcSlider = node;
  };

  focus() {
    this.rcSlider.focus();
  }

  blur() {
    this.rcSlider.blur();
  }

  renderSlider = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      tooltipPrefixCls: customizeTooltipPrefixCls,
      range,
      ...restProps
    } = this.props;
    const prefixCls = getPrefixCls('slider', customizePrefixCls);
    const tooltipPrefixCls = getPrefixCls('tooltip', customizeTooltipPrefixCls);
    if (range) {
      return (
        <RcRange
          {...restProps}
          ref={this.saveSlider}
          handle={(info: HandleGeneratorInfo) => this.handleWithTooltip(tooltipPrefixCls, info)}
          prefixCls={prefixCls}
          tooltipPrefixCls={tooltipPrefixCls}
        />
      );
    }
    return (
      <RcSlider
        {...restProps}
        ref={this.saveSlider}
        handle={(info: HandleGeneratorInfo) => this.handleWithTooltip(tooltipPrefixCls, info)}
        prefixCls={prefixCls}
        tooltipPrefixCls={tooltipPrefixCls}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSlider}</ConfigConsumer>;
  }
}
