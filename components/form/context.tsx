import * as React from 'react';
import omit from 'rc-util/lib/omit';
import type { Meta } from 'rc-field-form/lib/interface';
import { FormProvider as RcFormProvider } from 'rc-field-form';
import type { FormProviderProps as RcFormProviderProps } from 'rc-field-form/lib/FormContext';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import type { ColProps } from '../grid/col';
import type { FormLabelAlign } from './interface';
import type { FormInstance, RequiredMark } from './Form';
import type { ValidateStatus } from './FormItem';

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
  form?: FormInstance;
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
  isFormItemInput?: boolean;
  status?: ValidateStatus;
  hasFeedback?: boolean;
  feedbackIcon?: ReactNode;
}

export const FormItemInputContext = React.createContext<FormItemStatusContextProps>({});

export const NoFormStatus: FC<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => {
  const emptyContext = useMemo(() => ({}), []);

  return (
    <FormItemInputContext.Provider value={emptyContext}>{children}</FormItemInputContext.Provider>
  );
};
