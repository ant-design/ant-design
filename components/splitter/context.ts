import React from 'react';

import type { SplitterProps } from './Splitter';
import type { UseResize } from './useResize';

export interface SplitterContextType {
  layout: SplitterProps['layout'];
  resizeStart?: UseResize['resizeStart'];
}
export const SplitterContext = React.createContext<SplitterContextType>({
  layout: 'horizontal',
  resizeStart: undefined,
});
