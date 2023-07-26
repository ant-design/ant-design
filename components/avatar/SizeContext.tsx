import * as React from 'react';
import type { ScreenSizeMap } from '../_util/responsiveObserver';

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

export interface AvatarContextType {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}

const AvatarContext = React.createContext<AvatarContextType>({ size: 'default', shape: undefined });

export interface SizeContextProps {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  children?: React.ReactNode;
}

export const AvatarContextProvider: React.FC<SizeContextProps> = ({ children, size, shape }) => (
  <AvatarContext.Provider
    value={React.useMemo<AvatarContextType>(() => ({ size, shape }), [size, shape])}
  >
    {children}
  </AvatarContext.Provider>
);

export default AvatarContext;
