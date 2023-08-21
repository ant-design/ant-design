import * as React from 'react';
import type { ScreenSizeMap } from '../_util/responsiveObserver';

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

export interface AvatarContextType {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}

const AvatarContext = React.createContext<AvatarContextType>({});

export default AvatarContext;
