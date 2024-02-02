import * as React from 'react';
import { List } from 'rc-field-form';
import type { StoreValue, ValidatorRule } from 'rc-field-form/lib/interface';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { FormItemPrefixContext } from './context';
import useFormListPrefixName from './hooks/useFormListPrefixName';

export interface FormListFieldData {
  name: number;
  key: number;
  /** @deprecated No need anymore Use key instead */
  fieldKey?: number;
}

export interface FormListOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export interface FormListProps {
  prefixCls?: string;
  name: string | number | (string | number)[];
  rules?: ValidatorRule[];
  initialValue?: any[];
  children: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] },
  ) => React.ReactNode;
}

const InternalFormList = ({ prefixCls: customizePrefixCls, children, ...props }: FormListProps) => {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Form.List');

    warning(
      typeof props.name === 'number' ||
        (Array.isArray(props.name) ? !!props.name.length : !!props.name),
      'usage',
      'Miss `name` prop.',
    );
  }

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('form', customizePrefixCls);
  const contextValue = React.useMemo(
    () => ({
      prefixCls,
      status: 'error' as const,
    }),
    [prefixCls],
  );

  return (
    <List {...props}>
      {(fields, operation, meta) => (
        <FormItemPrefixContext.Provider value={contextValue}>
          {children(
            fields.map((field) => ({ ...field, fieldKey: field.key })),
            operation,
            {
              errors: meta.errors,
              warnings: meta.warnings,
            },
          )}
        </FormItemPrefixContext.Provider>
      )}
    </List>
  );
};

type InternalFormListType = typeof InternalFormList;

type CompoundedComponent = InternalFormListType & {
  usePrefixName: typeof useFormListPrefixName;
};

const FormList = InternalFormList as CompoundedComponent;
FormList.usePrefixName = useFormListPrefixName;

export default FormList;
