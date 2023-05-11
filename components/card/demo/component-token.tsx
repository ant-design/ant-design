import { Card, ConfigProvider } from 'antd';
import React from 'react';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Card: {
          headPadding: 20,
          innerHeadPadding: 20,
          cardPaddingSM: 16,
          headHeight: 36,
          headHeightSM: 26,
          cardPaddingBase: 6,
          cardPaddingBaseSm: 4,
          cardShadow: '0 0 1px red',
          actionsLiMargin: `14px 0`,
          tabsMarginBottom: 20,
          actionsIconSize: 20,
          headColor: 'red',
          headBackground: '#eee',
          headFontSize: 22,
          headFontSizeSm: 16,
          actionsBackground: '#afb321',
          cardBackground: '#342bab',
          cardRadius: 6,
          headExtraColor: '#f6f1ed',
        },
      },
    }}
  >
    <Card title="Card title">
      <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
        Inner Card content
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Inner Card title"
        extra={<a href="#">More</a>}
      >
        Inner Card content
      </Card>
    </Card>
    <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </ConfigProvider>
);
