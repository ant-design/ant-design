import * as React from 'react';
import type { ScreenSizeMap } from '../_util/responsiveObserver';

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

export interface AvatarContext {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}

const SizeContext = React.createContext<AvatarContext>({ size: 'default', shape: undefined });

export interface SizeContextProps {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size, shape }) => (
  <SizeContext.Provider
    value={React.useMemo<AvatarContext>(() => ({ size, shape }), [size, shape])}
  >
    {children}
  </SizeContext.Provider>
);

export default SizeContext;
