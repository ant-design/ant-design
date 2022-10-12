import Group from './Group';
import InternalInput from './Input';
import Password from './Password';
import Search from './Search';
import TextArea from './TextArea';

export { GroupProps } from './Group';
export { InputProps, InputRef } from './Input';
export { PasswordProps } from './Password';
export { SearchProps } from './Search';
export { TextAreaProps } from './TextArea';

const Input = Object.assign(InternalInput, { Group, Search, TextArea, Password });

Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
export default Input;
