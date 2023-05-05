import { createContext } from 'react';

export interface RowContextState {
  gutter?: [number, number];
  wrap?: boolean;
  supportFlexGap?: boolean;
}

const RowContext = createContext<RowContextState>({});

export default RowContext;
