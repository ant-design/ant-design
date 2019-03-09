import createReactContext, { Context } from 'create-react-context';
import { ColProps } from '../grid/col';

export interface FormContextProps {
  vertical: boolean;
  colon?: boolean;
  labelAlign?: string;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const FormContext: Context<FormContextProps> = createReactContext({
  labelAlign: 'right',
  vertical: false,
});
