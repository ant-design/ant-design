import { Provider as MotionProvider } from 'rc-motion';
import * as React from 'react';
import { useToken } from '../theme/internal';

export interface MotionWrapperProps {
  children?: React.ReactNode;
}

export default function MotionWrapper(props: MotionWrapperProps): React.ReactElement {
  const { children } = props;
  const [, token] = useToken();
  const { motion } = token;

  const needWrapMotionProviderRef = React.useRef(false);
  needWrapMotionProviderRef.current = needWrapMotionProviderRef.current || motion === false;

  if (needWrapMotionProviderRef.current) {
    return <MotionProvider motion={motion}>{children}</MotionProvider>;
  }

  return children as React.ReactElement;
}
