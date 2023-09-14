import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const style: React.CSSProperties = {
  border: '1px solid #1677ff',
  borderRadius: '50%',
};

const cellRender: DatePickerProps['cellRender'] = (current, info) => {
  if (info.type !== 'date') {
    return info.originNode;
  }
  if (typeof current === 'number') {
    return <div className="ant-picker-cell-inner">{current}</div>;
  }
  return (
    <div className="ant-picker-cell-inner" style={current.date() === 1 ? style : {}}>
      {current.date()}
    </div>
  );
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker cellRender={cellRender} />
    <DatePicker.RangePicker cellRender={cellRender} />
  </Space>
);

export default App;
