import React from 'react';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import { Link } from 'bisheng/router';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { Select, Menu, Row, Col, Popover, Button } from 'antd';

import * as utils from '../../utils';
import { version as antdVersion } from '../../../../../package.json';
import Logo from './Logo';
import SearchBox from './SearchBox';

const { Option } = Select;

let docsearch: any;
if (typeof window !== 'undefined') {
  docsearch = require('docsearch.js'); // eslint-disable-line
}

function initDocSearch(locale: string) {
  if (!docsearch) {
    return;
  }
  const lang = locale === 'zh-CN' ? 'cn' : 'en';
  docsearch({
    apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
    indexName: 'ant_design',
    inputSelector: '#search-box input',
    algoliaOptions: { facetFilters: [`tags:${lang}`] },
    transformData(hits: { url: string }[]) {
      hits.forEach(hit => {
        hit.url = hit.url.replace('ant.design', window.location.host); // eslint-disable-line
        hit.url = hit.url.replace('https:', window.location.protocol); // eslint-disable-line
      });
      return hits;
    },
    debug: false, // Set debug to true if you want to inspect the dropdown
  });
}

export interface HeaderProps {
  intl: {
    locale: string;
  };
  location: { pathname: string };
  themeConfig: { docVersions: Record<string, string> };
  changeDirection: (direction: string) => void;
}

class Header extends React.Component<HeaderProps> {
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

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleVersionChange = (url: string) => {
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
    } else if (
      location.pathname === 'docs/resources' ||
      location.pathname === 'docs/resources-cn'
    ) {
      activeMenuItem = 'docs/resources';
    }

    const isHome = ['', 'index', 'index-cn'].includes(pathname);

    const isZhCN = locale === 'zh-CN';

    const headerClassName = classNames({
      clearfix: true,
      'home-header': isHome,
    });

    const menu = [
      <Menu className="menu-site-more" mode={menuMode} id="nav-more" key="nav-more">
        <Menu.SubMenu
          key="ecosystem"
          className="hide-in-home-page"
          title={
            <Button size="small" className="header-button">
              <FormattedMessage id="app.header.menu.more" />
              <DownOutlined />
            </Button>
          }
        >
          <Menu.ItemGroup title={<FormattedMessage id="app.header.menu.ecosystem" />}>
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
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>,
      <Button
        size="small"
        onClick={this.handleDirectionChange}
        className="header-button header-direction-button"
        key="direction-button"
      >
        {this.getNextDirectionText()}
      </Button>,
      <Button
        size="small"
        onClick={this.handleLangChange}
        className="header-button header-lang-button"
        key="lang-button"
      >
        <FormattedMessage id="app.header.lang" />
      </Button>,
      <Select
        key="version"
        className="version"
        size="small"
        defaultValue={antdVersion}
        onChange={this.handleVersionChange}
        getPopupContainer={trigger => trigger.parentNode}
      >
        {versionOptions}
      </Select>,
      isHome ? (
        <GitHubButton key="github" type="stargazers" namespace="ant-design" repo="ant-design" />
      ) : null,
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
        <Menu.Item key="docs/resources">
          <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN)}>
            <FormattedMessage id="app.header.menu.resource" />
          </Link>
        </Menu.Item>
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

    const sharedProps = {
      isZhCN,
    };

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
        <Row style={{ flexFlow: 'nowrap' }}>
          <Col {...colProps[0]}>
            <Logo {...sharedProps} />
          </Col>
          <Col {...colProps[1]}>
            <SearchBox {...sharedProps} />
            {!isMobile && menu}
          </Col>
        </Row>
      </header>
    );
  }
}

export default injectIntl(Header as any);
