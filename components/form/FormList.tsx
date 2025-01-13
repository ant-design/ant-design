import * as React from 'react';
import { List } from 'rc-field-form';
import type { StoreValue, ValidatorRule } from 'rc-field-form/lib/interface';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { FormItemPrefixContext } from './context';

export interface FormListFieldData {
  name: number;
  key: number;
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

const FormList: React.FC<FormListProps> = ({
  prefixCls: customizePrefixCls,
  children,
  ...props
}) => {
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

export default FormList;
