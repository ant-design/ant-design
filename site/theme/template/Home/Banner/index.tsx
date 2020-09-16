import * as React from 'react';
import { Button, Popover } from 'antd';
import { Link } from 'bisheng/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { PlayCircleFilled } from '@ant-design/icons';
import Background from './Background';
import { getLocalizedPathname } from '../../utils';
import Logo from './Logo';

import './index.less';
import SiteContext from '../../Layout/SiteContext';

const Banner = (props: { location: any }) => {
  const { location } = props;
  const { isMobile } = React.useContext(SiteContext);
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  let qrNode: React.ReactElement | null = null;
  if (isMobile) {
    qrNode = (
      <a href="http://antd4.antfin.com/">
        <img
          alt="mobile"
          src="https://gw.alipayobjects.com/zos/basement_prod/d2fa63a8-3e9d-4f59-80c7-1fd1d0cd9118.svg"
        />
        <FormattedMessage id="app.home.qr" />
      </a>
    );
  } else {
    qrNode = (
      <Popover
        placement="bottom"
        overlayClassName="banner-qr-code"
        content={
          <div>
            <img
              alt="qr"
              src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DKgST5luH_cAAAAAAAAAAABkARQnAQ"
            />
            <p>
              <FormattedMessage id="app.home.qr.desc" />
            </p>
          </div>
        }
      >
        <a>
          <img
            alt="mobile"
            src="https://gw.alipayobjects.com/zos/basement_prod/d2fa63a8-3e9d-4f59-80c7-1fd1d0cd9118.svg"
          />
          <FormattedMessage id="app.home.qr" />
        </a>
      </Popover>
    );
  }

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

          <a className="banner-video">
            <PlayCircleFilled /> <FormattedMessage id="app.home.play-video" />
          </a>

          {isZhCN && <div className="banner-qr">{qrNode}</div>}

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
