import React from 'react';
import type { FloatButtonShape } from './interface';

const FloatButtonGroupContext = React.createContext<FloatButtonShape>('circle');

export const { Provider: FloatButtonGroupProvider } = FloatButtonGroupContext;

export default FloatButtonGroupContext;
