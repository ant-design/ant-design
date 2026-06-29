import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import { createStyles } from 'antd-style';
import CountUp from 'react-countup';

const useStyle = createStyles(({ css }) => {
  return {
    content: css`
      font-variant-numeric: tabular-nums;
    `,
  };
});

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const Demo: React.FC = () => {
  const { styles } = useStyle();
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          classNames={{ content: styles.content }}
          title="Active Users"
          value={112893}
          formatter={formatter}
        />
      </Col>
      <Col span={12}>
        <Statistic
          classNames={{ content: styles.content }}
          title="Account Balance (CNY)"
          value={112893}
          precision={2}
          formatter={formatter}
        />
      </Col>
    </Row>
  );
};

export default Demo;
