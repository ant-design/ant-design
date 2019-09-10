import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { IntlProvider } from 'react-intl';
import { Helmet } from 'react-helmet';
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

export default class Layout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    isMobile: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;

    this.state = {
      appLocale,
      isMobile,
    };
  }

  getChildContext() {
    const { isMobile: mobile } = this.state;
    return { isMobile: mobile };
  }

  componentDidMount() {
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
    });

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

  render() {
    const { children, ...restProps } = this.props;
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
      <>
        <Helmet>
          <html lang={appLocale.locale === 'zh-CN' ? 'zh' : 'en'} />
          <title>{title}</title>
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
      </>
    );
  }
}
