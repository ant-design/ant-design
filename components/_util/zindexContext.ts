import React from 'react';

export type ZIndexContext = {
  zIndex: number;
};

export const zIndexContext = React.createContext<ZIndexContext>({
  zIndex: 0,
});

export const ZIndexContextProvider = zIndexContext.Provider;
