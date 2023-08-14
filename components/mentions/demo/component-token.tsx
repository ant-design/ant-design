import React from 'react';
import { ConfigProvider, Mentions } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalMentions } = Mentions;

const options = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
];

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: { Mentions: { dropdownHeight: 500, controlItemWidth: 300, zIndexPopup: 1000 } },
    }}
  >
    <InternalMentions style={{ width: '100%' }} value="@" options={options} />
  </ConfigProvider>
);

export default App;
