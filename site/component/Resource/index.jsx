import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';

export default class Resource extends React.Component {
  render() {
    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu>
            <Menu.Item>
              <Link to="/resource/download">
                资源下载
              </Link>
            </Menu.Item>
            <Menu.Item>
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
