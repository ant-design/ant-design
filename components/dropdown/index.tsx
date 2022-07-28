import Dropdown from './dropdown';

export type {
  DropdownProps,
  // typo, but we need to support it for backwards compatibility
  // https://github.com/ant-design/ant-design/pull/35161
  DropdownProps as DropDownProps,
} from './dropdown';
export type { DropdownButtonProps, DropdownButtonType } from './dropdown-button';
export default Dropdown;
