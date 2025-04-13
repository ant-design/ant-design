import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Radio, Tabs } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const App: React.FC = () => {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('small');
  const [activeKey, setActiveKey] = useState('1');
  const [items, setItems] = useState<TabsProps['items']>([
    {
      label: 'Tab 1',
      key: '1',
      children: 'Content of editable tab 1',
    },
    {
      label: 'Tab 2',
      key: '2',
      children: 'Content of editable tab 2',
    },
    {
      label: 'Tab 3',
      key: '3',
      children: 'Content of editable tab 3',
    },
  ]);

  const add = () => {
    const newKey = String((items || []).length + 1);
    setItems([
      ...(items || []),
      {
        label: `Tab ${newKey}`,
        key: newKey,
        children: `Content of editable tab ${newKey}`,
      },
    ]);
    setActiveKey(newKey);
  };

  const remove = (targetKey: TargetKey) => {
    if (!items) return;
    const targetIndex = items.findIndex((item) => item.key === targetKey);
    const newItems = items.filter((item) => item.key !== targetKey);

    if (newItems.length && targetKey === activeKey) {
      const newActiveKey =
        newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex].key;
      setActiveKey(newActiveKey);
    }

    setItems(newItems);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <div>
      <Radio.Group value={size} onChange={onChange} style={{ marginBottom: 16 }}>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        size={size}
        style={{ marginBottom: 32 }}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        style={{ marginBottom: 32 }}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Card Tab ${id}`,
            key: id,
            children: `Content of card tab ${id}`,
          };
        })}
      />
      <Tabs
        type="editable-card"
        size={size}
        activeKey={activeKey}
        onChange={setActiveKey}
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};

export default App;
