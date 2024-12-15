import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GithubOutlined, MenuOutlined } from '@ant-design/icons';
import { Alert, Col, ConfigProvider, Popover, Row, Select } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useLocation, useSiteData } from 'dumi';
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';

import useLocale from '../../../hooks/useLocale';
import DirectionIcon from '../../icons/DirectionIcon';
import { ANT_DESIGN_NOT_SHOW_BANNER } from '../../layouts/GlobalLayout';
import * as utils from '../../utils';
import { getThemeConfig } from '../../utils';
import type { SiteContextProps } from '../SiteContext';
import SiteContext from '../SiteContext';
import type { SharedProps } from './interface';
import Logo from './Logo';
import Navigation from './Navigation';
import SwitchBtn from './SwitchBtn';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

const locales = {
  cn: {
    message: '语雀征文 · 说说你和开源的故事，赢取 Ant Design 精美周边 🎁',
    shortMessage: '语雀征文 · 说说你和开源的故事，赢取 Ant Design 精美周边 🎁',
    more: '前往了解',
    link: 'https://www.yuque.com/opensource2023',
  },
  en: {
    message: '',
    shortMessage: '',
    more: '',
    link: '',
  },
};

const useStyle = createStyles(({ token, css }) => {
  const searchIconColor = '#ced4d9';
  return {
    header: css`
      position: sticky;
      top: 0;
      z-index: 1000;
      max-width: 100%;
      background: ${token.colorBgContainer};
      box-shadow: ${token.boxShadowTertiary};
      backdrop-filter: blur(8px);

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        text-align: center;
        border: none;
      }

      .dumi-default-search-bar {
        display: inline-flex;
        align-items: center;
        flex: auto;
        margin: 0;
        border-inline-start: 1px solid rgba(0, 0, 0, 0.06);

        > svg {
          width: 14px;
          fill: ${searchIconColor};
        }

        > input {
          height: 22px;
          border: 0;
          max-width: calc(100vw - 768px);

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${searchIconColor};
          }
        }

        .dumi-default-search-shortcut {
          color: ${searchIconColor};
          background-color: rgba(150, 150, 150, 0.06);
          border-color: rgba(100, 100, 100, 0.2);
          border-radius: ${token.borderRadiusSM}px;
          position: static;
          top: unset;
          transform: unset;
        }

        .dumi-default-search-popover {
          inset-inline-start: ${token.paddingSM}px;
          inset-inline-end: unset;
          z-index: 1;
          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
          & > section {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
    menuRow: css`
      display: flex;
      align-items: center;
      margin: 0;
      column-gap: ${token.paddingSM}px;
      padding-inline-end: ${token.padding}px;

      > * {
        flex: none;
        margin: 0;
      }
    `,
    dataDirectionIcon: css`
      width: 20px;
    `,
    popoverMenu: {
      width: 300,
      [`${token.antCls}-popover-inner-content`]: {
        padding: 0,
      },
    },
    banner: css`
      width: 100%;
      text-align: center;
      word-break: keep-all;
      user-select: none;
    `,
    link: css`
      margin-inline-start: 10px;
      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        margin-inline-start: 0;
      }
    `,
    versionSelect: css`
      min-width: 90px;
      .rc-virtual-list {
        .rc-virtual-list-holder {
          scrollbar-width: thin;
          scrollbar-gutter: stable;
        }
      }
    `,
  };
});

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
  searching: boolean;
}

// ================================= Header =================================
const Header: React.FC = () => {
  const [locale, lang] = useLocale(locales);

  const { pkg } = useSiteData();

  const themeConfig = getThemeConfig();
  const [headerState, setHeaderState] = useState<HeaderState>({
    menuVisible: false,
    windowWidth: 1400,
    searching: false,
  });
  const { direction, isMobile, bannerVisible, updateSiteConfig } =
    useContext<SiteContextProps>(SiteContext);
  const pingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { pathname, search } = location;

  const { styles } = useStyle();

  const handleHideMenu = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, menuVisible: false }));
  }, []);
  const onWindowResize = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, windowWidth: window.innerWidth }));
  }, []);
  const onMenuVisibleChange = useCallback((visible: boolean) => {
    setHeaderState((prev) => ({ ...prev, menuVisible: visible }));
  }, []);
  const onDirectionChange = () => {
    updateSiteConfig({ direction: direction !== 'rtl' ? 'rtl' : 'ltr' });
  };
  const onBannerClose = () => {
    updateSiteConfig({ bannerVisible: false });

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem(ANT_DESIGN_NOT_SHOW_BANNER, dayjs().toISOString());
    }
  };

  useEffect(() => {
    handleHideMenu();
  }, [location]);

  useEffect(() => {
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (pingTimer.current) {
        clearTimeout(pingTimer.current);
      }
    };
  }, []);

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
    // Mirror url must have `/`, we add this for compatible
    const urlObj = new URL(currentUrl.replace(window.location.origin, url));
    if (urlObj.host.includes('antgroup')) {
      urlObj.pathname = `${urlObj.pathname.replace(/\/$/, '')}/`;
      window.location.href = urlObj.toString();
    } else {
      window.location.href = urlObj.href.replace(/\/$/, '');
    }
  }, []);

  const onLangChange = useCallback(() => {
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.slice(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }
    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname), search).pathname,
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

  const { menuVisible, windowWidth, searching } = headerState;
  const docVersions: Record<string, string> = {
    [pkg.version]: pkg.version,
    ...themeConfig?.docVersions,
  };
  const versionOptions = Object.keys(docVersions).map((version) => ({
    value: docVersions[version],
    label: version,
  }));

  const isHome = ['', 'index', 'index-cn'].includes(pathname);
  const isZhCN = lang === 'cn';
  const isRTL = direction === 'rtl';
  let responsive: null | 'narrow' | 'crowded' = null;
  if (windowWidth < RESPONSIVE_XS) {
    responsive = 'crowded';
  } else if (windowWidth < RESPONSIVE_SM) {
    responsive = 'narrow';
  }

  const headerClassName = classNames(styles.header, 'clearfix', {
    'home-header': isHome,
  });

  const sharedProps: SharedProps = {
    isZhCN,
    isRTL,
  };

  const navigationNode = (
    <Navigation
      key="nav"
      {...sharedProps}
      responsive={responsive}
      isMobile={isMobile}
      directionText={nextDirectionText}
      onLangChange={onLangChange}
      onDirectionChange={onDirectionChange}
    />
  );

  let menu = [
    navigationNode,
    <Select
      key="version"
      size="small"
      className={styles.versionSelect}
      defaultValue={pkg.version}
      onChange={handleVersionChange}
      dropdownStyle={getDropdownStyle}
      popupMatchSelectWidth={false}
      getPopupContainer={(trigger) => trigger.parentNode}
      options={versionOptions}
    />,
    <SwitchBtn
      key="lang"
      onClick={onLangChange}
      value={utils.isZhCN(pathname) ? 1 : 2}
      label1="中"
      label2="En"
      tooltip1="中文 / English"
      tooltip2="English / 中文"
    />,
    <SwitchBtn
      key="direction"
      onClick={onDirectionChange}
      value={direction === 'rtl' ? 2 : 1}
      label1={<DirectionIcon className={styles.dataDirectionIcon} direction="ltr" />}
      tooltip1="LTR"
      label2={<DirectionIcon className={styles.dataDirectionIcon} direction="rtl" />}
      tooltip2="RTL"
      pure
      aria-label="RTL Switch Button"
    />,
    <a
      key="github"
      href="https://github.com/ant-design/ant-design"
      target="_blank"
      rel="noreferrer"
    >
      <SwitchBtn value={1} label1={<GithubOutlined />} tooltip1="Github" label2={null} pure />
    </a>,
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
    <header className={headerClassName}>
      {isMobile && (
        <Popover
          overlayClassName={styles.popoverMenu}
          placement="bottomRight"
          content={menu}
          trigger="click"
          open={menuVisible}
          arrow={{ pointAtCenter: true }}
          onOpenChange={onMenuVisibleChange}
        >
          <MenuOutlined className="nav-phone-icon" />
        </Popover>
      )}
      {isZhCN && bannerVisible && (
        <ConfigProvider
          theme={{
            token: {
              colorInfoBg: 'linear-gradient(90deg, #84fab0, #8fd3f4)',
              colorTextBase: '#000',
            },
          }}
        >
          <Alert
            className={styles.banner}
            message={
              <>
                <span>{isMobile ? locale.shortMessage : locale.message}</span>
                <a
                  className={styles.link}
                  href={locale.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    window.gtag?.('event', '点击', {
                      event_category: 'top_banner',
                      event_label: locale.link,
                    });
                  }}
                >
                  {locale.more}
                </a>
              </>
            }
            type="info"
            banner
            closable
            showIcon={false}
            onClose={onBannerClose}
          />
        </ConfigProvider>
      )}
      <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <Col {...colProps[0]}>
          <Logo {...sharedProps} location={location} />
        </Col>
        <Col {...colProps[1]}>
          <div className={styles.menuRow}>
            <DumiSearchBar />
            {!isMobile && menu}
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
