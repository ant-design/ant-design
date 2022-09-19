import React from 'react';
import type { FloatButtonShape } from './interface';

const FloatButtonGroupContext = React.createContext<FloatButtonShape | null>(null);

export const { Provider: FloatButtonGroupProvider } = FloatButtonGroupContext;

export default FloatButtonGroupContext;
