import InternalLayout, { BasicProps, Content, Footer, Header } from './layout';
import Sider from './Sider';

export { BasicProps as LayoutProps } from './layout';
export { SiderProps } from './Sider';

export interface LayoutInterface extends React.FC<BasicProps> {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
}

const Layout = InternalLayout as LayoutInterface;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
