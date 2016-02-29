import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';

export default class Spec extends React.Component {
  render() {
    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu>
            <Menu.Item key="introduce">
              <Link to="/spec/introduce">
                Ant Design
              </Link>
            </Menu.Item>
            <Menu.ItemGroup title="基础">
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
                色彩
              </Menu.Item>
              <Menu.Item key="layout">
                常用布局
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="动画">
              <Menu.Item key="easing">
                <Link to="/spec/easing">
                  自然运动
                </Link>
              </Menu.Item>
              <Menu.Item key="page-transtion">
                <Link to="/spec/page-transition">
                  互动转换
                </Link>
              </Menu.Item>
              <Menu.Item key="motion">
                <Link to="/spec/motion">
                  组件动画
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Col>
        <Col span="20" className="main-container">
          { this.props.children }
        </Col>
      </Row>
    );
  }
}
