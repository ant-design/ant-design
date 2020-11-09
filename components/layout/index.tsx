import InternalLayout, { BasicProps, Content, Footer, Header } from './layout';
import Sider, { SiderProps } from './Sider';

export { BasicProps as LayoutProps } from './layout';
export { SiderProps } from './Sider';

interface LayoutType extends React.FC<BasicProps> {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: React.ComponentClass<SiderProps>;
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
