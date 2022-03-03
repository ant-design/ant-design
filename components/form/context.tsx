import * as React from 'react';
import omit from 'rc-util/lib/omit';
import { Meta } from 'rc-field-form/lib/interface';
import { FormProvider as RcFormProvider } from 'rc-field-form';
import { FormProviderProps as RcFormProviderProps } from 'rc-field-form/lib/FormContext';
import { ColProps } from '../grid/col';
import { FormLabelAlign } from './interface';
import { RequiredMark } from './Form';
import { ValidateStatus } from './FormItem';

/** Form Context. Set top form style and pass to Form Item usage. */
export interface FormContextProps {
  vertical: boolean;
  name?: string;
  colon?: boolean;
  labelAlign?: FormLabelAlign;
  labelWrap?: boolean;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  requiredMark?: RequiredMark;
  itemRef: (name: (string | number)[]) => (node: React.ReactElement) => void;
}

export const FormContext = React.createContext<FormContextProps>({
  labelAlign: 'right',
  vertical: false,
  itemRef: (() => {}) as any,
});

/** `noStyle` Form Item Context. Used for error collection */
export type ReportMetaChange = (meta: Meta, uniqueKeys: React.Key[]) => void;
export const NoStyleItemContext = React.createContext<ReportMetaChange | null>(null);

/** Form Provider */
export interface FormProviderProps extends Omit<RcFormProviderProps, 'validateMessages'> {
  prefixCls?: string;
}

export const FormProvider: React.FC<FormProviderProps> = props => {
  const providerProps = omit(props, ['prefixCls']);
  return <RcFormProvider {...providerProps} />;
};

/** Used for ErrorList only */
export interface FormItemPrefixContextProps {
  prefixCls: string;
  status?: ValidateStatus;
}

export const FormItemPrefixContext = React.createContext<FormItemPrefixContextProps>({
  prefixCls: '',
});

export interface FormItemStatusContextProps {
  status?: ValidateStatus;
  hasFeedback?: boolean;
}

export const FormItemStatusContext = React.createContext<FormItemStatusContextProps>({});
