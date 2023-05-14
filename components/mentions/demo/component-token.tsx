import { ConfigProvider, Mentions } from 'antd';
import React from 'react';

/** Test usage. Do not use in your production. */
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
      components: { Mentions: { dropdownBg: '#911d1d', dropdownMenuItemHoverBg: '#2b2794' } },
    }}
  >
    <InternalMentions style={{ width: '100%' }} value="@" options={options} />
  </ConfigProvider>
);

export default App;
