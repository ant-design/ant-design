import React, { type FC, useContext, useMemo } from 'react';
import { useSidebarData, Link } from 'dumi';
import { Affix, Col, Menu, MenuProps } from 'antd';
import MobileMenu from 'rc-drawer';
import SiteContext from '../SiteContext';
import useLocation from '../../../hooks/useLocation';

const Sidebar: FC = () => {
  const sidebarData = useSidebarData();
  const { isMobile } = useContext(SiteContext);
  const { pathname } = useLocation();

  const menuItems = useMemo<MenuProps['items']>(() => {
    // 将设计文档未分类的放在最后
    if (pathname.startsWith('/docs/spec')) {
      const notGrouped = sidebarData.splice(0 ,1);
      sidebarData.push(...notGrouped);
    }

    const items = sidebarData?.reduce<Exclude<MenuProps['items'], undefined>>((result, group) => {
      if (group.title) {
        // 设计文档特殊处理二级分组
        if (pathname.startsWith('/docs/spec')) {
          const childrenGroup = group.children.reduce<Record<string, ReturnType<typeof useSidebarData>[number]['children']>>((childrenResult, child) => {
            const type = (child.frontmatter as any).type ?? 'default';
            if (!childrenResult[type]) {
              childrenResult[type] = [];
            }
            childrenResult[type].push(child);
            return childrenResult;
          }, {});
          const childItems = [];
          childItems.push(...childrenGroup.default.map(item => ({
            label: <Link to={item.link}>{item.title}</Link>,
            key: item.link.replace(/(-cn$)/g, ''),
          })));
          Object.entries(childrenGroup).forEach(([type, children]) => {
            if (type !== 'default') {
              childItems.push({
                type: 'group',
                label: type,
                key: type,
                children: children?.map((item) => ({
                  label: <Link to={item.link}>{item.title}</Link>,
                  key: item.link.replace(/(-cn$)/g, ''),
                })),
              });
            }
          })
          result.push({
            label: group.title,
            key: group.title,
            children: childItems,
          });
        } else {
          result.push({
            type: 'group',
            label: group.title,
            key: group.title,
            children: group.children?.map(item => ({
              label: <Link to={item.link}>{item.title}</Link>,
              key: item.link.replace(/(-cn$)/g, ''),
            })),
          });
        }
      } else {
        result.push(...group.children?.map(item => ({
          label: <Link to={item.link}>{item.title}</Link>,
          key: item.link.replace(/(-cn$)/g, ''),
        })));
      }
      return result;
    }, []) ?? [];



    return items;
  }, [sidebarData]);

  const selectedKeys = useMemo(() => [pathname], [pathname]);

  const menuChild = (
    <Menu
      items={menuItems}
      inlineIndent={30}
      className="aside-container menu-site"
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={sidebarData.map(({ title }) => title).filter(item => item) as string[]}
    />
  );

  return isMobile ? (
    <MobileMenu key="Mobile-menu" wrapperClassName="drawer-wrapper">
      {menuChild}
    </MobileMenu>
  ) : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
      <Affix>
        <section style={{ width: '100%' }} className="main-menu-inner">{menuChild}</section>
      </Affix>
    </Col>
  );
};

export default Sidebar;
