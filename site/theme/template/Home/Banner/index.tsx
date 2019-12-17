import * as React from 'react';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { PlayCircleFilled } from '@ant-design/icons';
import Background from './Background';
import Logo from './Logo';

import './index.less';

export default function Banner() {
  return (
    <div className="home-banner">
      <Background />

      <div className="home-banner-holder">
        <div className="home-banner-content">
          <div>
            <Logo />
          </div>
          <p>
            <FormattedMessage id="app.home.introduce" />
          </p>

          <a>
            <PlayCircleFilled /> <FormattedMessage id="app.home.play-video" />
          </a>

          <div className="home-banner-content-operations">
            <Button type="primary" shape="round">
              <FormattedMessage id="app.home.getting-started" />
            </Button>
            <Button shape="round">
              <FormattedMessage id="app.home.design-language" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
