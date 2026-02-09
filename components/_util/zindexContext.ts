import React from 'react';

const ZIndexContext = React.createContext<number | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ZIndexContext.displayName = 'ZIndexContext';
}

export default ZIndexContext;
