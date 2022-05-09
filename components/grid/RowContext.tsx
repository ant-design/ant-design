import type { Context } from 'react';
import { createContext } from 'react';

export interface RowContextState {
  gutter?: [number, number];
  wrap?: boolean;
  supportFlexGap?: boolean;
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;
