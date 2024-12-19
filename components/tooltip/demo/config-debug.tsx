import React from 'react';
import { ConfigProvider, Tooltip } from 'antd';

const App: React.FC = () => (
  <div>
    <ConfigProvider
      button={{
        className: 'test-test',
      }}
      tooltip={{
        className: 'cutsom-tooltip-test',
        style: { background: 'yellow' },
        styles: { body: { color: 'red', borderRadius: 50 }, root: { color: 'green' } },
        classNames: { root: 'custom-root', body: 'custom-body' },
      }}
    >
      <Tooltip title="prompt text">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </ConfigProvider>
  </div>
);

export default App;
