import React from 'react';

import type { SplitterProps } from './Splitter';
import type { UseResize } from './useResize';

export interface SplitterContextType {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  panelsRef?: React.MutableRefObject<(HTMLDivElement | null)[]>;
  gutterCount: number;

  isRTL: boolean;
  layout: SplitterProps['layout'];
  resizing: boolean;
  basicsState: number[];

  setSize?: UseResize['setSize'];
  setOffset?: UseResize['setOffset'];
  setResizing?: React.Dispatch<React.SetStateAction<boolean>>;
  onResizeStart?: SplitterProps['onResizeStart'];
  onResizeEnd?: SplitterProps['onResizeEnd'];
}
export const SplitterContext = React.createContext<SplitterContextType>({
  gutterCount: 0,

  isRTL: false,
  layout: 'horizontal',
  resizing: false,
  basicsState: [],
});
