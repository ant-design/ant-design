import React, { useEffect } from 'react';
import MobileMenu from '@rc-component/drawer';
import { Col, ConfigProvider, Menu } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { useSidebarData } from 'dumi';

import useMenu from '../../../hooks/useMenu';
import SiteContext from '../SiteContext';

const useStyle = createStyles(({ cssVar, token, css }) => {
  return {
    asideContainer: css`
      min-height: 100%;
      padding-top: 0;
      padding-bottom: ${cssVar.marginXXL} !important;
      font-family: Avenir, ${cssVar.fontFamily}, sans-serif;
      padding-inline: ${cssVar.paddingXXS};

      &${token.antCls}-menu-inline {
        ${token.antCls}-menu-submenu-title h4,
        > ${token.antCls}-menu-item,
        ${token.antCls}-menu-item a {
          overflow: hidden;
          font-size: ${cssVar.fontSize};
          text-overflow: ellipsis;
        }

        > ${token.antCls}-menu-item-group > ${token.antCls}-menu-item-group-title {
          margin-top: ${cssVar.margin};
          margin-bottom: ${cssVar.margin};
          font-size: ${cssVar.fontSize};

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${cssVar.colorSplit};
            content: '';
          }
        }

        > ${token.antCls}-menu-item,
          > ${token.antCls}-menu-submenu
          > ${token.antCls}-menu-submenu-title,
          > ${token.antCls}-menu-item-group
          > ${token.antCls}-menu-item-group-title,
          > ${token.antCls}-menu-item-group
          > ${token.antCls}-menu-item-group-list
          > ${token.antCls}-menu-item,
          &${token.antCls}-menu-inline
          > ${token.antCls}-menu-item-group
          > ${token.antCls}-menu-item-group-list
          > ${token.antCls}-menu-item {
          padding-inline: 36px 12px !important;
        }

        // Nest Category > Type > Article
        &${token.antCls}-menu-inline {
          ${token.antCls}-menu-item-group-title {
            margin-inline-start: ${cssVar.marginXXS};
            padding-inline-start: 60px;

            ${token.antCls}-row-rtl & {
              padding-inline-end: 60px;
              padding-inline-start: ${cssVar.padding};
            }
          }

          ${token.antCls}-menu-item-group-list > ${token.antCls}-menu-item {
            padding-inline-start: 80px !important;

            ${token.antCls}-row-rtl & {
              padding-inline-end: 80px !important;
              padding-inline-start: ${cssVar.padding} !important;
            }
          }
        }

        ${token.antCls}-menu-item-group:first-child {
          ${token.antCls}-menu-item-group-title {
            margin-top: 0;
          }
        }
      }

      a[disabled] {
        color: #ccc;
      }
    `,
    mainMenu: css`
      z-index: 1;
      position: sticky;
      top: ${token.headerHeight}px;
      width: 100%;
      max-height: calc(100vh - ${token.headerHeight}px);
      overflow: hidden;
      scrollbar-width: thin;
      scrollbar-gutter: stable;

      &:hover {
        overflow-y: auto;
      }
    `,
  };
});

const Sidebar: React.FC = () => {
  const sidebarData = useSidebarData();
  const { isMobile, isDark } = React.use(SiteContext);
  const { styles } = useStyle();

  const [menuItems, selectedKey] = useMenu();
  const { colorBgContainer } = useTheme();

  const defaultOpenKeys = sidebarData?.map<string>(({ title }) => title!).filter(Boolean) || [];
  const [openKeys, setOpenKeys] = React.useState<string[]>(defaultOpenKeys);

  useEffect(() => {
    if (openKeys.join(',') === defaultOpenKeys.join(',')) {
      return;
    }
    setOpenKeys(defaultOpenKeys);
  }, [defaultOpenKeys.join(',')]);

  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  const menuChild = (
    <ConfigProvider
      theme={{ components: { Menu: { itemBg: colorBgContainer, darkItemBg: colorBgContainer } } }}
    >
      <Menu
        items={menuItems}
        inlineIndent={30}
        className={styles.asideContainer}
        mode="inline"
        theme={isDark ? 'dark' : 'light'}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </ConfigProvider>
  );

  return isMobile ? (
    <MobileMenu key="Mobile-menu">{menuChild}</MobileMenu>
  ) : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className={styles.mainMenu}>
      {menuChild}
    </Col>
  );
};

export default Sidebar;
