import * as React from 'react';
import { FormProvider as RcFormProvider } from '@rc-component/form';
import type { FormProviderProps as RcFormProviderProps } from '@rc-component/form';
import { omit } from '@rc-component/util';

// Kept out of `./context` so components that only read form contexts
// don't import the whole `@rc-component/form` through it.

/** Form Provider */
export interface FormProviderProps extends Omit<RcFormProviderProps, 'validateMessages'> {
  prefixCls?: string;
}

export const FormProvider: React.FC<FormProviderProps> = (props) => {
  const providerProps = omit(props, ['prefixCls']);
  return <RcFormProvider {...providerProps} />;
};
