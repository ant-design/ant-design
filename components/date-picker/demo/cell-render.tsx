import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        if (typeof current === 'number') {
          return <div className="ant-picker-cell-inner">{current}</div>;
        }
        return (
          <div
            className="ant-picker-cell-inner"
            style={current.date() === 1 ? { border: '1px solid #1677ff', borderRadius: '50%' } : {}}
          >
            {current.date()}
          </div>
        );
      }}
    />
    <RangePicker
      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        if (typeof current === 'number') {
          return <div className="ant-picker-cell-inner">{current}</div>;
        }
        return (
          <div
            className="ant-picker-cell-inner"
            style={current.date() === 1 ? { border: '1px solid #1677ff', borderRadius: '50%' } : {}}
          >
            {current.date()}
          </div>
        );
      }}
    />
  </Space>
);

export default App;
