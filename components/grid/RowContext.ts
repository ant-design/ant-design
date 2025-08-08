import { createContext } from 'react';

export interface RowContextState {
  gutter?: [number | string, number | string];
  wrap?: boolean;
}

const RowContext = createContext<RowContextState>({});

export default RowContext;
