import * as React from 'react';
import warning from 'warning';
import Base, { BaseProps } from './Base';

const TITLE_ELE_LIST: Array<number | undefined> = [1, 2, 3, 4];

interface TitleProps extends BaseProps {
  level?: 1 | 2 | 3 | 4;
}

const Title: React.SFC<TitleProps> = props => {
  const { level = 1 } = props;
  let component: string;

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    component = `h${level}`;
  } else {
    warning(false, 'Title only accept `1 | 2 | 3 | 4` as `level` value.');
    component = 'h1';
  }

  return <Base {...props} component={component} />;
};

export default Title;
