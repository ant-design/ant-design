import InternalCheckbox from './Checkbox';
import Group from './Group';

export { CheckboxChangeEvent, CheckboxProps } from './Checkbox';
export { CheckboxGroupProps, CheckboxOptionType } from './Group';

const Checkbox = Object.assign(InternalCheckbox, {
  Group,
  /** @internal */
  __ANT_CHECKBOX: true,
});

export default Checkbox;
