import type * as React from 'react';
import type { CheckboxProps } from './Checkbox';
import InternalCheckbox from './Checkbox';
import Group from './Group';

export { CheckboxChangeEvent, CheckboxProps } from './Checkbox';
export { CheckboxGroupProps, CheckboxOptionType } from './Group';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group;
  __ANT_CHECKBOX: boolean;
}

const Checkbox = InternalCheckbox as CompoundedComponent;

Checkbox.Group = Group;
Checkbox.__ANT_CHECKBOX = true;

export default Checkbox;
