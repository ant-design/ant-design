import React from 'react';
import { Avatar, Badge, Card, Flex, Space } from 'antd';
import type { BadgeProps } from 'antd';
import { createStaticStyles } from 'antd-style';
import type { RibbonProps } from 'antd/es/badge/Ribbon';

const badgeClassNames = createStaticStyles(({ css }) => ({
  indicator: css`font-size: 10px;`,
}));

const ribbonClassNames = createStaticStyles(({ css }) => ({
  root: css`width: 400px; border: 1px solid #d9d9d9; border-radius: 10px;`,
}));

const badgeStyles: BadgeProps['styles'] = {
  root: {
    borderRadius: 8,
  },
};

const ribbonStyles: RibbonProps['styles'] = {
  indicator: {
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

const badgeStylesFn: BadgeProps['styles'] = (info) => {
  if (info.props.size === 'default') {
    return {
      indicator: {
        fontSize: 14,
        backgroundColor: '#696FC7',
      },
    } satisfies BadgeProps['styles'];
  }
  return {};
};

const ribbonStylesFn: RibbonProps['styles'] = (info) => {
  if (info.props.color === '#696FC7') {
    return {
      content: {
        fontWeight: 'bold',
      },
      indicator: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    } satisfies RibbonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Space size="large" vertical>
      <Flex gap="middle">
        <Badge size="small" count={5} classNames={badgeClassNames} styles={badgeStyles}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={5} classNames={badgeClassNames} styles={badgeStylesFn}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Flex>
      <Flex vertical gap="middle">
        <Badge.Ribbon text="Custom Ribbon" classNames={ribbonClassNames} styles={ribbonStyles}>
          <Card title="Card with custom ribbon" size="small">
            This card has a customized ribbon with semantic classNames and styles.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon
          text="Custom Ribbon"
          color="#696FC7"
          classNames={ribbonClassNames}
          styles={ribbonStylesFn}
        >
          <Card title="Card with custom ribbon" size="small">
            This card has a customized ribbon with semantic classNames and styles.
          </Card>
        </Badge.Ribbon>
      </Flex>
    </Space>
  );
};

export default App;
