import React, { type FC, useContext, useMemo } from 'react';
import { useSidebarData, Link } from 'dumi';
import { Affix, Col, Menu, MenuProps } from 'antd';
import MobileMenu from 'rc-drawer';
import SiteContext from '../SiteContext';
import useLocation from '../../../hooks/useLocation';

const Sidebar: FC = () => {
  // TODO: implement sidebar
  // from: https://github.com/ant-design/ant-design/blob/2a754bd5cad7fd4892a065a8e044fb402f51f426/site/theme/template/Content/MainContent.jsx#L458-L467
  //  1. Sticky
  //  2. Menu Group & Menu Item
  //  3. Collapsible (only for design doc: https://ant.design/docs/spec/introduce-cn)
  console.log('conventional sidebar data', useSidebarData());
  const sidebarData = useSidebarData();
  const { isMobile } = useContext(SiteContext);
  const { pathname } = useLocation();

  const menuItems = useMemo<MenuProps['items']>(() => {
    const items: MenuProps['items'] = [];
    for (const group of sidebarData) {
      if (group.title) {
        items.push({
          type: 'group',
          label: group.title,
          key: group.title,
          children: group.children?.map(item => ({
            label: <Link to={item.link}>{item.title}</Link>,
            key: item.link.replace(/(-cn$)/g, ''),
          })),
        });
      } else {
        items.push(
          ...group.children?.map(item => ({
            label: <Link to={item.link}>{item.title}</Link>,
            key: item.link.replace(/(-cn$)/g, ''),
          })),
        );
      }
    }
    return items;
  }, [sidebarData]);

  const selectedKeys = useMemo(() => [pathname], [pathname]);

  const menuChild = (
    <Menu
      items={menuItems}
      inlineIndent={30}
      className="aside-container"
      mode="inline"
      // openKeys={openKeys}
      selectedKeys={selectedKeys}
      // onOpenChange={this.handleMenuOpenChange}
    />
  );

  return isMobile ? (
    <MobileMenu key="Mobile-menu" wrapperClassName="drawer-wrapper">
      {menuChild}
    </MobileMenu>
  ) : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
      <Affix>
        <section style={{ width: '100%' }}>{menuChild}</section>
      </Affix>
    </Col>
  );
};

export default Sidebar;
