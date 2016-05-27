import React from 'react';
import DocumentTitle from 'react-document-title';
import Layout from '../Layout';
import Link from './Link';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

export default class Home extends React.Component {
  // To store style which is only for Home and has conflicts with others.
  getStyle() {
    return `
      #react-content,
      #react-content > div {
        height: 100%;
      }
      .main-wrapper {
        background: transparent;
        width: auto;
        margin: 0;
        border-radius: 0;
        padding: 0;
        overflow: unset;
        display: inline;
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
      #header.home-nav-white {
        background: rgba(255, 255, 255, 0.9);
        border-bottom-color: #EBEDEE;
      }
      .home-nav-white #search-box {
        border-left-color: #EBEDEE;
      }
      .home-nav-white #nav a {
        color: #666;
      }
      .nav-phone-icon:before {
        background: #eee;
        box-shadow: 0 7px 0 0 #eee, 0 14px 0 0 #eee;
      }
      .home-nav-white .nav-phone-icon:before {
        background: #777;
        box-shadow: 0 7px 0 0 #777, 0 14px 0 0 #777;
      }
      #lang,
      #nav a {
        color: #eee;
        transition: color 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }
      #search-box {
        border-left-color: rgba(235, 237, 238, .5);
        transition: border 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }
      section {
        height: 100%;
        width: 100%;
        background: #fff;
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

  render() {
    return (
      <DocumentTitle title="Ant Design - 一个 UI 设计语言">
        <Layout {...this.props}>
          <div className="main-wrapper">
            <Link />
            <Banner />
            <Page1 />
            <Page2 />
            <Page3 />
            <Page4 />
            <style dangerouslySetInnerHTML={{ __html: this.getStyle() }} />
          </div>
        </Layout>
      </DocumentTitle>
    );
  }
}
