import * as React from 'react';

import type { ScreenSizeMap } from '../_util/responsiveObserver';
import type { SizeType } from '../config-provider/SizeContext';

/**
 * 'default' is deprecated and will be removed in v7, please use `medium` instead.
 */
export type AvatarSize = SizeType | 'default' | number | ScreenSizeMap;

export interface AvatarContextType {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}

const AvatarContext = React.createContext<AvatarContextType>({});

export default AvatarContext;
