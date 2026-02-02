import InternalDropdown from './dropdown';
import DropdownButton from './dropdown-button';

export type {
  DropdownProps as DropDownProps,
  DropdownProps,
  DropdownSemanticAllType,
} from './dropdown';
export type { DropdownButtonProps, DropdownButtonType } from './dropdown-button';

const Dropdown = InternalDropdown as typeof InternalDropdown & {
  Button: typeof DropdownButton;
};

/** @deprecated Please use Space.Compact + Dropdown + Button instead */
Dropdown.Button = DropdownButton;

export default Dropdown;
