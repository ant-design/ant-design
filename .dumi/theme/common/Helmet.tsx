import * as React from 'react';
import { Helmet } from 'dumi';

const WrapHelmet: React.FC<React.PropsWithChildren<Helmet['props']>> = (props) => (
  <Helmet {...props} />
);

export default WrapHelmet;
