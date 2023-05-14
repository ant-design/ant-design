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
          popoverBg: '#b61919',
          popoverColor: '#35ad1c',
          minWidth: 40,
          minHeight: 30,
          arrowWidth: 10,
          arrowColor: '#9f8429',
          arrowOuterColor: '#640b44',
          distance: 20,
          paddingHorizontal: 18,
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
