import React from 'react';

import type { SizeType } from '../config-provider/SizeContext';

export interface SpaceContextType {
  latestIndex: number;
}

export const SpaceContext = React.createContext<SpaceContextType>({
  latestIndex: 0,
});

export const SpaceContextProvider = SpaceContext.Provider;

export interface SpaceCompactItemContextType {
  compactSize?: SizeType;
  compactDirection?: 'horizontal' | 'vertical';
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType | null>(
  null,
);
