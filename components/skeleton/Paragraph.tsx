import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

type widthUnit = number | string;

export interface SkeletonParagraphProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  width?: widthUnit | Array<widthUnit>;
  rows?: number;
}

interface SkeletonParagraphState {
  prevProps: SkeletonParagraphProps;
  widthList: Array<widthUnit>;
}

class Paragraph extends React.Component<SkeletonParagraphProps, SkeletonParagraphState> {
  static defaultProps: Partial<SkeletonParagraphProps> = {
    prefixCls: 'ant-skeleton-paragraph',
  };

  static getDerivedStateFromProps(
    props: SkeletonParagraphProps,
    state: SkeletonParagraphState,
  ): Partial<SkeletonParagraphState> {
    const { prevProps } = state;
    const { width, rows = 2 } = props;

    const newState: Partial<SkeletonParagraphState> = {
      prevProps: props,
    };

    if (rows !== prevProps.rows || width !== prevProps.width) {
      // Parse width list
      let widthList = [];
      if (width && Array.isArray(width)) {
        widthList = width;
      } else if (width && !Array.isArray(width)) {
        widthList = [];
        widthList[rows - 1] = width;
      }

      newState.widthList = widthList;
    }

    return newState;
  }

  state: SkeletonParagraphState = {
    prevProps: {},
    widthList: [],
  };

  render() {
    const { widthList } = this.state;
    const { prefixCls, className, style, rows } = this.props;

    const rowList = [...Array(rows)].map((_, index) => (
      <li key={index} style={{ width: widthList[index] }} />
    ));

    return (
      <ul
        className={classNames(prefixCls, className)}
        style={style}
      >
        {rowList}
      </ul>
    );
  }
}

polyfill(Paragraph);

export default Paragraph;
