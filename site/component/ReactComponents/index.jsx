import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';
import * as utils from '../utils';
import componentsList from '../../../_site/data/components-list';

const componentMenuItems = [];
['基本', '表单', '展示', '导航', '其它'].forEach((category) => {
  const grandChildren = componentsList[category].map((item) => {
    const key = item.english.toLowerCase();
    return (
      <Menu.Item key={key}>
        <Link to={`/components/${key}`}>{item.title}</Link>
      </Menu.Item>
    );
  });

  componentMenuItems.push(
    <Menu.ItemGroup title={category} key={category} mode="vertical">
      { grandChildren }
    </Menu.ItemGroup>
  );
});

export default class ReactComponents extends React.Component {
  getTopLevelMenuItems() {
    return [
      <Menu.Item key="introduce">
        <Link to="/components/introduce">Ant Design of React</Link>
      </Menu.Item>,
      <Menu.Item key="getting-started">
        <Link to="/components/getting-started">快速上手</Link>
      </Menu.Item>,
      <Menu.Item key="install">
        <Link to="/components/install">安装</Link>
      </Menu.Item>,
      <Menu.Item key="upgrade-notes">
        <Link to="/components/upgrade-notes">升级指南</Link>
      </Menu.Item>,
      <Menu.Item key="changelog">
        <Link to="/components/changelog">更新日志</Link>
      </Menu.Item>,
    ];
  }

  render() {
    const routes = this.props.routes;
    const activeMenuItem = routes[routes.length - 1].path;

    const topLevelMenuItems = this.getTopLevelMenuItems();
    const menuItems = topLevelMenuItems.concat(
      utils.flattenMenu(componentMenuItems)
    );

    const activeMenuItemIndex = menuItems.findIndex((menuItem) => {
      return menuItem.key === activeMenuItem;
    });
    const prev = menuItems[activeMenuItemIndex - 1];
    const next = menuItems[activeMenuItemIndex + 1];

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu className="sidebar" mode="inline"
            defaultOpenKeys={['components']}
            selectedKeys={[activeMenuItem]}>
            { topLevelMenuItems }
            <Menu.SubMenu title="Components" key="components">
              { componentMenuItems }
            </Menu.SubMenu>
          </Menu>
        </Col>
        <Col span="20" className="main-container">
          { this.props.children }
          <section className="prev-next-nav">
            { !!prev ? React.cloneElement(prev.props.children, { className: 'prev-page' }) : null }
            { !!next ? React.cloneElement(next.props.children, { className: 'next-page' }) : null }
          </section>
        </Col>
      </Row>
    );
  }
}
