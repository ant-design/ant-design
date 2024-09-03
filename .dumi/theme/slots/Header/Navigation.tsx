import * as React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { createStyles, css } from 'antd-style';
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
const useStyle = createStyles(({ token }) => {
  const { antCls, iconCls, fontFamily, fontSize, headerHeight, colorPrimary } = token;

  return {
    nav: css`
      height: 100%;
      font-size: ${fontSize}px;
      font-family: Avenir, ${fontFamily}, sans-serif;
      border: 0 !important;

      &${antCls}-menu-horizontal {
        border-bottom: none;

        & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
          min-width: ${40 + 12 * 2}px;
          height: ${headerHeight}px;
          padding-inline-end: ${token.paddingSM}px;
          padding-inline-start: ${token.paddingSM}px;
          line-height: ${headerHeight}px;
        }

        & ${antCls}-menu-submenu-title ${iconCls} {
          margin: 0;
        }

        & > ${antCls}-menu-item-selected {
          a {
            color: ${colorPrimary};
          }
        }
      }

      & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
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
    <Menu
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      className={styles.nav}
      disabledOverflow
      items={items}
    />
  );
};

export default HeaderNavigation;
