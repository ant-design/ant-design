import React from 'react';
import { Link } from 'react-router';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Icon, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default function Page3() {
  return (
    <ScrollOverPack scrollName="page3" className="content-wrapper page" playScale={1} replay>
      <TweenOne key="image" className="image3 image-wrapper" animation={{ x: 0, opacity: 1, duration: 550 }}
        style={{ transform: 'translateX(-100px)', opacity: 0 }} hideProps={{ reverse: true }} />
      <QueueAnim className="text-wrapper" delay={300} key="text" duration={550} leaveReverse style={{ top: '40%' }}
        hideProps={{ child: null }}>
        <h2 key="h2">丰富的基础组件</h2>
        <p key="p" style={{ maxWidth: 280 }}>丰富、灵活、实用的基础组件，为业务产品提供强有力的设计支持。</p>
        <div key="button">
          <Link to="/docs/react">
            <Button type="primary" size="large">
              了解更多
              <Icon type="right" />
            </Button>
          </Link>
        </div>
      </QueueAnim>
    </ScrollOverPack>
  );
}
