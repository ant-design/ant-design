import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';

export default class Resource extends React.Component {
  render() {
    const routes = this.props.routes;
    const activeMenuItem = routes[routes.length - 1].path || 'download';

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu mode="inline" selectedKeys={[activeMenuItem]}>
            <Menu.Item key="download">
              <Link to="/resource/download">
                资源下载
              </Link>
            </Menu.Item>
            <Menu.Item key="reference">
              <Link to="/resource/reference">
                文献素材
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a href="https://github.com/ant-design/ant-design" target="_blank">
                GitHub
              </a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span="20" className="main-container">
          { this.props.children }
        </Col>
      </Row>
    );
  }
}
