import * as React from 'react';
import { Provider as MotionProvider } from 'rc-motion';

import { useToken } from '../theme/internal';

const MotionCacheContext = React.createContext(false);
if (process.env.NODE_ENV !== 'production') {
  MotionCacheContext.displayName = 'MotionCacheContext';
}

export interface MotionWrapperProps {
  children?: React.ReactNode;
}

export default function MotionWrapper(props: MotionWrapperProps): React.ReactElement {
  const cacheNeedWrap = React.useContext(MotionCacheContext);

  const { children } = props;
  const [, token] = useToken();
  const { motion } = token;

  const needWrapMotionProviderRef = React.useRef(false);
  needWrapMotionProviderRef.current = needWrapMotionProviderRef.current || motion === false;

  if (needWrapMotionProviderRef.current || cacheNeedWrap) {
    return (
      <MotionCacheContext.Provider value={needWrapMotionProviderRef.current}>
        <MotionProvider motion={motion}>{children}</MotionProvider>
      </MotionCacheContext.Provider>
    );
  }

  return children as React.ReactElement;
}
