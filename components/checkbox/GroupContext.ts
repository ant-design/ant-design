import React from 'react';
import type { CheckboxOptionType } from './Group';

export interface CheckboxGroupContext {
  name?: string;
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
  registerValue: (val: string) => void;
  cancelValue: (val: string) => void;
}

const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export default GroupContext;
