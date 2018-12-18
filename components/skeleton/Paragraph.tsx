import * as React from 'react';
import classNames from 'classnames';

type widthUnit = number | string;

export interface SkeletonParagraphProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  width?: widthUnit | Array<widthUnit>;
  rows?: number;
}

class Paragraph extends React.Component<SkeletonParagraphProps, {}> {
  getWidth(index: number) {
    const { width, rows = 2 } = this.props;
    if (Array.isArray(width)) {
      return width[index];
    }
    // last paragraph
    if (rows - 1 === index) {
      return width;
    }
    return undefined;
  }

  render() {
    const { prefixCls, className, style, rows } = this.props;
    const rowList = [...Array(rows)].map((_, index) => (
      <li key={index} style={{ width: this.getWidth(index) }} />
    ));
    return (
      <ul className={classNames(prefixCls, className)} style={style}>
        {rowList}
      </ul>
    );
  }
}

export default Paragraph;
