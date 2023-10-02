import React, { useState } from 'react';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { DatePicker, Radio } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => {
  const [placement, SetPlacement] = useState<DatePickerProps['placement']>('topLeft');

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <DatePicker placement={placement} />
      <br />
      <br />
      <RangePicker placement={placement} />
    </>
  );
};

export default App;
