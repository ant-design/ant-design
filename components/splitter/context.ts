import React from 'react';

import type { SplitterContextType } from './interface';

const SplitterContext = React.createContext<SplitterContextType>({
  basicsState: [],
  reverse: false,
  resizing: false,
});

export default SplitterContext;
