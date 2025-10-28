import React, { useState } from 'react';
import { Select, Tabs } from 'antd';

const positionList = ['left', 'right', 'top', 'bottom'];

const App: React.FC = () => {
  const [parentPos, setParentPos] = useState(undefined);
  const [childPos, setChildPos] = useState(undefined);
  const [parentType, setParentType] = useState(undefined);
  const [childType, setChildType] = useState(undefined);

  return (
    <div>
      <Select
        style={{ width: 200 }}
        onChange={(val) => setParentPos(val)}
        options={positionList.map((pos) => {
          return {
            value: pos,
            label: `Parent - ${pos}`,
          };
        })}
      />
      <Select
        style={{ width: 200 }}
        onChange={(val) => setChildPos(val)}
        options={positionList.map((pos) => {
          return {
            value: pos,
            label: `Child - ${pos}`,
          };
        })}
      />
      <Select
        style={{ width: 200 }}
        onChange={(val) => setParentType(val)}
        options={[
          { value: 'line', label: 'Parent - line' },
          { value: 'card', label: 'Parent - card' },
          { value: 'editable-card', label: 'Parent - card edit' },
        ]}
      />
      <Select
        style={{ width: 200 }}
        onChange={(val) => setChildType(val)}
        options={[
          { value: 'line', label: 'Child - line' },
          { value: 'card', label: 'Child - card' },
          { value: 'editable-card', label: 'Parent - card edit' },
        ]}
      />
      <Tabs
        defaultActiveKey="1"
        tabPosition={parentPos}
        type={parentType}
        items={[
          {
            label: 'Tab 1',
            key: '1',
            children: (
              <Tabs
                defaultActiveKey="1"
                tabPosition={childPos}
                type={childType}
                style={{ height: 300 }}
                items={Array.from({ length: 20 }).map((_, index) => {
                  const key = String(index);
                  return {
                    label: `Tab ${key}`,
                    key,
                    children: `TTTT ${key}`,
                  };
                })}
              />
            ),
          },
          {
            label: 'Tab 2',
            key: '2',
            children: 'Content of Tab Pane 2',
          },
        ]}
      />
    </div>
  );
};

export default App;
