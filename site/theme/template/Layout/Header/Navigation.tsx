import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import type { MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getEcosystemGroup } from './More';
import * as utils from '../../utils';
import type { SharedProps } from './interface';

import './Navigation.less';

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  isRTL: boolean;
  pathname: string;
  responsive: null | 'narrow' | 'crowded';
  location: { pathname: string; query: any };
  directionText: string;
  showTechUIButton: boolean;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

export default ({
  isZhCN,
  isMobile,
  pathname,
  responsive,
  location,
  directionText,
  showTechUIButton,
  onLangChange,
  onDirectionChange,
}: NavigationProps) => {
  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname.split('/').slice(0, -1).join('/');
  let activeMenuItem = module || 'home';
  if (location.pathname === 'changelog' || location.pathname === 'changelog-cn') {
    activeMenuItem = 'docs/react';
  } else if (location.pathname === 'docs/resources' || location.pathname === 'docs/resources-cn') {
    activeMenuItem = 'docs/resources';
  }

  let additional: MenuProps['items'];

  const additionalItems: MenuProps['items'] = [
    {
      label: (
        <a
          href="https://github.com/ant-design/ant-design"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      ),
      key: 'github',
    },
    {
      label: <FormattedMessage id="app.header.lang" />,
      onClick: onLangChange,
      key: 'switch-lang',
    },
    {
      label: directionText,
      onClick: onDirectionChange,
      key: 'switch-direction',
    },
    ...getEcosystemGroup(),
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = [
      {
        label: <MenuOutlined />,
        key: 'additional',
        children: [...additionalItems],
      },
    ];
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.spec" />
        </Link>
      ),
      key: 'docs/spec',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.documentation" />
        </Link>
      ),
      key: 'docs/react',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.components" />
        </Link>
      ),
      key: 'components',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.resource" />
        </Link>
      ),
      key: 'docs/resources',
    },
    showTechUIButton
      ? {
          label: (
            <a href="https://techui.alipay.com" target="__blank" rel="noopener noreferrer">
              TechUI
            </a>
          ),
          key: 'tech-ui',
        }
      : null,
    isZhCN &&
    typeof window !== 'undefined' &&
    window.location.host !== 'ant-design.antgroup.com' &&
    window.location.host !== 'ant-design.gitee.io'
      ? {
          label: '国内镜像',
          key: 'mirror',
          children: [
            {
              label: <a href="https://ant-design.antgroup.com">官方镜像</a>,
              icon: (
                <img
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  width={16}
                  style={{ verticalAlign: 'text-bottom' }}
                />
              ),
              key: 'antgroup',
            },
            {
              label: <a href="https://ant-design.gitee.io">Gitee 镜像</a>,
              icon: (
                <img
                  alt="gitee"
                  src="https://gw.alipayobjects.com/zos/bmw-prod/9e91e124-9bab-4113-b500-301412f6b370.svg"
                  width={16}
                  style={{ verticalAlign: 'text-bottom' }}
                />
              ),
              key: 'gitee',
            },
          ],
        }
      : null,
    ...(additional ?? []),
  ];

  return (
    <Menu
      className={classNames('menu-site')}
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      id="nav"
      disabledOverflow
      items={items}
    />
  );
};
