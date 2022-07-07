import canUseDom from 'rc-util/lib/Dom/canUseDom';
import * as React from 'react';
import Notification from '../notification';

// Alpha version warning, should remove when published
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && canUseDom()) {
  const icon: React.ReactNode = (
    <img
      alt="antd"
      style={{
        filter: ' brightness(100)',
        width: 40,
        transform: 'translateX(-10px)',
      }}
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
  );

  Notification.open({
    duration: 0,
    placement: 'top',
    message: <span style={{ color: '#FFF' }}>You are using dev version</span>,
    description: (
      <div>
        <p>Which is used for validating and may not same as final release version.</p>
        <p>DO NOT USE IN YOUR PRODUCTION!</p>
        <p style={{ marginTop: 8 }}>
          Ref:
          <a
            target="_blank"
            rel="noreferrer"
            style={{ marginInline: 4, color: '#FFF', textDecoration: 'underline' }}
            href="https://github.com/ant-design/ant-design/issues/33862#user-content-alpha-offset"
          >
            #33862 - What is in experimental?
          </a>
        </p>
      </div>
    ),
    icon,
    closeIcon: <span style={{ color: '#FFF' }}>X</span>,
    style: {
      background: '#CE5345',
      color: '#FFF',
    },
  });
}
