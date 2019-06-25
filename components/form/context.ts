import * as React from 'react';
import { ColProps } from '../grid/col';
import { FormLabelAlign } from './interface';

export interface FormContextProps {
  vertical: boolean;
  name?: string;
  colon?: boolean;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const FormContext = React.createContext<FormContextProps>({
  labelAlign: 'right',
  vertical: false,
});

export interface FormItemContextProps {
  updateItemErrors: (name: string, errors: string[]) => void;
}

export const FormItemContext = React.createContext<FormItemContextProps>({
  updateItemErrors: () => {},
});
