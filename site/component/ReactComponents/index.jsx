import React from 'react';
import { Route, Link } from 'react-router';
import { Row, Col, Menu } from '../../../';
import componentsList from '../../../_site/data/components-list';

export default class ReactComponents extends React.Component {
  render() {
    const componentMenuItems = [];
    ['基本', '表单', '展示', '导航', '其它'].forEach((key) => {
      const grandChildren = componentsList[key].map((item) => {
        const key = item.english.toLowerCase();
        return (
          <Menu.Item key={key}>
            <Link to={`/components/${key}`}>{item.title}</Link>
          </Menu.Item>
        );
      });

      componentMenuItems.push(
        <Menu.ItemGroup title={key} key={key} mode="vertical">
          { grandChildren }
        </Menu.ItemGroup>
      );
    });

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu className="sidebar" mode="inline"
                defaultOpenKeys={['components']}>
            <Menu.Item key="introduce">
              <Link to="/components/introduce">Ant Design of React</Link>
            </Menu.Item>
            <Menu.Item key="getting-started">
              <Link to="/components/getting-started">快速上手</Link>
            </Menu.Item>
            <Menu.Item key="install">
              <Link to="/components/install">安装</Link>
            </Menu.Item>
            <Menu.Item key="upgrade-notes">
              <Link to="/components/upgrade-notes">升级指南</Link>
            </Menu.Item>
            <Menu.Item key="changelog">
              <Link to="/components/changelog">更新日志</Link>
            </Menu.Item>
            <Menu.SubMenu title="Components" key="components">
              { componentMenuItems }
            </Menu.SubMenu>
          </Menu>
        </Col>
        <Col span="20" className="main-container">
          { this.props.children }
        </Col>
      </Row>
    );
  }
}
