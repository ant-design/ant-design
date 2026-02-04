import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Col, ConfigProvider, Flex, Radio, Row, Switch } from 'antd';

const App: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setChecked((prev) => !prev);
    }, 500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const nodes = (
    <Flex gap="small">
      <Checkbox checked={checked}>Checkbox</Checkbox>
      <Radio checked={checked}>Radio</Radio>
      <Switch checked={checked} />
    </Flex>
  );

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>{nodes}</Col>
      <Col span={24}>
        <ConfigProvider theme={{ token: { motion: false } }}>{nodes}</ConfigProvider>
      </Col>
    </Row>
  );
};

export default App;
