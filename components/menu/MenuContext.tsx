import createContext from '@ant-design/create-react-context';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  inlineCollapsed: boolean;
  antdMenuTheme?: MenuTheme;
}

const MenuContext = createContext<MenuContextProps>({
  inlineCollapsed: false,
});

export default MenuContext;
