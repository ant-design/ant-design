import type { CheckboxRef } from 'rc-checkbox';

import InternalCheckbox from './Checkbox';
import Group from './Group';

export type { CheckboxChangeEvent, CheckboxProps } from './Checkbox';
export type { CheckboxGroupProps, CheckboxOptionType } from './Group';
export type { CheckboxRef };

type CompoundedComponent = typeof InternalCheckbox & {
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
