import React from 'react';
import { Helmet } from 'dumi';

const WrapHelmet: React.FC<React.PropsWithChildren<React.ComponentProps<typeof Helmet>>> = (
  props,
) => {
  const { children, ...rest } = props;
  return <Helmet {...rest}>{children}</Helmet>;
};

export default WrapHelmet;
