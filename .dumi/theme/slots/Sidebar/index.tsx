import { createStyles, useTheme } from 'antd-style';
import { useSidebarData } from 'dumi';
import React, { useContext, useState } from 'react';
import { Col, ConfigProvider, Menu, Drawer } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import useMenu from '../../../hooks/useMenu';
import SiteContext from '../SiteContext';
import useLocale from '../../../hooks/useLocale';

const useStyle = createStyles(({ token, css }) => {
  const { antCls, fontFamily, colorSplit } = token;

  return {
    asideContainer: css`
      min-height: 100%;
      padding-bottom: 48px;
      font-family: Avenir, ${fontFamily}, sans-serif;

      &${antCls}-menu-inline {
        ${antCls}-menu-submenu-title h4,
        > ${antCls}-menu-item,
        ${antCls}-menu-item a {
          overflow: hidden;
          font-size: 14px;
          text-overflow: ellipsis;
        }

        > ${antCls}-menu-item-group > ${antCls}-menu-item-group-title {
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 13px;

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
          padding-left: 40px !important;

          ${antCls}-row-rtl & {
            padding-right: 40px !important;
            padding-left: 16px !important;
          }
        }

        // Nest Category > Type > Article
        &${antCls}-menu-inline {
          ${antCls}-menu-item-group-title {
            margin-left: 4px;
            padding-left: 60px;

            ${antCls}-row-rtl & {
              padding-right: 60px;
              padding-left: 16px;
            }
          }

          ${antCls}-menu-item-group-list > ${antCls}-menu-item {
            padding-left: 80px !important;

            ${antCls}-row-rtl & {
              padding-right: 80px !important;
              padding-left: 16px !important;
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

      .chinese {
        margin-left: 6px;
        font-weight: normal;
        font-size: 12px;
        opacity: 0.67;
      }
    `,
    mainMenu: css`
      z-index: 1;

      .main-menu-inner {
        position: sticky;
        top: ${token.headerHeight + token.contentMarginTop}px;
        width: 100%;
        height: 100%;
        max-height: calc(100vh - ${token.headerHeight + token.contentMarginTop}px);
        overflow: hidden;
      }

      &:hover .main-menu-inner {
        overflow-y: auto;
      }
    `,
    drawerTrigger: css`
      position: fixed;
      top: 72px;
      left: 0;
      z-index: 10;
      padding: 2px 6px;
      color: #777;
      font-size: 12px;
      background: #fff;
      border-radius: 0 4px 4px 0;
      box-shadow: 0 1px 4px -2px #00000021, 0 2px 8px #00000014, 0 8px 16px 4px #0000000a;
      transition: all .3s;
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

  const [, lang] = useLocale();
  const isZhCN = lang === 'cn';

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
        defaultOpenKeys={sidebarData?.map(({ title }) => title).filter((item) => item) as string[]}
      />
    </ConfigProvider>
  );

  // fix: https://github.com/ant-design/ant-design/issues/44142
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return isMobile ? (
    <>
      <a onClick={showDrawer} className={styles.drawerTrigger}>
        <DoubleRightOutlined />
        {isZhCN ? '目录' : 'TOC'}
      </a>
      <Drawer key="Mobile-menu" placement="left" onClose={onClose} open={open}>
        {menuChild}
      </Drawer>
    </>
  ) : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className={styles.mainMenu}>
      <section className="main-menu-inner">{menuChild}</section>
    </Col>
  );
};

export default Sidebar;
