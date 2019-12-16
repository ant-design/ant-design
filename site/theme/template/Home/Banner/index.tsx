import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Background from './Background';
import Logo from './Logo';

import './index.less';

export default function Banner() {
  return (
    <div className="home-banner">
      <Background />

      <div className="home-banner-content">
        <div>
          <Logo />
        </div>
        <FormattedMessage id="app.home.introduce" />
      </div>
    </div>
  );
}
