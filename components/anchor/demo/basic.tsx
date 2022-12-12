import React from 'react';
import { Anchor, Row, Col } from 'antd';

const { Link } = Anchor;

const App: React.FC = () => (
  <Row>
    <Col span={16}>
      <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }} />
      <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }} />
      <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }} />
    </Col>
    <Col span={8}>
      <Anchor>
        <Link href="#part-1" title="Part 1" />
        <Link href="#part-2" title="Part 2" />
        <Link href="#part-3" title="Part 3" />
      </Anchor>
    </Col>
  </Row>
);

export default App;
