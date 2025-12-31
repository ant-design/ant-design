import * as React from 'react';

import type { ScreenSizeMap } from '../_util/responsiveObserver';
import type { SizeType } from '../config-provider/SizeContext';

// TODO: remove 'default' in v7
export type AvatarSize = SizeType | 'default' | number | ScreenSizeMap;

export interface AvatarContextType {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}

const AvatarContext = React.createContext<AvatarContextType>({});

export default AvatarContext;
