import * as React from 'react';
import InternalInput, { InputProps, InputRef } from './Input';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Password from './Password';

export { InputProps, InputRef } from './Input';
export { GroupProps } from './Group';
export { SearchProps } from './Search';
export { TextAreaProps } from './TextArea';
export { PasswordProps } from './Password';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
}

const Input = InternalInput as CompoundedComponent;

Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
export default Input;
