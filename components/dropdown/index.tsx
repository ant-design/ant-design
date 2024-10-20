import InternalDropdown from './dropdown';
import DropdownButton from './dropdown-button';

export type { DropdownProps as DropDownProps, DropdownProps } from './dropdown';
export type { DropdownButtonProps, DropdownButtonType } from './dropdown-button';

const Dropdown = InternalDropdown as typeof InternalDropdown & {
  Button: typeof DropdownButton;
};
Dropdown.Button = DropdownButton;

export default Dropdown;
