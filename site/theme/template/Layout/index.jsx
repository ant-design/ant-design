import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
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

const appLocale = utils.isZhCN() ? cnLocale : enLocale;
addLocaleData(appLocale.data);

export default class Layout extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  state = {
    isFirstScreen: true,
  };

  componentDidMount() {
    if (typeof ga !== 'undefined') {
      this.context.router.listen((loc) => {
        window.ga('send', 'pageview', loc.pathname + loc.search);
      });
    }

    const loadingNode = document.getElementById('ant-site-loading');
    if (loadingNode) {
      this.timer = setTimeout(() => {
        loadingNode.parentNode.removeChild(loadingNode);
      }, 450);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onEnterChange = (mode) => {
    this.setState({
      isFirstScreen: mode === 'enter',
    });
  }

  render() {
    const { children, ...restProps } = this.props;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <LocaleProvider locale={enUS}>
          <div className="page-wrapper">
            <Header {...restProps} isFirstScreen={this.state.isFirstScreen} />
            {cloneElement(children, { onEnterChange: this.onEnterChange })}
            <Footer />
          </div>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}
