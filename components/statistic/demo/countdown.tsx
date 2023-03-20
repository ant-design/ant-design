import React from 'react';
import { Col, Row, Statistic } from 'antd';
import type { StatisticProps } from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const App: React.FC = () => {
  const onFinish = () => {
    console.log('finished!');
  };

  const onChange = (val: StatisticProps['value']) => {
    if (val && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
      </Col>
      <Col span={12}>
        <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
      </Col>
      <Col span={24} style={{ marginTop: 32 }}>
        <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
      </Col>
      <Col span={12}>
        <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
      </Col>
    </Row>
  );
};

export default App;
