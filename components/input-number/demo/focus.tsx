import React, { useRef } from 'react';
import type { GetRef } from 'antd';
import { Button, InputNumber, Space } from 'antd';

type InputNumberRef = GetRef<typeof InputNumber>;

const App: React.FC = () => {
  const inputRef = useRef<InputNumberRef>(null);
  return (
    <Space vertical style={{ width: '100%' }}>
      <Space wrap>
        <Button
          onClick={() => {
            inputRef.current?.focus({ cursor: 'start' });
          }}
        >
          Focus at first
        </Button>
        <Button
          onClick={() => {
            inputRef.current?.focus({ cursor: 'end' });
          }}
        >
          Focus at last
        </Button>
        <Button
          onClick={() => {
            inputRef.current?.focus({ cursor: 'all' });
          }}
        >
          Focus to select all
        </Button>
        <Button
          onClick={() => {
            inputRef.current?.focus({ preventScroll: true });
          }}
        >
          Focus prevent scroll
        </Button>
      </Space>
      <InputNumber style={{ width: '100%' }} defaultValue={999} ref={inputRef} />
    </Space>
  );
};

export default App;
