import * as React from 'react';
import { PropTypes } from 'react';
import RcSlider from 'rc-slider';
import splitObject from '../_util/splitObject';

interface SliderMarks {
  [key: number]: React.ReactNode | {
    style: React.CSSProperties,
    label: React.ReactNode,
  };
}

type SliderValue = number | [number, number];

export interface SliderProps {
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
  onChange?: (value: SliderValue) => any;
  onAfterChange?: (value: SliderValue) => any;
  tipFormatter?: void | ((value: number) => React.ReactNode);
}

export default class Slider extends React.Component<SliderProps, any> {
  static defaultProps = {
    prefixCls: 'ant-slider',
    tipTransitionName: 'zoom-down',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    tipTransitionName: PropTypes.string,
    included: PropTypes.bool,
    marks: PropTypes.object,
  };

  render() {
    const [{isIncluded, marks, index, defaultIndex}, others] = splitObject(this.props,
      ['isIncluded', 'marks', 'index', 'defaultIndex']);

    if (isIncluded !== undefined) {
      // 兼容 `isIncluded`
      others.included = isIncluded;
    }

    if (Array.isArray(marks)) {
      // 兼容当 marks 为数组的情况
      others.min = 0;
      others.max = marks.length - 1;
      others.step = 1;

      if (index !== undefined) {
        others.value = index;
      }
      if (defaultIndex !== undefined) {
        others.defaultValue = defaultIndex;
      }

      others.marks = {};
      marks.forEach((val, idx) => {
        others.marks[idx] = val;
      });
    } else {
      others.marks = marks;
    }

    return <RcSlider {...others} />;
  }
}
