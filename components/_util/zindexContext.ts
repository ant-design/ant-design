import React from 'react';

const zIndexContext = React.createContext<number | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  zIndexContext.displayName = 'zIndexContext';
}

export default zIndexContext;
