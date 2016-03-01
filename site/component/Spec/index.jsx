import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';
import * as utils from '../utils';
const SubMenu = Menu.SubMenu;

export default class Spec extends React.Component {
  getMenuItems() {
    return [
      <Menu.Item key="introduce">
        <Link to="/spec/introduce">
          Ant Design
        </Link>
      </Menu.Item>,
      <SubMenu key="basic" title={<h4>基础</h4>}>
        <Menu.Item key="font">
          <Link to="/spec/font">
            字体
          </Link>
        </Menu.Item>
        <Menu.Item key="typography">
          <Link to="/spec/typography">
            排版
          </Link>
        </Menu.Item>
        <Menu.Item key="colors">
          <Link to="/spec/color">
            色彩
          </Link>
        </Menu.Item>
        <Menu.Item key="layout">
          <Link to="/spec/layout">
            常用布局
          </Link>
        </Menu.Item>
      </SubMenu>,
      <SubMenu key="animation" title={<h4>动画</h4>}>
        <Menu.Item key="easing">
          <Link to="/spec/easing">
            自然运动
          </Link>
        </Menu.Item>
        <Menu.Item key="page-transition">
          <Link to="/spec/page-transition">
            互动转换
          </Link>
        </Menu.Item>
        <Menu.Item key="motion">
          <Link to="/spec/motion">
            组件动画
          </Link>
        </Menu.Item>
      </SubMenu>,
    ];
  }

  render() {
    const activeMenuItem = utils.getActiveMenuItem(this.props, 'introduce');
    const menuItems = this.getMenuItems();
    const { prev, next } = utils.getFooterNav(menuItems, activeMenuItem);

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu mode="inline" defaultOpenKeys={['basic', 'animation']}
            selectedKeys={[activeMenuItem]}>
            { menuItems }
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
