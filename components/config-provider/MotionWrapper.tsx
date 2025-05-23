import * as React from 'react';
import { Provider as MotionProvider } from 'rc-motion';

import { useToken } from '../theme/internal';

export interface MotionWrapperProps {
  children?: React.ReactNode;
}

export default function MotionWrapper(props: MotionWrapperProps): React.ReactElement {
  const { children } = props;
  const [, token] = useToken();
  const { motion } = token;

  return <MotionProvider motion={motion}>{children}</MotionProvider>;
}
