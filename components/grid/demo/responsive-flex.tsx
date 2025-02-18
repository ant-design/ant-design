import React from 'react';
import { Col, Row } from 'antd';

const App: React.FC = () => (
  <Row>
    {Array.from({ length: 10 }).map((_, index) => {
      const key = `col-${index}`;
      return (
        <Col
          key={key}
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '10%' }}
        >
          Col
        </Col>
      );
    })}
  </Row>
);

export default App;
