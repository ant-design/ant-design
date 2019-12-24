import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { IntlProvider } from 'react-intl';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
// eslint-disable-next-line import/no-unresolved
import zhCN from 'antd/es/locale/zh_CN';
import Header from './Header';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';

if (typeof window !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
}

if (typeof window !== 'undefined') {
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

let isMobile = false;
enquireScreen(b => {
  isMobile = b;
});
const SITE_THEME_STORE_KEY = 'site-theme';

export default class Layout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    isMobile: PropTypes.bool,
    theme: PropTypes.oneOf(['default', 'dark']),
    setTheme: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;

    this.state = {
      appLocale,
      isMobile,
      theme:
        typeof localStorage !== 'undefined'
          ? localStorage.getItem(SITE_THEME_STORE_KEY) || 'default'
          : 'default',
      setTheme: this.setTheme,
    };
  }

  getChildContext() {
    const { isMobile: mobile, theme, setTheme } = this.state;
    return { isMobile: mobile, theme, setTheme };
  }

  componentDidMount() {
    const { theme } = this.state;
    const { router } = this.context;
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
    this.setTheme(theme);

    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    if (nprogressHiddenStyle) {
      this.timer = setTimeout(() => {
        nprogressHiddenStyle.parentNode.removeChild(nprogressHiddenStyle);
      }, 0);
    }

    enquireScreen(b => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setTheme = (theme, persist = true) => {
    if (typeof window === 'undefined') {
      return;
    }
    if (theme !== 'dark') {
      const dom = document.getElementById('theme-style');
      if (dom) {
        dom.remove();
      }
      if (persist) {
        localStorage.removeItem(SITE_THEME_STORE_KEY);
      }
    } else {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'theme-style';
      style.href = `/dark.css?timestamp=${new Date().getTime()}`;
      if (persist) {
        localStorage.setItem(SITE_THEME_STORE_KEY, 'dark');
      }

      document.body.append(style);
    }
    document.body.setAttribute('data-theme', theme);
    this.setState({
      theme,
    });
  };

  render() {
    const { children, helmetContext = {}, ...restProps } = this.props;
    const { appLocale } = this.state;
    const title =
      appLocale.locale === 'zh-CN'
        ? 'Ant Design - 一套企业级 UI 设计语言和 React 组件库'
        : 'Ant Design - A UI Design Language and React UI library';
    const description =
      appLocale.locale === 'zh-CN'
        ? '基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。'
        : 'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises';
    return (
      <HelmetProvider context={helmetContext}>
        <Helmet encodeSpecialCharacters={false}>
          <html lang={appLocale.locale === 'zh-CN' ? 'zh' : 'en'} />
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
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages} defaultLocale="en-US">
          <ConfigProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null}>
            <div className="page-wrapper">
              <Header {...restProps} />
              {children}
            </div>
          </ConfigProvider>
        </IntlProvider>
      </HelmetProvider>
    );
  }
}
