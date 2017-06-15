import React from 'react';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Icon, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import * as utils from '../utils';

export default function Page1({ location }) {
  return (
    <ScrollOverPack id="page1" className="content-wrapper page">
      <TweenOne
        key="image"
        className="image1 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
        style={{ transform: 'translateX(-100px)', opacity: 0 }}
      />
      <QueueAnim className="text-wrapper" key="text" leaveReverse>
        <h2 key="h2"><FormattedMessage id="app.home.best-practice" /></h2>
        <p key="p" style={{ maxWidth: 310 }}><FormattedMessage id="app.home.experience" /></p>
        <div key="button">
          <Link to={utils.getLocalizedPathname('/docs/spec/cases', utils.isZhCN(location.pathname))}>
            <Button type="primary" size="large">
              <FormattedMessage id="app.home.learn-more" />
              <Icon type="right" />
            </Button>
          </Link>
        </div>
      </QueueAnim>
    </ScrollOverPack>
  );
}
