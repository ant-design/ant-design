import React from 'react';
import { Avatar, Badge, Card, Space } from 'antd';
import type { BadgeProps } from 'antd';
import type { RibbonProps } from 'antd/es/badge/Ribbon';

const App: React.FC = () => {
  const badgeClassNames: BadgeProps['classNames'] = {
    root: 'custom-badge-root',
    indicator: 'custom-badge-indicator',
  };

  const badgeStyles: BadgeProps['styles'] = {
    root: {
      backgroundColor: '#f0f0f0',
      padding: '4px',
      borderRadius: '4px',
    },
    indicator: {
      fontSize: '12px',
      fontWeight: 'bold',
    },
  };

  const ribbonClassNames: RibbonProps['classNames'] = {
    root: 'custom-ribbon-root',
    content: 'custom-ribbon-content',
    indicator: 'custom-ribbon-indicator',
  };

  const ribbonStyles: RibbonProps['styles'] = {
    root: {
      border: '2px solid #d9d9d9',
      borderRadius: '8px',
    },
    content: {
      fontWeight: 'bold',
    },
    indicator: {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  };

  return (
    <Space size="large" style={{ width: '100%' }}>
      <Space size="large">
        <Badge count={5} classNames={badgeClassNames} styles={badgeStyles}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge dot classNames={badgeClassNames} styles={badgeStyles}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge status="success" text="Success" classNames={badgeClassNames} styles={badgeStyles} />
      </Space>

      <Badge.Ribbon
        text="Custom Ribbon"
        color="purple"
        classNames={ribbonClassNames}
        styles={ribbonStyles}
      >
        <Card title="Card with custom ribbon" size="small">
          This card has a customized ribbon with semantic classNames and styles.
        </Card>
      </Badge.Ribbon>
    </Space>
  );
};

export default App;
