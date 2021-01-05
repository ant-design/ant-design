import * as React from 'react';
import { ScreenSizeMap } from '../_util/responsiveObserve';

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

const SizeContext = React.createContext<AvatarSize>('default');

export interface SizeContextProps {
  size?: AvatarSize;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => (
  <SizeContext.Consumer>
    {originSize => (
      <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
    )}
  </SizeContext.Consumer>
);

export default SizeContext;
