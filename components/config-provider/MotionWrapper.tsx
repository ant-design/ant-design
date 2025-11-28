import * as React from 'react';
import { Provider as MotionProvider } from '@rc-component/motion';

import { useToken } from '../theme/internal';

const MotionCacheContext = React.createContext(true);
if (process.env.NODE_ENV !== 'production') {
  MotionCacheContext.displayName = 'MotionCacheContext';
}

export interface MotionWrapperProps {
  children?: React.ReactNode;
}

export default function MotionWrapper(props: MotionWrapperProps): React.ReactElement {
  const parentMotion = React.useContext(MotionCacheContext);

  const { children } = props;
  const [, token] = useToken();
  const { motion } = token;

  const needWrapMotionProviderRef = React.useRef(false);
  needWrapMotionProviderRef.current ||= parentMotion !== motion;

  if (needWrapMotionProviderRef.current) {
    return (
      <MotionCacheContext.Provider value={motion}>
        <MotionProvider motion={motion}>{children}</MotionProvider>
      </MotionCacheContext.Provider>
    );
  }

  return children as React.ReactElement;
}
