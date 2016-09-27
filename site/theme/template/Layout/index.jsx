import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import Header from './Header';
import Footer from './Footer';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import '../../static/style';

// Expose to iframe
window.react = React;
window['react-dom'] = ReactDOM;
window.antd = require('antd');

const language = (typeof localStorage === 'undefined' || !localStorage.getItem('locale')) ?
        navigator.language : localStorage.getItem('locale');
const isZhCN = language === 'zh-CN';

const appLocale = isZhCN ? cnLocale : enLocale;
addLocaleData(appLocale.data);

export default class Layout extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

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

  render() {
    const { children, ...restProps } = this.props;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div className="page-wrapper">
          <Header {...restProps} />
          {children}
          <Footer />
        </div>
      </IntlProvider>
    );
  }
}
