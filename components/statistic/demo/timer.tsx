import React from 'react';
import type { StatisticTimerProps } from 'antd';
import { Col, Row, Statistic } from 'antd';

const { Timer } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
const before = Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
const tenSecondsLater = Date.now() + 10 * 1000;

const onFinish: StatisticTimerProps['onFinish'] = () => {
  console.log('finished!');
};

const onChange: StatisticTimerProps['onChange'] = (val) => {
  if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
};

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Timer type="countdown" value={deadline} onFinish={onFinish} />
    </Col>
    <Col span={12}>
      <Timer type="countdown" title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
    </Col>
    <Col span={12}>
      <Timer type="countdown" title="Countdown" value={tenSecondsLater} onChange={onChange} />
    </Col>
    <Col span={12}>
      <Timer type="countup" title="Countup" value={before} onChange={onChange} />
    </Col>
    <Col span={24} style={{ marginTop: 32 }}>
      <Timer
        type="countdown"
        title="Day Level (Countdown)"
        value={deadline}
        format="D 天 H 时 m 分 s 秒"
      />
    </Col>
    <Col span={24} style={{ marginTop: 32 }}>
      <Timer
        type="countup"
        title="Day Level (Countup)"
        value={before}
        format="D 天 H 时 m 分 s 秒"
      />
    </Col>
  </Row>
);

export default App;
