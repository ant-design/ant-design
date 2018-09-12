import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { addLocaleData, IntlProvider } from 'react-intl';
import 'moment/locale/zh-cn';
import { Icon, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import OfflineRuntime from '@yesmeck/offline-plugin/runtime';
import Header from './Header';
import Footer from './Footer';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';

if (typeof window !== 'undefined') {
  OfflineRuntime.install();
}

if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  require('../../static/style');

  // Expose to iframe
  window.react = React;
  window['react-dom'] = ReactDOM;
  window.antd = require('antd');
  /* eslint-enable global-require */
}

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

const promoteBannerImageUrl = 'https://gw.alipayobjects.com/zos/rmsportal/qlgWfsMcCJgTdGxWuLxW.png';

export default class Layout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    isMobile: PropTypes.bool,
  };

  getChildContext() {
    const { isMobile: mobile } = this.state;
    return { isMobile: mobile };
  }

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);

    const adBannerClosed = (
      typeof window !== 'undefined'
        && window.localStorage
        && window.localStorage.getItem(`adBannerClosed-${promoteBannerImageUrl}`) === 'true'
    );
    this.state = {
      appLocale,
      isMobile,
      adBannerClosed,
    };
  }

  componentDidMount() {
    const { router } = this.context;
    router.listen((loc) => {
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

    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  closePromoteBanner = (e) => {
    e.preventDefault();
    this.makeAdBannerClosed();
  }

  makeAdBannerClosed = () => {
    this.setState({
      adBannerClosed: true,
    });
    if (window.localStorage) {
      window.localStorage.setItem(`adBannerClosed-${promoteBannerImageUrl}`, 'true');
    }
  }

  render() {
    const { children, ...restProps } = this.props;
    const { appLocale, adBannerClosed } = this.state;
    const promoteBanner = adBannerClosed ? null : (
      <a href="https://www.yuque.com/ant-design/course" className="promote-banner" onClick={this.makeAdBannerClosed}>
        <img
          src={promoteBannerImageUrl}
          alt="seeconf"
        />
        <Icon type="close" title="close ad" onClick={this.closePromoteBanner} />
      </a>
    );

    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <LocaleProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null}>
          <div className="page-wrapper">
            {promoteBanner}
            <Header {...restProps} />
            {children}
            <Footer {...restProps} />
          </div>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}
