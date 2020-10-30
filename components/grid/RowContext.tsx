import { createContext, Context } from 'react';

export interface RowContextState {
  gutter?: [number, number];
  noWrap?: boolean;
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;
