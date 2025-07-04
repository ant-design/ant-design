import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';

const MAX_COUNT = 3;

const treeData = [
  {
    title: 'Parent 1',
    value: 'parent1',
    children: [
      {
        title: 'Child 1-1',
        value: 'child1-1',
      },
      {
        title: 'Child 1-2',
        value: 'child1-2',
      },
    ],
  },
  {
    title: 'Parent 2',
    value: 'parent2',
    children: [
      {
        title: 'Child 2-1',
        value: 'child2-1',
      },
      {
        title: 'Child 2-2',
        value: 'child2-2',
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>(['child1-1']);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={onChange}
      multiple
      maxCount={MAX_COUNT}
      style={{ width: '100%' }}
      suffixIcon={suffix}
      treeCheckable
      placeholder="Please select"
      showCheckedStrategy={TreeSelect.SHOW_CHILD}
    />
  );
};

export default App;
