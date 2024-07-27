import React from 'react';

import type { SplitterProps } from './Splitter';
import type { UseResize } from './useResize';

export interface SplitterContextType {
  layout: SplitterProps['layout'];
  resizing: UseResize['resizing'];
  basicsState?: number[];
  resizeStart?: UseResize['resizeStart'];
  setSize?: UseResize['setSize'];
}
export const SplitterContext = React.createContext<SplitterContextType>({
  layout: 'horizontal',
  resizing: false,
  basicsState: [],
  resizeStart: undefined,
  setSize: undefined,
});
