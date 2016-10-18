import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import enquire from 'enquire.js';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { Select, Menu, Row, Col, Icon, Button, Popover } from 'antd';

const Option = Select.Option;

export default class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    intl: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.onScroll = debounce(() => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop >= clientHeight) {
        this.setState({ isFirstFrame: false });
      } else {
        this.setState({ isFirstFrame: true });
      }
    }, 100);

    this.state = {
      menuMode: 'horizontal',
      isFirstFrame: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);

    enquire.register('only screen and (min-width: 320px) and (max-width: 940px)', {
      match: () => {
        this.setState({ menuMode: 'inline' });
      },
      unmatch: () => {
        this.setState({ menuMode: 'horizontal' });
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  handleSearch = (value) => {
    this.context.router.push({ pathname: `${value}/` });
  }

  handleSelectFilter = (value, option) => {
    return option.props['data-label'].indexOf(value.toLowerCase()) > -1;
  }

  handleLangChange = () => {
    if (typeof localStorage !== 'undefined') {
      const locale = this.context.intl.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
      localStorage.setItem('locale', locale);
      location.search = `?locale=${locale}`;
    }
  }

  render() {
    const { location, picked } = this.props;
    const components = picked.components;
    const module = location.pathname.replace(/\/$/, '')
            .split('/').slice(0, -1)
            .join('/');
    let activeMenuItem = module || 'home';
    if (activeMenuItem === 'components' || location.pathname === 'changelog') {
      activeMenuItem = 'docs/react';
    }

    const locale = this.context.intl.locale;
    const excludedSuffix = locale === 'zh-CN' ? 'en-US.md' : 'zh-CN.md';
    const options = components
            .filter(({ meta }) => !meta.filename.endsWith(excludedSuffix))
            .map(({ meta }) => {
              const pathSnippet = meta.filename.split('/')[1];
              const url = `/components/${pathSnippet}`;
              const subtitle = meta.subtitle;
              return (
                <Option value={url} key={url} data-label={`${meta.title.toLowerCase()} ${subtitle || ''}`}>
                  <strong>{meta.title}</strong>
                  {subtitle && <span className="ant-component-decs">{subtitle}</span>}
                </Option>
              );
            });

    const headerClassName = classNames({
      clearfix: true,
      'home-nav-white': !this.state.isFirstFrame,
    });

    const menuMode = this.state.menuMode;
    const query = location.query;
    const menu = [
      <Button className="lang" type="ghost" size="small" onClick={this.handleLangChange} key="lang">
        <FormattedMessage id="app.header.lang" />
      </Button>,
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={{ query, pathname: '/' }}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/spec">
          <Link to={{ query, pathname: '/docs/spec/introduce' }}>
            <FormattedMessage id="app.header.menu.spec" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/react">
          <Link to={{ query, pathname: '/docs/react/introduce' }}>
            <FormattedMessage id="app.header.menu.components" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/pattern">
          <Link to={{ query, pathname: '/docs/pattern/navigation' }}>
            <FormattedMessage id="app.header.menu.pattern" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/practice">
          <Link to={{ query, pathname: '/docs/practice/cases' }}>
            <FormattedMessage id="app.header.menu.practice" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/resource">
          <Link to={{ query, pathname: '/docs/resource/download' }}>
            <FormattedMessage id="app.header.menu.resource" />
          </Link>
        </Menu.Item>
      </Menu>,
    ];

    const searchPlaceholder = locale === 'zh-CN' ? '搜索组件...' : 'Search Components...';
    return (
      <header id="header" className={headerClassName}>
        <Popover
          overlayClassName="nav"
          placement="bottomRight"
          content={menuMode === 'inline' ? menu : null}
          trigger="click"
        >
          <Icon
            className="nav-phone-icon"
            type="menu"
          />
        </Popover>
        <Row>
          <Col lg={4} md={6} sm={7} xs={24}>
            <Link to={{ query, pathname: '/' }} id="logo">
              <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
              <span>Ant Design</span>
            </Link>
          </Col>
          <Col lg={20} md={18} sm={17} xs={0} style={{ display: 'block' }}>
            <div id="search-box">
              <Select combobox
                dropdownClassName="component-select"
                placeholder={searchPlaceholder}
                value={undefined}
                optionFilterProp="data-label"
                optionLabelProp="data-label"
                filterOption={this.handleSelectFilter}
                onSelect={this.handleSearch}
              >
                {options}
              </Select>
            </div>
            {menuMode === 'horizontal' ? menu : null}
          </Col>
        </Row>
      </header>
    );
  }
}
