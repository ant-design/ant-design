import { createContext } from 'react';
import type { ThemeConfig } from 'antd/es/config-provider/context';

export type ThemeContextProps = {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
};

const ThemeContext = createContext<ThemeContextProps>({ theme: {}, setTheme: () => {} });

export default ThemeContext;
