import React from 'react';

export interface SpaceContextType {
  latestIndex: number;
}

export const SpaceContext = React.createContext<SpaceContextType>({
  latestIndex: 0,
});

export const SpaceContextProvider = SpaceContext.Provider;
