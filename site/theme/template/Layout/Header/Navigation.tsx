import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import { Menu } from 'antd';
import * as utils from '../../utils';
import { SharedProps } from './interface';

import './Navigation.less';

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  isHome: boolean;
  pathname: string;
}

export default ({ isZhCN, isMobile, isHome, pathname }: NavigationProps) => {
  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname
    .split('/')
    .slice(0, -1)
    .join('/');
  let activeMenuItem = module || 'home';
  if (location.pathname === 'changelog' || location.pathname === 'changelog-cn') {
    activeMenuItem = 'docs/react';
  } else if (location.pathname === 'docs/resources' || location.pathname === 'docs/resources-cn') {
    activeMenuItem = 'docs/resources';
  }

  return (
    <Menu className="menu-site" mode={menuMode} selectedKeys={[activeMenuItem]} id="nav">
      {isHome ? null : (
        <Menu.Item key="home" className="hide-in-home-page">
          <Link to={utils.getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="docs/spec">
        <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
          <FormattedMessage id="app.header.menu.spec" />
        </Link>
      </Menu.Item>
      <Menu.Item key="docs/react">
        <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN)}>
          <FormattedMessage id="app.header.menu.documentation" />
        </Link>
      </Menu.Item>
      <Menu.Item key="components">
        <Link to={utils.getLocalizedPathname('/components/button/', isZhCN)}>
          <FormattedMessage id="app.header.menu.components" />
        </Link>
      </Menu.Item>
      <Menu.Item key="docs/resources">
        <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN)}>
          <FormattedMessage id="app.header.menu.resource" />
        </Link>
      </Menu.Item>
    </Menu>
  );
};
