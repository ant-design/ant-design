import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Select, Row, Col, Popover, Button } from 'antd';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import * as utils from '../../utils';
import packageJson from '../../../../../package.json';
import Logo from './Logo';
import SearchBar from './SearchBar';
import More from './More';
import Navigation from './Navigation';
import Github from './Github';
import SiteContext from '../SiteContext';
import { ping } from '../../utils';
import { AlgoliaConfig } from './algolia-config';

import './index.less';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

const { Option } = Select;

const antdVersion: string = packageJson.version;

export interface HeaderProps {
  intl: {
    locale: string;
  };
  location: { pathname: string; query: any };
  router: any;
  themeConfig: { docVersions: Record<string, string> };
  changeDirection: (direction: string) => void;
}

let docsearch: any;
const triggerDocSearchImport = () => {
  if (docsearch) {
    return Promise.resolve();
  }

  return import('docsearch.js').then(ds => {
    docsearch = ds.default;
  });
};

function initDocSearch({ isZhCN, router }: { isZhCN: boolean; router: any }) {
  if (!canUseDom()) {
    return;
  }

  triggerDocSearchImport().then(() => {
    docsearch({
      appId: AlgoliaConfig.appId,
      apiKey: AlgoliaConfig.apiKey,
      indexName: AlgoliaConfig.indexName,
      inputSelector: '#search-box input',
      algoliaOptions: AlgoliaConfig.getSearchParams(isZhCN),
      transformData: AlgoliaConfig.transformData,
      debug: AlgoliaConfig.debug,
      // https://docsearch.algolia.com/docs/behavior#handleselected
      handleSelected: (input: any, _$1: unknown, suggestion: any) => {
        router.push(suggestion.url);
        setTimeout(() => {
          input.setVal('');
        });
      },
    });
  });
}

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
  searching: boolean;
  showTechUIButton: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = SiteContext;

  pingTimer: NodeJS.Timeout;

  state = {
    menuVisible: false,
    windowWidth: 1400,
    searching: false,
    showTechUIButton: false,
  };

  componentDidMount() {
    const { intl, router } = this.props;
    router.listen(this.handleHideMenu);

    initDocSearch({
      isZhCN: intl.locale === 'zh',
      router,
    });

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();

    this.pingTimer = ping(status => {
      if (status !== 'timeout' && status !== 'error') {
        this.setState({
          showTechUIButton: true,
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    clearTimeout(this.pingTimer);
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
          const { menuVisible, windowWidth, searching, showTechUIButton } = this.state;
          const { direction } = this.context;
          const {
            location,
            themeConfig,
            intl: { locale },
            router,
          } = this.props;
          const docVersions: Record<string, string> = {
            [antdVersion]: antdVersion,
            ...themeConfig.docVersions,
          };
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

          const navigationNode = (
            <Navigation
              key="nav"
              {...sharedProps}
              location={location}
              responsive={responsive}
              isMobile={isMobile}
              showTechUIButton={showTechUIButton}
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
                  xxl: 4,
                  xl: 5,
                  lg: 6,
                  md: 6,
                  sm: 24,
                  xs: 24,
                },
                {
                  xxl: 20,
                  xl: 19,
                  lg: 18,
                  md: 18,
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
                  <SearchBar
                    key="search"
                    {...sharedProps}
                    router={router}
                    algoliaConfig={AlgoliaConfig}
                    responsive={responsive}
                    onTriggerFocus={this.onTriggerSearching}
                  />
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
