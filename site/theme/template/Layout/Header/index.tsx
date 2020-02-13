import React from 'react';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { MenuOutlined } from '@ant-design/icons';
import { Select, Row, Col, Popover, Button } from 'antd';

import * as utils from '../../utils';
import { version as antdVersion } from '../../../../../package.json';
import Logo from './Logo';
import SearchBox from './SearchBox';
import More from './More';
import Navigation from './Navigation';

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

    const isHome = ['', 'index', 'index-cn'].includes(pathname);

    const isZhCN = locale === 'zh-CN';

    const headerClassName = classNames({
      clearfix: true,
      'home-header': isHome,
    });

    const sharedProps = {
      isZhCN,
    };

    const menu = [
      <More key="more" {...sharedProps} />,
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
      <Navigation
        key="nav"
        {...sharedProps}
        isHome={isHome}
        isMobile={isMobile}
        pathname={pathname}
      />,
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
