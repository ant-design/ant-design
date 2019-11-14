import React from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Footer from '../Layout/Footer';

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
    #header #nav .ant-menu-item {
      border-color: transparent;
    }
    #header #nav .ant-menu-submenu {
      border-color: transparent;
    }
    #header #nav .ant-menu-item.hide-in-home-page {
      display: none;
    }
    #header .ant-row > div:last-child .header-lang-button {
      margin-right: 0;
    }
    .rc-footer-container {
      max-width: 1200px;
      padding: 80px 0;
    }

    .rc-footer-bottom-container {
      max-width: 1200px;
    }

    .rc-footer-columns {
      justify-content: space-around;
    }
  `;
}

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {
  static contextTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

  render() {
    const { intl } = this.props;
    const { isMobile } = this.context;
    const childProps = { ...this.props, isMobile, locale: intl.locale };
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: getStyle() }} /> {/* eslint-disable-line */}
        <Helmet encodeSpecialCharacters={false}>
          <title>{`Ant Design - ${intl.formatMessage({ id: 'app.home.slogan' })}`}</title>
        </Helmet>
        <Banner {...childProps} />
        <Page1 {...childProps} />
        <Page2 {...childProps} />
        <Page3 {...childProps} />
        <Footer />
      </>
    );
  }
}

export default injectIntl(Home);
