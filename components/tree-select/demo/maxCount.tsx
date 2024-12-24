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
  {
    title: 'Parent 3',
    value: 'parent3',
    children: [
      {
        title: 'Child 3-1',
        value: 'child3-1',
      },
    ],
  },
  {
    title: 'Parent 4',
    value: 'parent4',
  },
];

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>(['child1-1']);
  const [valueNoEffect, setValueNoEffect] = React.useState<string[]>(['child1-1']);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const onChangeNoEffect = (newValue: string[]) => {
    setValueNoEffect(newValue);
  };

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  const suffixNoEffect = (
    <>
      <span>
        {valueNoEffect.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <>
      <h4>maxCount 生效示例</h4>
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
      <br />
      <br />
      <h4>maxCount 不生效示例</h4>
      <TreeSelect
        treeCheckable
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        maxCount={MAX_COUNT}
        value={valueNoEffect}
        onChange={onChangeNoEffect}
        suffixIcon={suffixNoEffect}
        placeholder="超过 3 个选择也不会受限制"
        style={{ width: '100%' }}
        treeData={treeData}
      />
    </>
  );
};

export default App;
