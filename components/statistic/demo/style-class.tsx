import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Flex, Space, Statistic, Card } from 'antd';
import type { StatisticProps } from 'antd';

const objectClassNames: StatisticProps['classNames'] = {
  root: 'demo-statistic-root',
  header: 'demo-statistic-header',
  title: 'demo-statistic-title',
  content: 'demo-statistic-content',
  prefix: 'demo-statistic-prefix',
  suffix: 'demo-statistic-suffix',
};

const objectStyles: StatisticProps['styles'] = {
  root: {
    border: '1px solid #1890ff',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  header: {
    marginBottom: 8,
  },
  title: {
    color: '#1890ff',
    fontWeight: 600,
  },
  content: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
  },
  prefix: {
    color: '#fa8c16',
  },
  suffix: {
    color: '#52c41a',
  },
};

const functionClassNames: StatisticProps['classNames'] = (info) => {
  const { props } = info;
  const value = Number(props.value ?? 0);
  const isNegative = Number.isFinite(value) && value < 0;

  return {
    root: isNegative ? 'demo-statistic-loss' : 'demo-statistic-growth',
    header: 'demo-statistic-dynamic-header',
    title: 'demo-statistic-dynamic-title',
    content: 'demo-statistic-dynamic-content',
    prefix: 'demo-statistic-dynamic-prefix',
    suffix: 'demo-statistic-dynamic-suffix',
  };
};

const functionStyles: StatisticProps['styles'] = (info) => {
  const { props } = info;
  const value = Number(props.value ?? 0);
  const isNegative = Number.isFinite(value) && value < 0;

  return {
    root: {
      borderRadius: 8,
      padding: 16,
      backgroundColor: isNegative ? '#fff1f0' : '#f6ffed',
      border: `1px solid ${isNegative ? '#ff4d4f' : '#52c41a'}`,
    },
    header: {
      color: isNegative ? '#ff4d4f' : '#52c41a',
      marginBottom: 8,
    },
    title: {
      fontWeight: 600,
    },
    content: {
      display: 'flex',
      gap: 8,
      alignItems: 'baseline',
    },
    prefix: {
      color: isNegative ? '#ff4d4f' : '#52c41a',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    suffix: {
      color: isNegative ? '#ff7875' : '#389e0d',
    },
  };
};

const App: React.FC = () => (
  <Flex gap="large" wrap="wrap">
    <Space orientation="vertical" size="large">
      <Card variant="borderless" title="Object ClassNames & Styles">
        <Statistic
          title="Monthly Active Users"
          value={93241}
          classNames={objectClassNames}
          styles={objectStyles}
          prefix={<ArrowUpOutlined />}
          suffix="users"
        />
      </Card>
      <Card variant="borderless" title="Function ClassNames & Styles (Positive)">
        <Statistic
          title="Yearly Growth"
          value={18.7}
          precision={1}
          suffix="%"
          classNames={functionClassNames}
          styles={functionStyles}
          prefix={<ArrowUpOutlined />}
        />
      </Card>
    </Space>
  </Flex>
);

export default App;
