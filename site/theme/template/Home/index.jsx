import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
// To store style which is only for Home and has conflicts with others.
function getStyle() {
  return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      max-width: 1200px;
      width: 100%;
      margin: 20px auto 0;
      padding: 0 24px;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
    #header #logo {
      padding: 0;
    }
    #header .ant-row > div:last-child, #header .nav-phone-icon{
      display: none;
    }
    footer .footer-wrap{
      width: 100%;
      padding: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    }
    footer .footer-wrap .ant-row{
      width: 100%;
      max-width: 1200px;
      padding: 86px 24px 93px 24px;
      margin: auto;
      
    }
    footer .bottom-bar{
      margin: auto;
      max-width: 1200px;
      padding: 16px 24px;
      border-top: none;
    }
    @media only screen and (max-width: 768px) {
      footer .footer-wrap .ant-row{
        padding: 0;
      }
    }
  `;
}

const promoteBannerImageUrl = 'https://gw.alipayobjects.com/zos/rmsportal/qVVhewfLyIYZnqrBvfhy.png';

class Home extends React.Component {
  static contextTypes = {
    isMoblie: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    const adBannerClosed = typeof window === 'undefined' ? true : (
      window.localStorage &&
      window.localStorage.getItem(`adBannerClosed-${promoteBannerImageUrl}`) === 'true'
    );
    this.state = { adBannerClosed };
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
    const { isMoblie } = this.context;
    const childProps = { ...this.props, isMoblie };
    const promoteBanner = this.state.adBannerClosed ? null : (
      <a href="http://seeconf.alipay.com/" className="promote-banner" onClick={this.makeAdBannerClosed}>
        <img
          src={promoteBannerImageUrl}
          alt="seeconf"
        />
        <Icon type="cross" title="close ad" onClick={this.closePromoteBanner} />
      </a>
    );
    return (
      <DocumentTitle title={`Ant Design - ${this.props.intl.formatMessage({ id: 'app.home.slogan' })}`}>
        <div className="main-wrapper">
          {promoteBanner}
          <Banner {...childProps} />
          <Page1 {...childProps} />
          <Page2 {...childProps} />
          <Page3 {...childProps} />
          <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
        </div>
      </DocumentTitle>
    );
  }
}

export default injectIntl(Home);
