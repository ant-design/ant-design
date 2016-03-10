import React from 'react';
import { Link } from 'react-router';
import { Select, Menu, Row, Col } from '../../../';
const Option = Select.Option;

import './index.less';

import componentsList from '../../../_site/data/react-components';
export default class Header extends React.Component {
  handleSearch(value) {
    console.log(value);
  }

  render() {
    const routes = this.props.routes;
    const activeMenuItem = routes[1].path || 'home';

    const options = [];
    Object.keys(componentsList).map((key) => {
      return componentsList[key];
    }).forEach(({ meta }) => {
      const url = `/components/${meta.english.toLowerCase()}`;

      options.push(
        <Option value={url} key={url}>
          <strong>{meta.english}</strong>
          <span className="ant-component-decs">{meta.chinese}</span>
        </Option>
      );
    });

    return (
      <header id="header" className="clearfix">
        <Row>
          <Col span="4">
            <Link to="/" id="logo">
              <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
              <span>Ant Design</span>
            </Link>
          </Col>
          <Col span="20">
            <div id="search-box">
              <Select combobox searchPlaceholder="搜索组件..." onChange={this.handleSearch.bind(this)}>
                {options}
              </Select>
            </div>
            <Menu mode="horizontal" selectedKeys={[activeMenuItem]} id="nav">
              <Menu.Item key="home">
                <Link to="/">
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key="practice">
                <Link to="practice">
                  实践
                </Link>
              </Menu.Item>
              <Menu.Item key="pattern">
                <Link to="pattern">
                  模式
                </Link>
              </Menu.Item>
              <Menu.Item key="components">
                <Link to="/components">
                  组件
                </Link>
              </Menu.Item>
              <Menu.Item key="spec">
                <Link to="/spec">
                  语言
                </Link>
              </Menu.Item>
              <Menu.Item key="resource">
                <Link to="/resource">
                  资源
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </header>
    );
  }
}
