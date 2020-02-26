import * as React from 'react';
import { Button, Popover } from 'antd';
import { Link } from 'bisheng/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { PlayCircleFilled } from '@ant-design/icons';
import Background from './Background';
import { getLocalizedPathname } from '../../utils';
import Logo from './Logo';

import './index.less';

export default function Banner() {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  let qrNode: React.ReactElement | null = null;

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

          {isZhCN && (
            <div className="banner-qr">
              <Popover
                placement="bottom"
                overlayClassName="banner-qr-code"
                content={
                  <div>
                    <img
                      alt="qr"
                      src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*eafgRK7InNMAAAAAAAAAAABkARQnAQ"
                    />
                    <p>
                      <FormattedMessage id="app.home.qr.desc" />
                    </p>
                  </div>
                }
              >
                <a>
                  <FormattedMessage id="app.home.qr" />
                </a>
              </Popover>
            </div>
          )}

          <div className="home-banner-content-operations">
            <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
              <Button type="primary" shape="round">
                <FormattedMessage id="app.home.getting-started" />
              </Button>
            </Link>
            <Link to={getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
              <Button shape="round" ghost>
                <FormattedMessage id="app.home.design-language" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
