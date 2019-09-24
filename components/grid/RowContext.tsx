import createContext, { Context } from '@ant-design/create-react-context';

export interface RowContextState {
  gutters?: [number, number];
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;
