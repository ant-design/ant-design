import type { PropsWithChildren, ReactNode } from 'react';
import * as React from 'react';
import { FormProvider as RcFormProvider } from '@rc-component/form';
import type { FormProviderProps as RcFormProviderProps } from '@rc-component/form/lib/FormContext';
import type { Meta } from '@rc-component/form/lib/interface';
import { omit } from '@rc-component/util';

import type { SemanticClassNames, SemanticStyles } from '../_util/hooks/useMergeSemantic';
import type { Variant } from '../config-provider';
import type { ColProps } from '../grid/col';
import type { FormInstance, FormLayout, FormSemanticName, RequiredMark } from './Form';
import type { FeedbackIcons, ValidateStatus } from './FormItem';
import type { FormLabelAlign, NamePath } from './interface';

/** Form Context. Set top form style and pass to Form Item usage. */
export interface FormContextProps {
  classNames?: SemanticClassNames<FormSemanticName>;
  styles?: SemanticStyles<FormSemanticName>;
  layout: FormLayout;
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
  layout: 'horizontal',
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
  name?: NamePath;
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
  const formItemInputContext = React.useContext(FormItemInputContext);

  const newFormItemInputContext = React.useMemo(() => {
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

export const VariantContext = React.createContext<Variant | undefined>(undefined);
