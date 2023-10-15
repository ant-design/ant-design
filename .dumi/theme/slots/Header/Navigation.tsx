import * as React from 'react';
import { FormattedMessage, useFullSidebarData, useLocation } from 'dumi';
import { MenuOutlined } from '@ant-design/icons';
import { createStyles, css } from 'antd-style';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { getEcosystemGroup } from './More';
import * as utils from '../../utils';
import type { SharedProps } from './interface';
import useLocale from '../../../hooks/useLocale';
import Link from '../../common/Link';

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
  const { antCls, iconCls, fontFamily, headerHeight, menuItemBorder, colorPrimary, colorText } =
    token;

  return {
    nav: css`
      height: 100%;
      font-size: 14px;
      font-family: Avenir, ${fontFamily}, sans-serif;
      border: 0;

      &${antCls}-menu-horizontal {
        border-bottom: none;

        & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
          min-width: ${40 + 12 * 2}px;
          height: ${headerHeight}px;
          padding-right: 12px;
          padding-left: 12px;
          line-height: ${headerHeight}px;

          &::after {
            top: 0;
            right: 12px;
            bottom: auto;
            left: 12px;
            border-width: ${menuItemBorder}px;
          }

          a {
            color: ${colorText};
          }

          a:before {
            position: absolute;
            inset: 0;
            background-color: transparent;
            content: "";
          }
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
    popoverMenuNav: css`
      ${antCls}-menu-item,
      ${antCls}-menu-submenu {
        text-align: left;
      }

      ${antCls}-menu-item-group-title {
        padding-left: 24px;
      }

      ${antCls}-menu-item-group-list {
        padding: 0 16px;
      }

      ${antCls}-menu-item,
      a {
        color: #333;
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

export default ({
  isZhCN,
  isMobile,
  responsive,
  directionText,
  onLangChange,
  onDirectionChange,
}: NavigationProps) => {
  const { pathname, search } = useLocation();
  const [locale] = useLocale(locales);

  const sidebarData = useFullSidebarData();
  const blogList = sidebarData['/docs/blog']?.[0]?.children || [];

  const { styles } = useStyle();

  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname
    .split('/')
    .filter((path) => path)
    .slice(0, -1)
    .join('/');
  let activeMenuItem = module || 'home';
  if (pathname.startsWith('/changelog')) {
    activeMenuItem = 'docs/react';
  } else if (pathname.startsWith('/docs/resources')) {
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
          label: (
            <a href="https://ant-design.antgroup.com" target="_blank" rel="noreferrer">
              国内镜像
            </a>
          ),
          key: 'mirror',
          children: [
            {
              label: (
                <a href="https://ant-design.antgroup.com" target="_blank" rel="noreferrer">
                  官方镜像
                </a>
              ),
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
              label: (
                <a href="https://ant-design.gitee.io" target="_blank" rel="noreferrer">
                  Gitee 镜像
                </a>
              ),
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
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      className={styles.nav}
      disabledOverflow
      items={items}
      style={{ borderRight: 0 }}
    />
  );
};
