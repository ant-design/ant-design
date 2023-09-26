import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Radio, Select, Space, Switch } from 'antd';
import type { SelectCommonPlacement } from 'antd/es/_util/motion';

const randomOptions = (count?: number) => {
  const length = count ?? Math.floor(Math.random() * 5) + 1;

  // Random 1 ~ 5 options
  return Array.from({ length }).map((_, index) => ({
    value: index,
    label: `Option ${index}`,
  }));
};

const App: React.FC = () => {
  const [placement, SetPlacement] = useState<SelectCommonPlacement>('topLeft');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(() => randomOptions(3));

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  return (
    <div
      style={{
        height: '100%',
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Space style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
        <Radio.Group value={placement} onChange={placementChange}>
          <Radio.Button value="topLeft">TL</Radio.Button>
          <Radio.Button value="topRight">TR</Radio.Button>
          <Radio.Button value="bottomLeft">BL</Radio.Button>
          <Radio.Button value="bottomRight">BR</Radio.Button>
        </Radio.Group>

        <Switch checked={open} onChange={() => setOpen((o) => !o)} />
        <Button onClick={() => setOptions(randomOptions())}>Random</Button>
      </Space>
      <Select
        open={open}
        style={{ width: 120 }}
        placement={placement}
        options={options}
        popupMatchSelectWidth={200}
      />
    </div>
  );
};

export default App;
