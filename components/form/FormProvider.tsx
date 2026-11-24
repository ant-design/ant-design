import * as React from 'react';
import { FormProvider as RcFormProvider } from '@rc-component/form';
import type { FormProviderProps as RcFormProviderProps } from '@rc-component/form';
import { omit } from '@rc-component/util';

/**
 * Form Provider. Kept out of `./context` on purpose: `./context` is read by every component that
 * follows a Form's variant or status (Button, Input, Select ... through `useVariant`), and importing
 * `@rc-component/form`'s entry there brought the whole Form engine and `async-validator` into any
 * bundle with a Button.
 */
export interface FormProviderProps extends Omit<RcFormProviderProps, 'validateMessages'> {
  prefixCls?: string;
}

export const FormProvider: React.FC<FormProviderProps> = (props) => {
  const providerProps = omit(props, ['prefixCls']);
  return <RcFormProvider {...providerProps} />;
};
