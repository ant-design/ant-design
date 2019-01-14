import * as React from 'react';
import warning from 'warning';
import Base, { BaseProps } from './Base';

const TITLE_ELE_LIST: Array<number | undefined> = [1, 2, 3, 4];

interface TitleProps extends BaseProps {
  important?: 1 | 2 | 3 | 4;
}

const Title: React.SFC<TitleProps> = (props: TitleProps) => {
  const { important = 1 } = props;
  let component: string;

  if (TITLE_ELE_LIST.indexOf(important) !== -1) {
    component = `h${important}`;
  } else {
    warning(false, 'Title only accept `1 | 2 | 3 | 4` as `important` value.');
    component = 'h1';
  }

  return <Base {...props} component={component} />;
};

export default Title;
