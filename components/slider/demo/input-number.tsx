import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider, Space } from 'antd';

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const DecimalStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);

  const onChange: InputNumberProps['onChange'] = (value) => {
    if (Number.isNaN(value)) {
      return;
    }
    setInputValue(value as number);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={1}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={0.01}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={1}
          style={{ margin: '0 16px' }}
          step={0.01}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const App: React.FC = () => (
  <Space style={{ width: '100%' }} direction="vertical">
    <IntegerStep />
    <DecimalStep />
  </Space>
);

export default App;
