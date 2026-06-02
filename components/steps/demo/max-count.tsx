import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { InputNumberProps } from 'antd';
import { Button, Flex, InputNumber, Steps, Typography } from 'antd';

const genItems = (count: number) =>
  Array.from({ length: count }, (_, index) => ({ title: `Step ${index + 1}` }));

const getMiddleCurrent = (count: number) => Math.floor((count - 1) / 2);

const App: React.FC = () => {
  const [count, setCount] = React.useState(7);
  const [current, setCurrent] = React.useState(() => getMiddleCurrent(7));
  const items = React.useMemo(() => genItems(count), [count]);

  const handleCountChange: InputNumberProps<number>['onChange'] = (value) => {
    if (value === null) {
      return;
    }

    setCount(value);
    setCurrent(getMiddleCurrent(value));
  };

  const handlePrev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrent((prev) => Math.min(prev + 1, count - 1));
  };

  return (
    <Flex vertical gap="middle">
      <Typography.Title level={5} style={{ margin: 0 }}>
        Number of Steps
      </Typography.Title>

      <Steps current={current} maxCount={5} items={items} />

      <Flex gap="small" align="center" style={{ alignSelf: 'center' }}>
        <Button icon={<LeftOutlined />} onClick={handlePrev} disabled={current <= 0} />
        <InputNumber
          aria-label="Number of Steps"
          mode="spinner"
          min={3}
          max={7}
          value={count}
          onChange={handleCountChange}
          style={{
            width: 120,
          }}
        />
        <Button icon={<RightOutlined />} onClick={handleNext} disabled={current >= count - 1} />
      </Flex>
    </Flex>
  );
};

export default App;
