import React from 'react';

import type { CheckboxOptionType } from './Group';

export interface CheckboxGroupContext<T = any> {
  name?: string;
  toggleOption?: (option: CheckboxOptionType<T>) => void;
  value?: any;
  disabled?: boolean;
  registerValue: (val: T) => void;
  cancelValue: (val: T) => void;
}

const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export default GroupContext;
