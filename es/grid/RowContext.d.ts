import { Context } from 'create-react-context';
export interface RowContextState {
    gutter?: number;
}
declare const RowContext: Context<RowContextState>;
export default RowContext;
