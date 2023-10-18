import React from 'react';

export type ZIndexContext = number | null;

export const zIndexContext = React.createContext<ZIndexContext>(null);

export const ZIndexContextProvider = zIndexContext.Provider;
