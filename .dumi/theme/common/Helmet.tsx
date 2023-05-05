import { Helmet } from 'dumi';
import React from 'react';

type HelmetProps = Helmet['props'];
export interface WrapHelmetProps extends HelmetProps {
  children?: React.ReactNode;
}

export default function WrapHelmet(props: WrapHelmetProps) {
  return <Helmet {...props} />;
}
