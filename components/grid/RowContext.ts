import { createContext } from 'react';

export type GutterUnit = number | string;

export type RowContextGutter = readonly [GutterUnit, GutterUnit];
export interface RowContextState {
  gutter?: RowContextGutter;
  wrap?: boolean;
}

const RowContext = createContext<RowContextState>({});

export default RowContext;
