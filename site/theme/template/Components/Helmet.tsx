import * as React from 'react';
import { Helmet, HelmetProps } from 'react-helmet-async';

export interface WrapHelmetProps extends HelmetProps {
  children?: React.ReactNode;
}

export default function WrapHelmet(props: WrapHelmetProps) {
  return <Helmet {...props} />;
}
