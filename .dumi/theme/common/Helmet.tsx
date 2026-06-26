import React from 'react';
import { Helmet } from 'dumi';

type WrapHelmetProps = React.ComponentProps<typeof Helmet>;

const WrapHelmet: React.FC<React.PropsWithChildren<WrapHelmetProps>> = (props) => {
  const { children, ...rest } = props;
  return <Helmet {...rest}>{children}</Helmet>;
};

export default WrapHelmet;
