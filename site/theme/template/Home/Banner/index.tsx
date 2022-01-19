import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'bisheng/router';
import { FormattedMessage, useIntl } from 'react-intl';
import Background from './Background';
import { getLocalizedPathname } from '../../utils';
import Logo from './Logo';

import './index.less';

const Banner = (props: { location: any }) => {
  const { location } = props;
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

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

          <div className="home-banner-content-operations">
            <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN, location.query)}>
              <Button type="primary" shape="round">
                <FormattedMessage id="app.home.getting-started" />
              </Button>
            </Link>
            <Link to={getLocalizedPathname('/docs/spec/introduce', isZhCN, location.query)}>
              <Button shape="round" ghost>
                <FormattedMessage id="app.home.design-language" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
