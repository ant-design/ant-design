import React from 'react';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import { Link } from 'bisheng/router';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Select, Menu, Row, Col, Popover, Input, Button } from 'antd';

import * as utils from '../utils';
import { version as antdVersion } from '../../../../package.json';

const { Option } = Select;

let docsearch;
if (typeof window !== 'undefined') {
  docsearch = require('docsearch.js'); // eslint-disable-line
}

function initDocSearch(locale) {
  if (!docsearch) {
    return;
  }
  const lang = locale === 'zh-CN' ? 'cn' : 'en';
  docsearch({
    apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
    indexName: 'ant_design',
    inputSelector: '#search-box input',
    algoliaOptions: { facetFilters: [`tags:${lang}`] },
    transformData(hits) {
      hits.forEach(hit => {
        hit.url = hit.url.replace('ant.design', window.location.host); // eslint-disable-line
        hit.url = hit.url.replace('https:', window.location.protocol); // eslint-disable-line
      });
      return hits;
    },
    debug: false, // Set debug to true if you want to inspect the dropdown
  });
}

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    theme: PropTypes.oneOf(['default', 'dark']),
    direction: PropTypes.string,
  };

  state = {
    menuVisible: false,
  };

  componentDidMount() {
    const { intl } = this.props;
    const { router } = this.context;
    router.listen(this.handleHideMenu);
    const { searchInput } = this;
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput.focus();
      }
    });
    initDocSearch(intl.locale);
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleDirectionChange = () => {
    const { changeDirection } = this.props;
    const { direction } = this.context;
    if (direction !== 'rtl') {
      changeDirection('rtl');
    } else {
      changeDirection('ltr');
    }
  };

  getNextDirectionText = () => {
    const { direction } = this.context;

    if (direction !== 'rtl') {
      return 'RTL';
    }
    return 'LTR';
  };

  onMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleVersionChange = url => {
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    window.location.href = currentUrl
      .replace(window.location.origin, url)
      .replace(currentPathname, utils.getLocalizedPathname(currentPathname));
  };

  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
      );
  };

  render() {
    const { menuVisible } = this.state;
    const { isMobile } = this.context;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const {
      location,
      themeConfig,
      intl: { locale },
    } = this.props;
    const docVersions = { ...themeConfig.docVersions, [antdVersion]: antdVersion };
    const versionOptions = Object.keys(docVersions).map(version => (
      <Option value={docVersions[version]} key={version}>
        {version}
      </Option>
    ));

    const pathname = location.pathname.replace(/(^\/|\/$)/g, '');
    const module = pathname
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (location.pathname === 'changelog' || location.pathname === 'changelog-cn') {
      activeMenuItem = 'docs/react';
    }

    const isHome = ['', 'index', 'index-cn'].includes(pathname);

    const isZhCN = locale === 'zh-CN';

    const headerClassName = classNames({
      clearfix: true,
      'home-header': isHome,
    });

    const menu = [
      isHome ? (
        <GitHubButton key="github" type="stargazers" namespace="ant-design" repo="ant-design" />
      ) : null,
      <Button
        size="small"
        onClick={this.handleDirectionChange}
        className="header-direction-button"
        key="direction-button"
      >
        {this.getNextDirectionText()}
      </Button>,
      <Button
        size="small"
        onClick={this.handleLangChange}
        className="header-lang-button"
        key="lang-button"
      >
        <FormattedMessage id="app.header.lang" />
      </Button>,
      <Select
        key="version"
        className="version"
        size="small"
        dropdownMatchSelectWidth={false}
        defaultValue={antdVersion}
        onChange={this.handleVersionChange}
        getPopupContainer={trigger => trigger.parentNode}
      >
        {versionOptions}
      </Select>,
      <Menu
        className="menu-site"
        mode={menuMode}
        selectedKeys={[activeMenuItem]}
        id="nav"
        key="nav"
      >
        {isHome ? null : (
          <Menu.Item key="home" className="hide-in-home-page">
            <Link to={utils.getLocalizedPathname('/', isZhCN)}>
              <FormattedMessage id="app.header.menu.home" />
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="docs/spec">
          <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.spec" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/react">
          <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.documentation" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components">
          <Link to={utils.getLocalizedPathname('/components/button/', isZhCN)}>
            <FormattedMessage id="app.header.menu.components" />
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          key="ecosystem"
          className="hide-in-home-page"
          title={<FormattedMessage id="app.header.menu.ecosystem" />}
        >
          <Menu.Item key="pro">
            <a
              href="http://pro.ant.design"
              className="header-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="app.header.menu.pro.v4" />
            </a>
          </Menu.Item>
          <Menu.Item key="ng">
            <a
              href="http://ng.ant.design"
              className="header-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ant Design of Angular
            </a>
          </Menu.Item>
          <Menu.Item key="vue">
            <a
              href="http://vue.ant.design"
              className="header-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ant Design of Vue
            </a>
          </Menu.Item>
          {isZhCN ? (
            <Menu.Item key="course" className="hide-in-home-page">
              <a
                href="https://www.yuque.com/ant-design/course"
                className="header-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ant Design 实战教程
              </a>
            </Menu.Item>
          ) : null}
        </Menu.SubMenu>
      </Menu>,
    ];

    const colProps = isHome
      ? [{ flex: 'none' }, { flex: 'auto' }]
      : [
          {
            xxl: 4,
            xl: 5,
            lg: 5,
            md: 5,
            sm: 24,
            xs: 24,
          },
          {
            xxl: 20,
            xl: 19,
            lg: 19,
            md: 19,
            sm: 0,
            xs: 0,
          },
        ];

    const searchPlaceholder = locale === 'zh-CN' ? '在 ant.design 中搜索' : 'Search in ant.design';
    return (
      <header id="header" className={headerClassName}>
        {isMobile && (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <MenuOutlined className="nav-phone-icon" onClick={this.handleShowMenu} />
          </Popover>
        )}
        <Row>
          <Col {...colProps[0]}>
            <h1>
              <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
                <img
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                />
                Ant Design
              </Link>
            </h1>
          </Col>
          <Col {...colProps[1]}>
            <div id="search-box">
              <SearchOutlined />
              <Input
                ref={ref => {
                  this.searchInput = ref;
                }}
                placeholder={searchPlaceholder}
              />
            </div>
            {!isMobile && menu}
          </Col>
        </Row>
      </header>
    );
  }
}

export default injectIntl(Header);
