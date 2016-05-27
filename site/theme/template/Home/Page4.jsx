import React from 'react';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

export default function Page4() {
  return (
    <ScrollOverPack scrollName="page4" className="content-wrapper page" playScale={1}>
      <QueueAnim className="text-wrapper-bottom" delay={300} key="text" duration={550} leaveReverse type="bottom"
        hideProps={{ child: null }}>
        <h2 key="h2">微小·确定·幸福</h2>
        <p key="p">这是一套致力于提升『用户』和『设计者』使用体验的中后台设计语言。</p>
      </QueueAnim>
      <TweenOne key="image" className="image4 bottom-wrapper" animation={{ y: 0, opacity: 1, duration: 550, delay: 550 }}
        style={{ transform: 'translateY(50px)', opacity: 0 }} hideProps={{ reverse: true }} />
    </ScrollOverPack>
  );
}
