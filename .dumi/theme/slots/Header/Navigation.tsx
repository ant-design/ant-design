import * as React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { createStyles } from 'antd-style';
import { FormattedMessage, useFullSidebarData, useLocation } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import Link from '../../common/Link';
import * as utils from '../../utils';
import type { SharedProps } from './interface';

// ============================= Theme =============================
const locales = {
  cn: {
    design: '设计',
    development: '研发',
    components: '组件',
    resources: '资源',
    blog: '博客',
  },
  en: {
    design: 'Design',
    development: 'Development',
    components: 'Components',
    resources: 'Resources',
    blog: 'Blog',
  },
};

// ============================= Style =============================
const useStyle = createStyles(({ cssVar, token, css }) => {
  return {
    nav: css`
      height: 100%;
      font-size: ${cssVar.fontSize};
      font-family: Avenir, ${cssVar.fontFamily}, sans-serif;
      border: 0 !important;

      &${token.antCls}-menu-horizontal {
        border-bottom: none;

        & > ${token.antCls}-menu-item, & > ${token.antCls}-menu-submenu {
          min-width: ${40 + 12 * 2}px;
          height: ${token.headerHeight}px;
          padding-inline-end: ${cssVar.paddingSM};
          padding-inline-start: ${cssVar.paddingSM};
          line-height: ${token.headerHeight}px;
        }

        & ${token.antCls}-menu-submenu-title ${token.iconCls} {
          margin: 0;
        }

        & > ${token.antCls}-menu-item-selected {
          a {
            color: ${cssVar.colorPrimary};
          }
        }
      }

      & > ${token.antCls}-menu-item, & > ${token.antCls}-menu-submenu {
        text-align: center;
      }
    `,
  };
});

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  responsive: null | 'narrow' | 'crowded';
  directionText: string;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

const HeaderNavigation: React.FC<NavigationProps> = (props) => {
  const { isZhCN, isMobile, responsive, directionText, onLangChange, onDirectionChange } = props;
  const { pathname, search } = useLocation();
  const [locale] = useLocale(locales);

  const sidebarData = useFullSidebarData();
  const blogList = sidebarData['/docs/blog']?.[0]?.children || [];

  const { styles } = useStyle();

  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname.split('/').filter(Boolean).slice(0, -1).join('/');
  let activeMenuItem = module || 'home';
  if (pathname.startsWith('/changelog')) {
    activeMenuItem = 'docs/react';
  } else if (pathname.startsWith('/docs/resources')) {
    activeMenuItem = 'docs/resources';
  }

  let additional: MenuProps['items'] = [];

  const additionalItems: MenuProps['items'] = [
    {
      label: (
        <a
          href="https://github.com/ant-design/ant-design"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
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
        <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN, search)}>
          {locale.design}
        </Link>
      ),
      key: 'docs/spec',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN, search)}>
          {locale.development}
        </Link>
      ),
      key: 'docs/react',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
          {locale.components}
        </Link>
      ),
      key: 'components',
    },
    blogList.length
      ? {
          label: (
            <Link
              to={utils.getLocalizedPathname(
                blogList.sort((a, b) => (a.frontmatter?.date > b.frontmatter?.date ? -1 : 1))[0]
                  .link,
                isZhCN,
                search,
              )}
            >
              {locale.blog}
            </Link>
          ),
          key: 'docs/blog',
        }
      : null,
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN, search)}>
          {locale.resources}
        </Link>
      ),
      key: 'docs/resources',
    },
    isZhCN
      ? {
          key: 'mirror',
          label: (
            <a href="https://ant-design.antgroup.com" target="_blank" rel="noreferrer">
              国内镜像
            </a>
          ),
        }
      : null,
    ...(additional ?? []),
  ].filter(Boolean);

  return (
    // Use `transparent` style since the header already has background
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'transparent',
        },
      }}
    >
      <Menu
        mode={menuMode}
        selectedKeys={[activeMenuItem]}
        className={styles.nav}
        disabledOverflow
        items={items}
      />
    </ConfigProvider>
  );
};

export default HeaderNavigation;
