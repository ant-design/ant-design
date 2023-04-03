import { Col, Input, QRCode, Row } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [text, setText] = React.useState('https://ant.design/');

  return (
    <Row>
      <Col span={24}>
        <QRCode value={text} />
      </Col>
      <Col span={24}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
      </Col>
    </Row>
  );
};

export default App;
