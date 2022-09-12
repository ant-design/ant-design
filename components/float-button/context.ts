import React from 'react';
import type { FloatButtonGroupProps } from './interface';

const FloatButtonGroupContext = React.createContext<FloatButtonGroupProps>({});

export const { Provider: FloatButtonGroupProvider } = FloatButtonGroupContext;

export default FloatButtonGroupContext;
