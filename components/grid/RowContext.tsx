import { createContext, Context } from 'react';
import { BreakpointMap } from '../_util/responsiveObserve';

export interface RowContextState {
  screens?: BreakpointMap;
  gutter?: [number, number];
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;
