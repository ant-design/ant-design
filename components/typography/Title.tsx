import * as React from 'react';
import devWarning from '../_util/devWarning';
import Base, { BlockProps } from './Base';
import { tupleNum } from '../_util/type';

const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5);

export type TitleProps = Omit<
  BlockProps & {
    level?: typeof TITLE_ELE_LIST[number];
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  },
  'strong'
>;

const Title: React.ForwardRefRenderFunction<HTMLHeadingElement, TitleProps> = (props, ref) => {
  const { level = 1, ...restProps } = props;
  let component: string;

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    component = `h${level}`;
  } else {
    devWarning(
      false,
      'Typography.Title',
      'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.',
    );
    component = 'h1';
  }

  return <Base ref={ref} {...restProps} component={component} />;
};

export default React.forwardRef(Title);
