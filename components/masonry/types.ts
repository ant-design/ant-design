import type { ReactNode } from 'react';
import { Breakpoint } from 'antd-style';

export type Gap = number | undefined;
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;

export interface MasonryProps {
  /** Number of columns in the masonry grid layout */
  columns: number | Partial<Record<Breakpoint, number>>;

  /** Spacing between items */
  gutter?: Gutter | [Gutter, Gutter];

  /** When true, items are placed sequentially */
  sequential?: boolean;

  /** Child elements to be arranged in the masonry layout */
  children: ReactNode;

  prefixCls?: string;
}
