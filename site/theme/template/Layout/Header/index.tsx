import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Select, Row, Col, Popover, Button } from 'antd';

import * as utils from '../../utils';
import { version as antdVersion } from '../../../../../package.json';
import Logo from './Logo';
import SearchBox from './SearchBox';
import More from './More';
import Navigation from './Navigation';
import Github from './Github';
import SiteContext from '../SiteContext';

import './index.less';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

const { Option } = Select;

let docsearch: any;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  docsearch = require('docsearch.js');
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
        hit.url = hit.url.replace('ant.design', window.location.host);
        hit.url = hit.url.replace('https:', window.location.protocol);
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
  location: { pathname: string; query: any };
  router: any;
  themeConfig: { docVersions: Record<string, string> };
  changeDirection: (direction: string) => void;
}

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
  searching: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = SiteContext;

  state = {
    menuVisible: false,
    windowWidth: 1400,
    searching: false,
  };

  componentDidMount() {
    const { intl, router } = this.props;
    router.listen(this.handleHideMenu);
    initDocSearch(intl.locale);

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  onTriggerSearching = (searching: boolean) => {
    this.setState({ searching });
  };

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

  onDirectionChange = () => {
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

  getDropdownStyle = (): React.CSSProperties => {
    const { direction } = this.context;
    if (direction === 'rtl') {
      return {
        direction: 'ltr',
        textAlign: 'right',
      };
    }
    return {};
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleVersionChange = (url: string) => {
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    if (/overview/.test(currentPathname) && /0?[1-39][0-3]?x/.test(url)) {
      window.location.href = currentUrl
        .replace(window.location.origin, url)
        .replace(/\/components\/overview/, `/docs${/0(9|10)x/.test(url) ? '' : '/react'}/introduce`)
        .replace(/\/$/, '');
      return;
    }
    window.location.href = currentUrl.replace(window.location.origin, url);
  };

  onLangChange = () => {
    const {
      location: { pathname, query },
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
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname), query).pathname,
      );
  };

  render() {
    return (
      <SiteContext.Consumer>
        {({ isMobile }) => {
          const { menuVisible, windowWidth, searching } = this.state;
          const { direction } = this.context;
          const {
            location,
            themeConfig,
            intl: { locale },
          } = this.props;
          const docVersions = { [antdVersion]: antdVersion, ...themeConfig.docVersions };
          const versionOptions = Object.keys(docVersions).map(version => (
            <Option value={docVersions[version]} key={version}>
              {version}
            </Option>
          ));

          const pathname = location.pathname.replace(/(^\/|\/$)/g, '');

          const isHome = ['', 'index', 'index-cn'].includes(pathname);

          const isZhCN = locale === 'zh-CN';
          const isRTL = direction === 'rtl';
          let responsive: null | 'narrow' | 'crowded' = null;
          if (windowWidth < RESPONSIVE_XS) {
            responsive = 'crowded';
          } else if (windowWidth < RESPONSIVE_SM) {
            responsive = 'narrow';
          }

          const headerClassName = classNames({
            clearfix: true,
            'home-header': isHome,
          });

          const sharedProps = {
            isZhCN,
            isRTL,
          };

          const searchBox = (
            <SearchBox
              key="search"
              {...sharedProps}
              responsive={responsive}
              onTriggerFocus={this.onTriggerSearching}
            />
          );

          const navigationNode = (
            <Navigation
              key="nav"
              {...sharedProps}
              location={location}
              responsive={responsive}
              isMobile={isMobile}
              pathname={pathname}
              directionText={this.getNextDirectionText()}
              onLangChange={this.onLangChange}
              onDirectionChange={this.onDirectionChange}
            />
          );

          let menu: (React.ReactElement | null)[] = [
            navigationNode,
            <Select
              key="version"
              className="version"
              size="small"
              defaultValue={antdVersion}
              onChange={this.handleVersionChange}
              dropdownStyle={this.getDropdownStyle()}
              getPopupContainer={trigger => trigger.parentNode}
            >
              {versionOptions}
            </Select>,
            <Button
              size="small"
              onClick={this.onLangChange}
              className="header-button header-lang-button"
              key="lang-button"
            >
              <FormattedMessage id="app.header.lang" />
            </Button>,
            <Button
              size="small"
              onClick={this.onDirectionChange}
              className="header-button header-direction-button"
              key="direction-button"
            >
              {this.getNextDirectionText()}
            </Button>,
            <More key="more" {...sharedProps} />,
            <Github key="github" responsive={responsive} />,
          ];

          if (windowWidth < RESPONSIVE_XS) {
            menu = searching ? [] : [navigationNode];
          } else if (windowWidth < RESPONSIVE_SM) {
            menu = searching ? [] : menu;
          }

          const colProps = isHome
            ? [{ flex: 'none' }, { flex: 'auto' }]
            : [
                {
                  xxl: 1,
                  xl: 2,
                  lg: 2,
                  md: 2,
                  sm: 12,
                  xs: 12,
                },
                {
                  xxl: 11,
                  xl: 10,
                  lg: 9,
                  md: 9,
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
                  <UnorderedListOutlined className="nav-phone-icon" onClick={this.handleShowMenu} />
                </Popover>
              )}
              <Row style={{ flexFlow: 'nowrap', height: 64 }}>
                <Col {...colProps[0]}>
                  <Logo {...sharedProps} location={location} />
                </Col>
                <Col {...colProps[1]} className="menu-row">
                  {searchBox}
                  {!isMobile && menu}
                </Col>
              </Row>
            </header>
          );
        }}
      </SiteContext.Consumer>
    );
  }
}

export default injectIntl(Header as any);
