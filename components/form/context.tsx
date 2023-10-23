import type { PropsWithChildren, ReactNode } from 'react';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { FormProvider as RcFormProvider } from 'rc-field-form';
import type { FormProviderProps as RcFormProviderProps } from 'rc-field-form/lib/FormContext';
import type { Meta } from 'rc-field-form/lib/interface';
import omit from 'rc-util/lib/omit';

import type { ColProps } from '../grid/col';
import type { FormInstance, RequiredMark } from './Form';
import type { ValidateStatus, FeedbackIcons } from './FormItem';
import type { FormLabelAlign } from './interface';

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
  feedbackIcons?: FeedbackIcons;
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

export const FormProvider: React.FC<FormProviderProps> = (props) => {
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
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
  hasFeedback?: boolean;
  feedbackIcon?: ReactNode;
}

export const FormItemInputContext = React.createContext<FormItemStatusContextProps>({});

if (process.env.NODE_ENV !== 'production') {
  FormItemInputContext.displayName = 'FormItemInputContext';
}

export type NoFormStyleProps = PropsWithChildren<{
  status?: boolean;
  override?: boolean;
}>;

export const NoFormStyle: React.FC<NoFormStyleProps> = ({ children, status, override }) => {
  const formItemInputContext = useContext(FormItemInputContext);

  const newFormItemInputContext = useMemo(() => {
    const newContext = { ...formItemInputContext };
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);

  return (
    <FormItemInputContext.Provider value={newFormItemInputContext}>
      {children}
    </FormItemInputContext.Provider>
  );
};
