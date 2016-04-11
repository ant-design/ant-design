import React from 'react';
import { Link } from 'react-router';
import enquire from 'enquire.js';
import { Select, Menu, Row, Col, Icon } from 'antd';
const Option = Select.Option;

import './index.less';

import componentsList from '../../../_data/react-components';
export default class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      menuMode: 'horizontal',
    };
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({
        menuVisible: false,
      });
    });

    enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
      match: () => {
        this.setState({ menuMode: 'inline' });
      },
      unmatch: () => {
        this.setState({ menuMode: 'horizontal' });
      },
    });
  }

  handleMenuIconClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      menuVisible: true,
    });
  }

  handleSearch = (value) => {
    this.context.router.push({ pathname: value });
  }

  handleSelectFilter = (value, option) => {
    return option.props['data-label'].indexOf(value.toLowerCase()) > -1;
  }

  render() {
    const routes = this.props.routes;
    const activeMenuItem = routes[1].path || 'home';

    const options = Object.keys(componentsList).map((key) => {
      return componentsList[key];
    }).filter(({ meta }) => {
      return /^component/.test(meta.fileName);
    }).map(({ meta }) => {
      const pathSnippet = meta.fileName.split('/')[1];
      const url = `/components/${pathSnippet}`;
      return (
        <Option value={url} key={url} data-label={`${meta.english.toLowerCase()} ${meta.chinese}`}>
          <strong>{meta.english}</strong>
          <span className="ant-component-decs">{meta.chinese}</span>
        </Option>
      );
    });

    const menuStyle = {
      display: this.state.menuVisible ? 'block' : '',
    };

    return (
      <header id="header" className="clearfix">
        <Row>
          <Col lg={4} md={6} sm={7} xs={24}>
            <Icon
              className="nav-phone-icon"
              onClick={this.handleMenuIconClick}
              type="menu" />
            <Link to="/" id="logo">
              <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
              <span>Ant Design</span>
            </Link>
          </Col>
          <Col className={`nav ${this.state.menuVisible ? 'nav-show' : 'nav-hide'}`}
            lg={20} md={18} sm={17} xs={0} style={menuStyle}>
            <div id="search-box">
              <Select combobox
                dropdownClassName="component-select"
                searchPlaceholder="搜索组件..."
                optionLabelProp="nothing"
                optionFilterProp="data-label"
                filterOption={this.handleSelectFilter}
                onSelect={this.handleSearch}>
                {options}
              </Select>
            </div>
            <Menu mode={this.state.menuMode} selectedKeys={[activeMenuItem]} id="nav">
              <Menu.Item key="home">
                <Link to="/">
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key="docs/practice">
                <Link to="/docs/practice">
                  实践
                </Link>
              </Menu.Item>
              <Menu.Item key="docs/pattern">
                <Link to="/docs/pattern">
                  模式
                </Link>
              </Menu.Item>
              <Menu.Item key="components">
                <Link to="/components">
                  组件
                </Link>
              </Menu.Item>
              <Menu.Item key="docs/spec">
                <Link to="/docs/spec">
                  语言
                </Link>
              </Menu.Item>
              <Menu.Item key="docs/resource">
                <Link to="/docs/resource">
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
