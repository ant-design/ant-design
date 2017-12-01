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
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      width: 100%;
      position: absolute;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
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
