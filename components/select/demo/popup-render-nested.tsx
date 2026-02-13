import React, { useState } from 'react';
import { Cascader, DatePicker, Divider, Select, Space, TimePicker, TreeSelect } from 'antd';
import type { TimePickerProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const selectOptions = [
  { label: 'Jack', value: 'jack' },
  { label: 'Lucy', value: 'lucy' },
];

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },

      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
      },
    ],
  },
];

const App: React.FC = () => {
  const [timeValue, setTimeValue] = useState<TimePickerProps['value']>();
  const [dateRangeValue, setDateRangeValue] = useState<RangePickerProps['value']>();
  const [cascaderValue, setCascaderValue] = useState<string[]>();
  const [treeValue, setTreeValue] = useState<string>();

  return (
    <div>
      <Select
        style={{ width: 350 }}
        placeholder="Custom Render"
        popupRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space vertical style={{ padding: '0 8px 8px' }}>
              <TimePicker value={timeValue} onChange={setTimeValue} />
              <DatePicker.RangePicker value={dateRangeValue} onChange={setDateRangeValue} />
              <Cascader
                options={cascaderOptions}
                value={cascaderValue}
                onChange={setCascaderValue}
                placeholder="Select cascader"
                style={{ width: '100%' }}
              />
              <TreeSelect
                treeData={treeData}
                value={treeValue}
                onChange={setTreeValue}
                placeholder="Select tree"
                style={{ width: '100%' }}
              />
            </Space>
          </div>
        )}
        options={selectOptions}
      />
    </div>
  );
};

export default App;
