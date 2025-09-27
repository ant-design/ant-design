import React from 'react';
import { Avatar, Badge, Card, Flex, Space } from 'antd';
import type { BadgeProps } from 'antd';
import { createStyles } from 'antd-style';
import type { RibbonProps } from 'antd/es/badge/Ribbon';

const useStylesBadge = createStyles(() => ({
  root: {
    border: '1px solid #ccc',
    borderRadius: 8,
  },
}));

const useStylesRibbon = createStyles(() => ({
  root: {
    width: 400,
    border: '1px solid #d9d9d9',
    borderRadius: 8,
  },
}));

const App: React.FC = () => {
  const { styles: badgeClassNames } = useStylesBadge();
  const { styles: ribbonClassNames } = useStylesRibbon();
  const badgeStyles: BadgeProps['styles'] = {
    root: {
      backgroundColor: '#f0f0f0',
    },
    indicator: {
      fontSize: 12,
    },
  };

  const badgeStylesFn: BadgeProps['styles'] = (info) => {
    if (info.props.size === 'default') {
      return {
        root: {
          border: '1px solid #696FC7',
        },
        indicator: {
          backgroundColor: '#696FC7',
        },
      };
    }
    return {};
  };

  const ribbonStyles: RibbonProps['styles'] = {
    content: {
      fontWeight: 'bold',
    },
    indicator: {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  };

  const ribbonStylesFn: RibbonProps['styles'] = (info) => {
    if (info.props.color === '#696FC7') {
      return {
        root: {
          border: '1px solid #696FC7',
          borderRadius: 8,
        },
        content: {
          fontWeight: 'bold',
        },
        indicator: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      };
    }
    return {};
  };

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
