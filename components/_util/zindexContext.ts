import React from 'react';

export type ZIndexContext = number | undefined;

export const zIndexContext = React.createContext<ZIndexContext>(undefined);

export const ZIndexContextProvider = zIndexContext.Provider;
