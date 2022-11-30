/* eslint-disable class-methods-use-this */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
import { presetPalettes, presetDarkPalettes } from '@ant-design/colors';
import themeSwitcher from 'theme-switcher';
import type { TwoToneColor } from '@ant-design/icons';
import { setTwoToneColor } from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from 'antd';
import { browserHistory } from 'bisheng/router';
import zhCN from 'antd/es/locale/zh_CN';
import type { DirectionType } from 'antd/es/config-provider';
import Header from './Header';
import type { SiteContextProps } from './SiteContext';
import SiteContext from './SiteContext';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';
import 'moment/locale/zh-cn';

if (typeof window !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

if (typeof window !== 'undefined') {
  // Redirect to `ant.design` if is not next version anymore
  if (location.hostname === 'next.ant.design') {
    location.href = location.href.replace('next.ant.design', 'ant.design');
  }

  // eslint-disable-next-line global-require
  require('../../static/style');

  // Expose to iframe
  (window as any).react = React;
  (window as any)['react-dom'] = ReactDOM;
  // eslint-disable-next-line global-require
  (window as any).antd = require('antd');
  // eslint-disable-next-line global-require
  (window as any)['@ant-design/icons'] = require('@ant-design/icons');

  // Error log statistic
  window.addEventListener('error', (e) => {
    // Ignore ResizeObserver error
    if (e.message === 'ResizeObserver loop limit exceeded') {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  });
}

const RESPONSIVE_MOBILE = 768;

// for dark.css timestamp to remove cache
const timestamp = Date.now();
const themeMap = {
  dark: `/dark.css?${timestamp}`,
  compact: `/compact.css?${timestamp}`,
};
const themeConfig = {
  themeMap,
};
const { switcher } = themeSwitcher(themeConfig);

interface LayoutPropsType {
  location: any;
  router: any;
  helmetContext: any;
  children: React.ReactNode;
}

interface LayoutStateType {
  appLocale: typeof cnLocale | typeof enLocale;
  theme: string;
  isMobile: boolean;
  direction: DirectionType;
  setTheme: SiteContextProps['setTheme'];
  setIframeTheme: SiteContextProps['setIframeTheme'];
}

export default class Layout extends React.Component<LayoutPropsType, LayoutStateType> {
  static contextType = SiteContext;

  timer: NodeJS.Timeout | null = null;

  isBeforeComponent = false;

  constructor(props: LayoutPropsType) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;

    this.state = {
      appLocale,
      theme: 'default',
      direction: 'ltr',
      isMobile: false,
      setTheme: this.setTheme,
      setIframeTheme: this.setIframeTheme,
    };
  }

  componentDidMount() {
    const { location, router } = this.props;
    router.listen(({ pathname, search }: any) => {
      const { theme } = this.props.location.query;
      if (typeof (window as any).ga !== 'undefined') {
        (window as any).ga('send', 'pageview', pathname + search);
      }
      if (typeof (window as any)._hmt !== 'undefined') {
        (window as any)._hmt.push(['_trackPageview', pathname + search]);
      }
      const componentPage = /^\/?components/.test(pathname);

      // only component page can use `dark` theme
      if (!componentPage) {
        this.isBeforeComponent = false;
        this.setTheme?.('default', false);
      } else if (theme && !this.isBeforeComponent) {
        this.isBeforeComponent = true;
        this.setTheme?.(theme, false);
      }
    });

    if (location.query.theme && /^\/?components/.test(location.pathname)) {
      this.isBeforeComponent = true;
      this.setTheme?.(location.query.theme, false);
    } else {
      this.isBeforeComponent = false;
      this.setTheme?.('default', false);
    }

    this.setState({ direction: location.query.direction || 'ltr' });

    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    if (nprogressHiddenStyle) {
      this.timer = setTimeout(() => {
        nprogressHiddenStyle.parentNode?.removeChild(nprogressHiddenStyle);
      }, 0);
    }

    this.updateMobileMode();
    window.addEventListener('resize', this.updateMobileMode);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobileMode);
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  updateMobileMode = () => {
    const { isMobile } = this.state;
    const newIsMobile = window.innerWidth < RESPONSIVE_MOBILE;
    if (isMobile !== newIsMobile) {
      this.setState({
        isMobile: newIsMobile,
      });
    }
  };

  setIframeTheme: LayoutStateType['setIframeTheme'] = (iframeNode, theme) => {
    iframeNode.contentWindow?.postMessage(
      JSON.stringify({
        action: 'change.theme',
        data: { themeConfig, theme },
      }),
    );
  };

  setTheme: LayoutStateType['setTheme'] = (theme, persist = true) => {
    if (typeof window === 'undefined') {
      return;
    }

    switcher({
      theme,
      useStorage: persist,
    });

    const iframeNodes = document.querySelectorAll('.iframe-demo');
    // loop element node
    [].forEach.call(iframeNodes, (iframeNode: HTMLIFrameElement) => {
      this.setIframeTheme?.(iframeNode, theme);
    });

    this.setState({ theme });
    const iconTwoToneThemeMap = {
      dark: [presetDarkPalettes.blue.primary, '#111d2c'],
      default: presetPalettes.blue.primary,
    } as const;
    setTwoToneColor(
      (iconTwoToneThemeMap[theme as keyof typeof iconTwoToneThemeMap] ||
        iconTwoToneThemeMap.default) as TwoToneColor,
    );
  };

  changeDirection = (direction: DirectionType): void => {
    this.setState({ direction });
    const { pathname, hash, query } = this.props.location;
    if (direction === 'ltr') {
      delete query.direction;
    } else {
      query.direction = 'rtl';
    }
    browserHistory.push({
      pathname: `/${pathname}`,
      query,
      hash,
    });
  };

  render() {
    const { children, helmetContext = {}, ...restProps } = this.props;
    const { appLocale, direction, isMobile, theme, setTheme, setIframeTheme } = this.state;
    const title =
      appLocale.locale === 'zh-CN'
        ? 'Ant Design - 一套企业级 UI 设计语言和 React 组件库'
        : "Ant Design - The world's second most popular React UI framework";
    const description =
      appLocale.locale === 'zh-CN'
        ? '基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。'
        : 'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises';

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <SiteContext.Provider value={{ isMobile, direction, theme, setTheme, setIframeTheme }}>
        <HelmetProvider context={helmetContext}>
          <Helmet encodeSpecialCharacters={false}>
            <html
              lang={appLocale.locale === 'zh-CN' ? 'zh' : 'en'}
              data-direction={direction}
              className={classNames({ [`rtl`]: direction === 'rtl' })}
            />
            <title>{title}</title>
            <link
              sizes="144x144"
              href="https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"
            />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content="https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"
            />
          </Helmet>
          <IntlProvider
            locale={appLocale.locale}
            messages={appLocale.messages}
            defaultLocale="en-US"
          >
            <ConfigProvider
              locale={appLocale.locale === 'zh-CN' ? zhCN : undefined}
              direction={direction}
            >
              <Header {...restProps} changeDirection={this.changeDirection} />
              {children}
            </ConfigProvider>
          </IntlProvider>
        </HelmetProvider>
      </SiteContext.Provider>
    );
  }
}
