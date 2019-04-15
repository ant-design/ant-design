import createReactContext, { Context } from 'create-react-context';
import { ColProps } from '../grid/col';
import { LabelAlign } from './FormItem';

export interface FormContextProps {
  vertical: boolean;
  colon?: boolean;
  labelAlign?: LabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const FormContext: Context<FormContextProps> = createReactContext({
  labelAlign: 'right',
  vertical: false,
});
