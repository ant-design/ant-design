import React from 'react';

import type { SplitPanelProps } from './SplitPanel';

export interface SplitPanelContextType {
  layout: SplitPanelProps['layout'];
  defaultSize?: number;
  resizeStart?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const SplitPanelContext = React.createContext<SplitPanelContextType>({
  layout: 'horizontal',
  defaultSize: 0,
  resizeStart: undefined,
});
