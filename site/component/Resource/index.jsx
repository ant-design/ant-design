import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';
import * as utils from '../utils';

export default class Resource extends React.Component {
  getMenuItems() {
    return [
      <Menu.Item key="download">
        <Link to="/resource/download">
          资源下载
        </Link>
      </Menu.Item>,
      <Menu.Item key="reference">
        <Link to="/resource/reference">
          文献素材
        </Link>
      </Menu.Item>,
      <Menu.Item key="github">
        <a href="https://github.com/ant-design/ant-design" target="_blank">
          GitHub
        </a>
      </Menu.Item>,
    ];
  }

  render() {
    const activeMenuItem = utils.getActiveMenuItem(this.props, 'download');
    const menuItems = this.getMenuItems();
    const { prev, next } = utils.getFooterNav(menuItems, activeMenuItem);

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu mode="inline" selectedKeys={[activeMenuItem]}>
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
