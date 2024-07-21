import React from 'react';

import type { SplitPanelProps } from './SplitPanel';
import type { StartInfo } from './useResize';

export interface SplitPanelContextType {
  layout: SplitPanelProps['layout'];
  panelInitSize: number;
  resizing: boolean;
  startInfo: React.MutableRefObject<StartInfo>;
  setResizing?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SplitPanelContext = React.createContext<SplitPanelContextType>({
  layout: 'horizontal',
  panelInitSize: 0,
  resizing: false,
  startInfo: { current: { x: 0, y: 0, splitPanelBar: null } },
  setResizing: undefined,
});
