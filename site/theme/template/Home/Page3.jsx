import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Icon, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default function Page3({ location }) {
  return (
    <ScrollOverPack id="page3" className="content-wrapper page" playScale={1} replay
      hideProps={{ image: { reverse: true } }}
    >
      <TweenOne key="image" className="image3 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
        style={{ transform: 'translateX(-100px)', opacity: 0 }}
      />
      <QueueAnim className="text-wrapper" key="text"
        leaveReverse style={{ top: '40%' }}
      >
        <h2 key="h2"><FormattedMessage id="app.home.reusable-components" /></h2>
        <p key="p" style={{ maxWidth: 280 }}><FormattedMessage id="app.home.components-intro" /></p>
        <div key="button">
          <Link to={{ query: location.query, pathname: '/docs/react/introduce' }}>
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
