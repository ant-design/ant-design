import React from 'react';
import { Tabs } from 'antd';

const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab Title ${id}`,
    key: id,
    children: (
      <>
        <p>Content of Tab Pane {id}</p>
        <p>Content of Tab Pane {id}</p>
        <p>Content of Tab Pane {id}</p>
      </>
    ),
  };
});

const App: React.FC = () => (
  <div className="card-container">
    <Tabs type="card" items={items} />
  </div>
);

export default App;
