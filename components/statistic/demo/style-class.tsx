import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Flex, Statistic } from 'antd';
import type { StatisticProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 16px;
    border-radius: 8px;
  `,
}));

const styleFn: StatisticProps['styles'] = ({ props: { value } }) => {
  const numValue = Number(value ?? 0);
  const isNegative = Number.isFinite(numValue) && numValue < 0;

  if (isNegative) {
    return {
      title: {
        color: '#ff4d4f',
      },
      content: {
        color: '#ff7875',
      },
    };
  }

  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const statisticSharedProps: StatisticProps = {
    classNames: {
      root: styles.root,
    },
    prefix: <ArrowUpOutlined />,
  };

  return (
    <Flex vertical gap="middle">
      <Statistic
        {...statisticSharedProps}
        title="Monthly Active Users"
        value={93241}
        styles={{
          title: {
            color: '#1890ff',
            fontWeight: 600,
          },
          content: {
            fontSize: '24px',
          },
        }}
        suffix="users"
      />

      <Statistic
        {...statisticSharedProps}
        title="Yearly Loss"
        value={-18.7}
        precision={1}
        styles={styleFn}
        suffix="%"
      />
    </Flex>
  );
};

export default App;
