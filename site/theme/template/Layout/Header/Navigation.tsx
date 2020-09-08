import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getEcosystemGroup } from './More';
import * as utils from '../../utils';
import { SharedProps } from './interface';

import './Navigation.less';

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  isRTL: boolean;
  pathname: string;
  responsive: null | 'narrow' | 'crowded';
  location: { pathname: string; query: any };
  directionText: string;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

export default ({
  isZhCN,
  isRTL,
  isMobile,
  pathname,
  responsive,
  location,
  directionText,
  onLangChange,
  onDirectionChange,
}: NavigationProps) => {
  const [isGitee, setIsGitee] = React.useState(false);
  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname.split('/').slice(0, -1).join('/');
  let activeMenuItem = module || 'home';
  if (location.pathname === 'changelog' || location.pathname === 'changelog-cn') {
    activeMenuItem = 'docs/react';
  } else if (location.pathname === 'docs/resources' || location.pathname === 'docs/resources-cn') {
    activeMenuItem = 'docs/resources';
  }

  let additional: React.ReactNode = null;
  const additionalItems = [
    <Menu.Item key="github">
      <a href="https://github.com/ant-design/ant-design" target="_blank" rel="noopener noreferrer">
        Github
      </a>
    </Menu.Item>,
    <Menu.Item key="switch-lang" onClick={onLangChange}>
      <FormattedMessage id="app.header.lang" />
    </Menu.Item>,
    <Menu.Item key="switch-direction" onClick={onDirectionChange}>
      {directionText}
    </Menu.Item>,
    getEcosystemGroup({ isZhCN, isRTL }),
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = (
      <Menu.SubMenu key="additional" title={<UnorderedListOutlined />}>
        {additionalItems}
      </Menu.SubMenu>
    );
  }

  React.useEffect(() => {
    setIsGitee(document.location.host.indexOf('gitee') !== -1);
  }, []);

  return (
    <Menu
      className={classNames('menu-site')}
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      id="nav"
    >
      <Menu.Item key="docs/spec">
        <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.spec" />
        </Link>
      </Menu.Item>
      <Menu.Item key="docs/react">
        <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.documentation" />
        </Link>
      </Menu.Item>
      <Menu.Item key="components">
        <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.components" />
        </Link>
      </Menu.Item>
      <Menu.Item key="docs/resources">
        <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.resource" />
        </Link>
      </Menu.Item>
      {isZhCN && !isGitee && (
        <Menu.Item key="mirror">
          <a href="https://ant-design.gitee.io">国内镜像</a>
        </Menu.Item>
      )}
      {additional}
    </Menu>
  );
};
