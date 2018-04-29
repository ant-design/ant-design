import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { enquireScreen } from 'enquire-js';
import { addLocaleData, IntlProvider } from 'react-intl';
import Header from './Header';
import Footer from './Footer';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';

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

const promoteBannerImageUrl = 'https://gw.alipayobjects.com/zos/rmsportal/bpKcpwimYnZMTarUxCEd.png';

export default class Layout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  static childContextTypes = {
    isMobile: PropTypes.bool,
  };

  getChildContext() {
    return {
      isMobile: this.state.isMobile,
    };
  }

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);

    const adBannerClosed = typeof window === 'undefined' ? true : (
      window.localStorage &&
      window.localStorage.getItem(`adBannerClosed-${promoteBannerImageUrl}`) === 'true'
    );
    this.state = {
      appLocale,
      isMobile,
      adBannerClosed,
    };
  }

  componentDidMount() {
    if (typeof window.ga !== 'undefined') {
      this.context.router.listen((loc) => {
        window.ga('send', 'pageview', loc.pathname + loc.search);
      });
    }

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
    const { appLocale } = this.state;

    const promoteBanner = this.state.adBannerClosed ? null : (
      <a href="http://www.anijue.com/p/q/yuque423/pages/home/index.html?chInfo=ch_yuquebooks__chsub_antd" className="promote-banner" onClick={this.makeAdBannerClosed}>
        <img
          src={promoteBannerImageUrl}
          alt="seeconf"
        />
        <Icon type="cross" title="close ad" onClick={this.closePromoteBanner} />
      </a>
    );

    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div className="page-wrapper">
          {promoteBanner}
          <Header {...restProps} />
          {children}
          <Footer {...restProps} />
        </div>
      </IntlProvider>
    );
  }
}
