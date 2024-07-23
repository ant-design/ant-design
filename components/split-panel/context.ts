import React from 'react';

import type { SplitPanelProps } from './SplitPanel';
import type { UseResize } from './useResize';

export interface SplitPanelContextType {
  layout: SplitPanelProps['layout'];
  resizeStart?: UseResize['resizeStart'];
}
export const SplitPanelContext = React.createContext<SplitPanelContextType>({
  layout: 'horizontal',
  resizeStart: undefined,
});
