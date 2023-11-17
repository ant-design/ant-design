import InternalLayout, { Content, Footer, Header } from './layout';
import Sider, { SiderContext } from './Sider';

export type { BasicProps as LayoutProps } from './layout';
export type { SiderProps } from './Sider';

type InternalLayoutType = typeof InternalLayout;

type CompoundedComponent = InternalLayoutType & {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
  /** @private Internal Context. Do not use in your production. */
  _InternalSiderContext: typeof SiderContext;
};

const Layout = InternalLayout as CompoundedComponent;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
Layout._InternalSiderContext = SiderContext;

export default Layout;
