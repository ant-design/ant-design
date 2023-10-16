import React from 'react';

export type ZIndexContext = {
  zIndex: number | null;
};

export const zIndexContext = React.createContext<ZIndexContext>({
  zIndex: null,
});

export const ZIndexContextProvider = zIndexContext.Provider;
