import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import classNames from 'classnames';
import { Select, Row, Col, Drawer, Button, Modal } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import type { DirectionType } from 'antd/es/config-provider';
import * as utils from '../../utils';
import packageJson from '../../../../../package.json';
import Logo from './Logo';
import SearchBar from './SearchBar';
import More from './More';
import Navigation from './Navigation';
import Github from './Github';
import type { SiteContextProps } from '../SiteContext';
import SiteContext from '../SiteContext';
import { ping } from '../../utils';
import { AlgoliaConfig } from './algolia-config';

import './index.less';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

const { Option } = Select;

const antdVersion: string = packageJson.version;

export interface HeaderProps {
  intl: { locale: string };
  location: { pathname: string; query: any };
  router: any;
  themeConfig?: { docVersions: Record<string, string>; docNewVersions: Record<string, string> };
  changeDirection: (direction: DirectionType) => void;
}

let docsearch: any;
const triggerDocSearchImport = () => {
  if (docsearch) {
    return Promise.resolve();
  }

  return import('docsearch.js').then((ds) => {
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
      handleSelected(input: any, _$1: unknown, suggestion: any) {
        router.push(suggestion.url);
        setTimeout(() => {
          input.setVal('');
        });
      },
    });
  });
}

const ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL_UNTIL = 'ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL_UNTIL';

function disableAntdMirrorModal() {
  window.localStorage.setItem(
    ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL_UNTIL,
    moment().add(7, 'days').toString(),
  );
}

function shouldOpenAntdMirrorModal() {
  const until = window.localStorage.getItem(ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL_UNTIL);
  const deadline = moment(until);
  if (!until || !deadline.isValid()) {
    return true;
  }
  return deadline.diff(moment()) < 0;
}

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
  searching: boolean;
  showTechUIButton: boolean;
}

const Header: React.FC<HeaderProps & WrappedComponentProps<'intl'>> = (props) => {
  const { intl, router, location, themeConfig, changeDirection } = props;
  const [headerState, setHeaderState] = useState<HeaderState>({
    menuVisible: false,
    windowWidth: 1400,
    searching: false,
    showTechUIButton: false,
  });
  const { direction } = useContext<SiteContextProps>(SiteContext);
  const pingTimer = useRef<NodeJS.Timeout | null>(null);

  const handleHideMenu = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, menuVisible: false }));
  }, []);
  const onWindowResize = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, windowWidth: window.innerWidth }));
  }, []);
  const onTriggerSearching = useCallback((searching: boolean) => {
    setHeaderState((prev) => ({ ...prev, searching }));
  }, []);
  const handleShowMenu = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, menuVisible: true }));
  }, []);
  const onDirectionChange = useCallback(() => {
    changeDirection(direction !== 'rtl' ? 'rtl' : 'ltr');
  }, [direction]);

  useEffect(() => {
    router.listen(handleHideMenu);
    initDocSearch({ isZhCN: intl.locale === 'zh-CN', router });
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    pingTimer.current = ping((status) => {
      if (status !== 'timeout' && status !== 'error') {
        setHeaderState((prev) => ({ ...prev, showTechUIButton: true }));
        if (
          process.env.NODE_ENV === 'production' &&
          shouldOpenAntdMirrorModal() &&
          window.location.host !== '4x-ant-design.antgroup.com' &&
          window.location.host.indexOf('surge.sh') === -1
        ) {
          Modal.confirm({
            title: '提示',
            content: '内网用户推荐访问国内镜像以获得极速体验～',
            okText: '🚀 立刻前往',
            cancelText: '不再弹出',
            closable: true,
            onOk() {
              window.location.href = 'https://ant-design.antgroup.com';
              disableAntdMirrorModal();
            },
            onCancel() {
              disableAntdMirrorModal();
            },
          });
        }
      }
    });
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (pingTimer.current) {
        clearTimeout(pingTimer.current);
      }
    };
  }, []);

  // eslint-disable-next-line class-methods-use-this
  const handleVersionChange = useCallback((url: string) => {
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
  }, []);

  const onLangChange = useCallback(() => {
    const { pathname, query } = location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.slice(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }
    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname), query).pathname,
      );
  }, [location]);

  const nextDirectionText = useMemo<string>(
    () => (direction !== 'rtl' ? 'RTL' : 'LTR'),
    [direction],
  );

  const getDropdownStyle = useMemo<React.CSSProperties>(
    () => (direction === 'rtl' ? { direction: 'ltr', textAlign: 'right' } : {}),
    [direction],
  );

  return (
    <SiteContext.Consumer>
      {({ isMobile }) => {
        const { menuVisible, windowWidth, searching, showTechUIButton } = headerState;
        const docVersions: Record<string, string> = {
          ...themeConfig?.docNewVersions,
          [antdVersion]: antdVersion,
          ...themeConfig?.docVersions,
        };
        const versionOptions = Object.keys(docVersions).map((version) => (
          <Option value={docVersions[version]} key={version}>
            {version}
          </Option>
        ));

        const pathname = location.pathname.replace(/(^\/|\/$)/g, '');

        const isHome = ['', 'index', 'index-cn'].includes(pathname);

        const isZhCN = intl.locale === 'zh-CN';
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
            directionText={nextDirectionText}
            onLangChange={onLangChange}
            onDirectionChange={onDirectionChange}
          />
        );

        let menu: (React.ReactElement | null)[] = [
          navigationNode,
          <Select
            key="version"
            className="version"
            size="small"
            defaultValue={antdVersion}
            onChange={handleVersionChange}
            dropdownStyle={getDropdownStyle}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {versionOptions}
          </Select>,
          <Button
            size="small"
            onClick={onLangChange}
            className="header-button header-lang-button"
            key="lang-button"
          >
            <FormattedMessage id="app.header.lang" />
          </Button>,
          <Button
            size="small"
            onClick={onDirectionChange}
            className="header-button header-direction-button"
            key="direction-button"
          >
            {nextDirectionText}
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
              { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
              { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
            ];

        return (
          <header id="header" className={headerClassName}>
            {isMobile && <MenuOutlined className="nav-phone-icon" onClick={handleShowMenu} />}
            <Drawer
              open={menuVisible}
              placement="right"
              title={null}
              closable={false}
              onClose={() => setHeaderState((prev) => ({ ...prev, menuVisible: false }))}
              bodyStyle={{ margin: '0 -23px' }}
              drawerStyle={{ overflowX: 'hidden' }}
              width={260}
            >
              {menu}
            </Drawer>
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
                  onTriggerFocus={onTriggerSearching}
                />
                {!isMobile && menu}
              </Col>
            </Row>
          </header>
        );
      }}
    </SiteContext.Consumer>
  );
};

export default injectIntl(Header);
