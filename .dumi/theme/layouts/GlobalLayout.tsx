import React, { type FC } from 'react';
import { useOutlet } from 'dumi';

const GlobalLayout: FC = () => {
  const outlet = useOutlet();

  // TODO: place global ConfigProvider here, apply for all route paths
  return <>{outlet}</>;
};

export default GlobalLayout;
