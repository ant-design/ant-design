import * as React from 'react';
import type { RadioGroupContextProps, RadioOptionTypeContextProps } from './interface';

const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;

export const RadioOptionTypeContext = React.createContext<RadioOptionTypeContextProps | null>(null);
export const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
