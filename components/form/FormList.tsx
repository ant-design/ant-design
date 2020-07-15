import * as React from 'react';
import { List } from 'rc-field-form';
import { StoreValue } from 'rc-field-form/lib/interface';
import devWarning from '../_util/devWarning';

interface FieldData {
  name: number;
  key: number;
  fieldKey: number;
}

interface Operation {
  add: (defaultValue?: StoreValue) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

interface FormListProps {
  name: string | number | (string | number)[];
  children: (fields: FieldData[], operation: Operation) => React.ReactNode;
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
