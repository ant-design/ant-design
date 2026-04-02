import React from 'react';
import { Col, Container, Row } from 'antd';

const App: React.FC = () => (
  <Container type="inline-size" maxWidth="md">
    <Row>
      <Col span={24} sm={12} md={8} lg={6}>
        col
      </Col>
      <Col span={24} sm={12} md={8} lg={6}>
        col
      </Col>
      <Col span={24} sm={12} md={8} lg={6}>
        col
      </Col>
      <Col span={24} sm={12} md={8} lg={6}>
        col
      </Col>
    </Row>
  </Container>
);

export default App;
