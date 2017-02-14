import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
// To store style which is only for Home and has conflicts with others.
function getStyle() {
  return `
    html, body{
      height: auto;
    }
    .page-wrapper {
      background: #fff;
    }
    .main-wrapper {
      background: transparent;
      width: auto;
      margin: 0;
      border-radius: 0;
      padding: 0;
      min-height: 600px;
    }
    #header {
      position: fixed;
      z-index: 999;
      background: rgba(0, 0, 0, 0.25);
      border-bottom: 1px solid transparent;
      transition: border .5s cubic-bezier(0.455, 0.03, 0.515, 0.955), background .5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
    #header .ant-select-search__field {
      color: #eee;
    }
    #header .ant-select-selection__placeholder {
      color: rgba(255,255,255,0.57);
    }
    #header.home-nav-white .ant-select-search__field {
      color: rgba(0, 0, 0, 0.65);
    }
    #header.home-nav-white .ant-select-selection__placeholder {
      color: rgb(204, 204, 204);
    }
    #header.home-nav-white {
      background: rgba(255, 255, 255, 0.91);
      border-bottom-color: #EBEDEE;
    }
    .home-nav-white #search-box {
      border-left-color: #EBEDEE;
    }
    .home-nav-white #nav a {
      color: rgba(0, 0, 0, 0.65);
    }
    .home-nav-white .lang:not(:hover) {
      color: rgba(0, 0, 0, 0.65);
      border-color: rgba(0, 0, 0, 0.65);
    }
    .home-nav-white .version > .ant-select-selection {
      color: rgba(0, 0, 0, 0.65);
    }
    .home-nav-white .version > .ant-select-selection:not(:hover) {
      border-color: rgba(0, 0, 0, 0.65);
    }
    .nav-phone-icon:before {
      background: #eee;
      box-shadow: 0 7px 0 0 #eee, 0 14px 0 0 #eee;
    }
    .home-nav-white .nav-phone-icon:before {
      background: #777;
      box-shadow: 0 7px 0 0 #777, 0 14px 0 0 #777;
    }
    .lang,
    .version > .ant-select-selection,
    #nav a {
      color: #eee;
      transition: all 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
    #search-box {
      border-left-color: rgba(235, 237, 238, .5);
      transition: border 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
    #footer {
      background: #000;
    }
    #footer,
    #footer h2 {
      color: #999;
    }
    #footer a {
      color: #eee;
    }
    .down {
      animation: upDownMove 1.2s ease-in-out infinite;
    }
  `;
}

function Home(props) {
  return (
    <DocumentTitle title={`Ant Design - ${props.intl.formatMessage({ id: 'app.home.slogan' })}`}>
      <div className="main-wrapper">
        <Banner {...props} />
        <Page1 {...props} />
        <Page2 {...props} />
        <Page3 {...props} />
        <Page4 {...props} />
        <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
      </div>
    </DocumentTitle>
  );
}

export default injectIntl(Home);
