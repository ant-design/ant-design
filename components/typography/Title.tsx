import * as React from 'react';

import Base, { BlockProps } from './Base';
import { Omit, tupleNum } from '../_util/type';

import warning from 'warning';

const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4);

type TitleProps = Omit<BlockProps & { level?: (typeof TITLE_ELE_LIST)[number] }, 'strong'>;

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
