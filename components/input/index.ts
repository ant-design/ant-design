import type * as React from 'react';
import Group from './Group';
import type { InputProps, InputRef } from './Input';
import InternalInput from './Input';
import Password from './Password';
import Search from './Search';
import TextArea from './TextArea';

export type { GroupProps } from './Group';
export type { InputProps, InputRef } from './Input';
export type { PasswordProps } from './Password';
export type { SearchProps } from './Search';
export type { TextAreaProps } from './TextArea';

type CompoundedComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<InputRef>
> & {
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
};

const Input = InternalInput as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Input';
}

Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
export default Input;
