import createContext, { Context } from 'create-react-context';

export interface RowContextState {
  gutter?: number;
}

const RowContext: Context<RowContextState> =  createContext({});

export default RowContext;
