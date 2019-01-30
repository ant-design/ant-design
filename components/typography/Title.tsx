import * as React from 'react';
import warning from 'warning';
import Base, { BlockProps } from './Base';
import { tupleNum } from '../_util/type';

const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4);

interface TitleProps extends BlockProps {
  level?: (typeof TITLE_ELE_LIST)[number];
}

const Title: React.SFC<TitleProps> = props => {
  const { level = 1, ...restProps } = props;
  let component: string;

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    component = `h${level}`;
  } else {
    warning(false, 'Title only accept `1 | 2 | 3 | 4` as `level` value.');
    component = 'h1';
  }

  return <Base {...restProps} component={component} />;
};

export default Title;
