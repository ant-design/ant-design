import React from 'react';

export interface SpaceContextType {
  latestIndex: number;
  horizontalSize: number;
  verticalSize: number;
  supportFlexGap: boolean;
}

export const SpaceContext = React.createContext<SpaceContextType>({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});

export const SpaceContextProvider = SpaceContext.Provider;
