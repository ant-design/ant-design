import type * as React from 'react';
import type { CheckboxRef } from 'rc-checkbox';
import type { CheckboxProps } from './Checkbox';
import InternalCheckbox from './Checkbox';
import Group from './Group';

export type { CheckboxChangeEvent, CheckboxProps } from './Checkbox';
export type { CheckboxGroupProps, CheckboxOptionType } from './Group';
export type { CheckboxRef };

type CompoundedComponent = React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<CheckboxRef>
> & {
  Group: typeof Group;
  /** @internal */
  __ANT_CHECKBOX: boolean;
};

const Checkbox = InternalCheckbox as CompoundedComponent;

Checkbox.Group = Group;
Checkbox.__ANT_CHECKBOX = true;

if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
