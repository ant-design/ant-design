import React, { type FC, useContext } from 'react';
import { useSidebarData } from 'dumi';
import { Affix, Col, Menu } from 'antd';
import MobileMenu from 'rc-drawer';
import SiteContext from '../SiteContext';
import useMenu from '../../../hooks/useMenu';

const Sidebar: FC = () => {
  const sidebarData = useSidebarData();
  const { isMobile } = useContext(SiteContext);

  const [menuItems, selectedKey] = useMenu();

  const menuChild = (
    <Menu
      items={menuItems}
      inlineIndent={30}
      className="aside-container menu-site"
      mode="inline"
      selectedKeys={[selectedKey]}
      defaultOpenKeys={sidebarData?.map(({ title }) => title).filter(item => item) as string[]}
    />
  );

  return isMobile ? (
    <MobileMenu key="Mobile-menu" wrapperClassName="drawer-wrapper">
      {menuChild}
    </MobileMenu>
  ) : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
      <Affix>
        <section style={{ width: '100%' }} className="main-menu-inner">
          {menuChild}
        </section>
      </Affix>
    </Col>
  );
};

export default Sidebar;
