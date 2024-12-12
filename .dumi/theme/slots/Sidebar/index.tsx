import React, { useContext } from 'react';
import { Col, ConfigProvider, Menu } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { useSidebarData } from 'dumi';
import MobileMenu from 'rc-drawer';

import useMenu from '../../../hooks/useMenu';
import SiteContext from '../SiteContext';

const useStyle = createStyles(({ token, css }) => {
  const { antCls, fontFamily, colorSplit, marginXXL, paddingXXS } = token;

  return {
    asideContainer: css`
      min-height: 100%;
      padding-bottom: ${marginXXL}px !important;
      font-family: Avenir, ${fontFamily}, sans-serif;
      padding: 0 ${paddingXXS}px;

      &${antCls}-menu-inline {
        ${antCls}-menu-submenu-title h4,
        > ${antCls}-menu-item,
        ${antCls}-menu-item a {
          overflow: hidden;
          font-size: ${token.fontSize}px;
          text-overflow: ellipsis;
        }

        > ${antCls}-menu-item-group > ${antCls}-menu-item-group-title {
          margin-top: ${token.margin}px;
          margin-bottom: ${token.margin}px;
          font-size: ${token.fontSize}px;

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${colorSplit};
            content: '';
          }
        }

        > ${antCls}-menu-item,
          > ${antCls}-menu-submenu
          > ${antCls}-menu-submenu-title,
          > ${antCls}-menu-item-group
          > ${antCls}-menu-item-group-title,
          > ${antCls}-menu-item-group
          > ${antCls}-menu-item-group-list
          > ${antCls}-menu-item,
          &${antCls}-menu-inline
          > ${antCls}-menu-item-group
          > ${antCls}-menu-item-group-list
          > ${antCls}-menu-item {
          padding-inline: 36px 12px !important;
        }

        // Nest Category > Type > Article
        &${antCls}-menu-inline {
          ${antCls}-menu-item-group-title {
            margin-inline-start: ${token.marginXXS}px;
            padding-inline-start: 60px;

            ${antCls}-row-rtl & {
              padding-inline-end: 60px;
              padding-inline-start: ${token.padding}px;
            }
          }

          ${antCls}-menu-item-group-list > ${antCls}-menu-item {
            padding-inline-start: 80px !important;

            ${antCls}-row-rtl & {
              padding-inline-end: 80px !important;
              padding-inline-start: ${token.padding}px !important;
            }
          }
        }

        ${antCls}-menu-item-group:first-child {
          ${antCls}-menu-item-group-title {
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
      top: ${token.headerHeight + token.contentMarginTop}px;
      width: 100%;
      max-height: calc(100vh - ${token.headerHeight + token.contentMarginTop}px);
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
  const { isMobile, theme } = useContext(SiteContext);
  const { styles } = useStyle();

  const [menuItems, selectedKey] = useMenu();
  const isDark = theme.includes('dark');
  const { colorBgContainer } = useTheme();

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
        defaultOpenKeys={sidebarData?.map<string>(({ title }) => title!).filter(Boolean)}
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
