import OriginalLayout from './layout';
import Sider from './Sider';
import LeftSider from './LeftSider';
import { AppLayoutContext, DefaultAppLayoutProvider } from './AppLayoutContext';

export { BasicProps as LayoutProps } from './layout';
export { SiderProps } from './Sider';
export { AppLayoutVariant }  from './AppLayoutContext';

type LayoutWithVarnish = typeof OriginalLayout & {
    AppLayoutContext: typeof AppLayoutContext;
    DefaultAppLayoutProvider: typeof DefaultAppLayoutProvider;
    LeftSider: typeof LeftSider;
};

const Layout = OriginalLayout as LayoutWithVarnish;
Layout.Sider = Sider;
Layout.LeftSider = LeftSider;
Layout.AppLayoutContext = AppLayoutContext;
Layout.DefaultAppLayoutProvider = DefaultAppLayoutProvider;

export default Layout;
