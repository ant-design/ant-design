import React from 'react';
import { ConfigProvider, Popover } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopover } = Popover;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Popover: {
          titleMinWidth: 40,
        },
      },
    }}
  >
    <InternalPopover content={content} title="Title" />
    <InternalPopover
      content={content}
      title="Title"
      placement="bottomLeft"
      style={{ width: 250 }}
    />
  </ConfigProvider>
);

export default App;
