import * as React from 'react';
import type { ScreenSizeMap } from '../_util/responsiveObserver';

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

const SizeContext = React.createContext<AvatarSize>('default');

export interface SizeContextProps {
  size?: AvatarSize;
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => {
  const originSize = React.useContext<AvatarSize>(SizeContext);
  return <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>;
};

export default SizeContext;
