import React from 'react';

import type { CheckboxSemanticType } from './Checkbox';
import type { CheckboxOptionType } from './Group';

export interface CheckboxGroupContext<T = any> {
  name?: string;
  toggleOption?: (option: CheckboxOptionType<T>) => void;
  value?: any;
  disabled?: boolean;
  classNames?: CheckboxSemanticType['classNames'];
  styles?: CheckboxSemanticType['styles'];
  registerValue: (val: T) => void;
  cancelValue: (val: T) => void;
}

const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export default GroupContext;
