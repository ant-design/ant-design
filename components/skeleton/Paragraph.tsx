import * as React from 'react';
import classNames from 'classnames';

type widthUnit = number | string;

export interface SkeletonParagraphProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: widthUnit | Array<widthUnit>;
  rows?: number;
}

const Paragraph = (props: SkeletonParagraphProps) => {
  const getWidth = (index: number) => {
    const { width, rows = 2 } = props;
    if (Array.isArray(width)) {
      return width[index];
    }
    // last paragraph
    if (rows - 1 === index) {
      return width;
    }
    return undefined;
  };
  const { prefixCls, className, style, rows } = props;
  const rowList = [...Array(rows)].map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index} style={{ width: getWidth(index) }} />
  ));
  return (
    <ul className={classNames(prefixCls, className)} style={style}>
      {rowList}
    </ul>
  );
};

export default Paragraph;
