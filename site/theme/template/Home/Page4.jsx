import React from 'react';
import TweenOne from 'rc-tween-one';
import { FormattedMessage } from 'react-intl';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

export default function Page4() {
  return (
    <ScrollOverPack id="page4" className="content-wrapper page">
      <QueueAnim
        className="text-wrapper-bottom"
        key="text"
        leaveReverse
        type="bottom"
      >
        <h2 key="h2"><FormattedMessage id="app.home.sub-slogan" /></h2>
        <p key="p"><FormattedMessage id="app.home.vision" /></p>
      </QueueAnim>
      <TweenOne
        key="image"
        className="image4 bottom-wrapper"
        animation={{ y: 0, opacity: 1, duration: 550, delay: 150, ease: 'easeOutQuad' }}
        style={{ transform: 'translateY(50px)', opacity: 0 }}
      />
    </ScrollOverPack>
  );
}
