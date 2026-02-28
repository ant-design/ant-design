import Group from './Group';
import InternalInput from './Input';
import OTP from './OTP';
import Password from './Password';
import Search from './Search';
import TextArea from './TextArea';

export type { GroupProps } from './Group';
export type {
  InputProps,
  InputRef,
  InputSemanticClassNames,
  InputSemanticName,
  InputSemanticStyles,
} from './Input';
export type { PasswordProps } from './Password';
export type {
  InputSearchSemanticClassNames,
  InputSearchSemanticName,
  InputSearchSemanticStyles,
  SearchProps,
} from './Search';
export type {
  TextAreaProps,
  TextAreaSemanticClassNames,
  TextAreaSemanticName,
  TextAreaSemanticStyles,
} from './TextArea';

type CompoundedComponent = typeof InternalInput & {
  /** @deprecated Please use `Space.Compact` */
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
  OTP: typeof OTP;
};

const Input = InternalInput as CompoundedComponent;

Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.OTP = OTP;

export default Input;
