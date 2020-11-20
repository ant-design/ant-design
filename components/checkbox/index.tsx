import InternalCheckbox, { CheckboxProps } from './Checkbox';
import Group from './Group';

export { CheckboxProps, CheckboxChangeEvent } from './Checkbox';
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
