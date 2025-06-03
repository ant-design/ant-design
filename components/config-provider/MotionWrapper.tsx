import * as React from 'react';
import { Provider as MotionProvider } from 'rc-motion';

import { useToken } from '../theme/internal';

const MotionCacheContext = React.createContext({ parentMotion: true });
if (process.env.NODE_ENV !== 'production') {
  MotionCacheContext.displayName = 'MotionCacheContext';
}

export interface MotionWrapperProps {
  children?: React.ReactNode;
}

export default function MotionWrapper(props: MotionWrapperProps): React.ReactElement {
  const { parentMotion } = React.use(MotionCacheContext);

  const { children } = props;
  const [, token] = useToken();
  const { motion } = token;

  let node = children as React.ReactElement;
  if (parentMotion !== motion) {
    node = <MotionProvider motion={motion}>{children}</MotionProvider>;
  }

  return (
    <MotionCacheContext.Provider value={{ parentMotion: motion }}>
      {node}
    </MotionCacheContext.Provider>
  );
}
