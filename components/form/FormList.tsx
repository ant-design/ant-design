import * as React from 'react';
import { List } from 'rc-field-form';
import { StoreValue } from 'rc-field-form/lib/interface';
import devWarning from '../_util/devWarning';

export interface FormListFieldData {
  name: number;
  key: number;
  fieldKey: number;
}

export interface FormListOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export interface FormListProps {
  name: string | number | (string | number)[];
  children: (fields: FormListFieldData[], operation: FormListOperation) => React.ReactNode;
}

const FormList: React.FC<FormListProps> = ({ children, ...props }) => {
  devWarning(!!props.name, 'Form.List', 'Miss `name` prop.');

  return (
    <List {...props}>
      {(fields, operation) => {
        return children(
          fields.map(field => ({ ...field, fieldKey: field.key })),
          operation,
        );
      }}
    </List>
  );
};

export default FormList;
