import React from 'react';

import type { SplitterContextType } from './interface';

const SplitterContext = React.createContext<SplitterContextType>({
  isRTL: false,
  layout: 'horizontal',
  resizing: false,
  basicsState: [],
});

export default SplitterContext;
