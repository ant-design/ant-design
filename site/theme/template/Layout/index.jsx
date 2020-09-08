import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
import { presetPalettes, presetDarkPalettes } from '@ant-design/colors';
import themeSwitcher from 'theme-switcher';
import { setTwoToneColor } from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { browserHistory } from 'bisheng/router';
// eslint-disable-next-line import/no-unresolved
import zhCN from 'antd/es/locale/zh_CN';
import Header from './Header';
import SiteContext from './SiteContext';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';

if (typeof window !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
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
  window.react = React;
  window['react-dom'] = ReactDOM;
  // eslint-disable-next-line global-require
  window.antd = require('antd');
  // eslint-disable-next-line global-require
  window['@ant-design/icons'] = require('@ant-design/icons');

  // Error log statistic
  window.addEventListener('error', function onError(e) {
    // Ignore ResizeObserver error
    if (e.message === 'ResizeObserver loop limit exceeded') {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  });

  if (process.env.NODE_ENV === 'production') {
    LogRocket.init('kpuw4z/ant-design');
    setupLogRocketReact(LogRocket);
  }
}

const RESPONSIVE_MOBILE = 768;

// for dark.css timestamp to remove cache
const timestamp = new Date().getTime();
const themeMap = {
  dark: `/dark.css?${timestamp}`,
  compact: `/compact.css?${timestamp}`,
};
const themeConfig = {
  themeMap,
};
const { switcher } = themeSwitcher(themeConfig);

export default class Layout extends React.Component {
  static contextType = SiteContext;

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;

    this.state = {
      appLocale,
      theme: 'default',
      setTheme: this.setTheme,
      direction: 'ltr',
      setIframeTheme: this.setIframeTheme,
    };
  }

  componentDidMount() {
    const { location, router } = this.props;
    router.listen(loc => {
      if (typeof window.ga !== 'undefined') {
        window.ga('send', 'pageview', loc.pathname + loc.search);
      }
      // eslint-disable-next-line
      if (typeof window._hmt !== 'undefined') {
        // eslint-disable-next-line
        window._hmt.push(['_trackPageview', loc.pathname + loc.search]);
      }
      const { pathname } = loc;
      const componentPage = /^\/?components/.test(pathname);
      // only component page can use `dark` theme
      if (!componentPage) {
        this.setTheme('default', false);
      }
    });

    if (location.query.theme && /^\/?components/.test(location.pathname)) {
      this.setTheme(location.query.theme, false);
    } else {
      this.setTheme('default', false);
    }

    if (location.query.direction) {
      this.setState({
        direction: location.query.direction,
      });
    } else {
      this.setState({
        direction: 'ltr',
      });
    }

    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    if (nprogressHiddenStyle) {
      this.timer = setTimeout(() => {
        nprogressHiddenStyle.parentNode.removeChild(nprogressHiddenStyle);
      }, 0);
    }

    this.updateMobileMode();
    window.addEventListener('resize', this.updateMobileMode);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener('resize', this.updateMobileMode);
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

  setIframeTheme = (iframeNode, theme) => {
    iframeNode.contentWindow.postMessage(
      JSON.stringify({
        action: 'change.theme',
        data: {
          themeConfig,
          theme,
        },
      }),
      '*',
    );
  };

  setTheme = (theme, persist = true) => {
    if (typeof window === 'undefined') {
      return;
    }

    switcher({
      theme,
      useStorage: persist,
    });

    const iframeNodes = document.querySelectorAll('.iframe-demo');
    // loop element node
    [].forEach.call(iframeNodes, iframeNode => {
      this.setIframeTheme(iframeNode, theme);
    });

    this.setState({
      theme,
    });
    const iconTwoToneThemeMap = {
      dark: [presetDarkPalettes.blue.primary, '#111d2c'],
      default: presetPalettes.blue.primary,
    };
    setTwoToneColor(iconTwoToneThemeMap[theme] || iconTwoToneThemeMap.default);
  };

  changeDirection = direction => {
    this.setState({
      direction,
    });
    const { pathname } = this.props.location;
    browserHistory.push({
      pathname: `/${pathname}`,
      query: { direction },
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
      <SiteContext.Provider value={{ isMobile, direction, theme, setTheme, setIframeTheme }}>
        <HelmetProvider context={helmetContext}>
          <Helmet encodeSpecialCharacters={false}>
            <html
              lang={appLocale.locale === 'zh-CN' ? 'zh' : 'en'}
              data-direction={direction}
              className={classNames({
                [`rtl`]: direction === 'rtl',
              })}
            />
            <title>{title}</title>
            <link
              rel="apple-touch-icon-precomposed"
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
              locale={appLocale.locale === 'zh-CN' ? zhCN : null}
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
