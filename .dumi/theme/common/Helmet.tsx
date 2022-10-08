import * as React from 'react';
import type { HelmetProps } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';

export interface WrapHelmetProps extends HelmetProps {
  children?: React.ReactNode;
}

export default function WrapHelmet(props: WrapHelmetProps) {
  return <Helmet {...props} />;
}
