import * as React from 'react';

import type { RadioGroupContextProps, RadioOptionTypeContextProps } from './interface';

const RadioGroupContext = React.createContext<RadioGroupContextProps | undefined>(undefined);

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;

export const RadioOptionTypeContext = React.createContext<RadioOptionTypeContextProps | undefined>(
  undefined,
);

export const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
