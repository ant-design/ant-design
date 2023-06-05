import InternalDropdown from './dropdown';
import DropdownButton from './dropdown-button';

export type {
  // typo, but we need to support it for backwards compatibility
  // https://github.com/ant-design/ant-design/pull/35161
  DropdownProps as DropDownProps,
  DropdownProps,
} from './dropdown';
export type { DropdownButtonProps, DropdownButtonType } from './dropdown-button';

const Dropdown = InternalDropdown as typeof InternalDropdown & {
  Button: typeof DropdownButton;
};
Dropdown.Button = DropdownButton;

export default Dropdown;
