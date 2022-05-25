import type { Context } from 'react';
import { createContext } from 'react';

export interface RowContextState {
  wrap?: boolean;
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;
