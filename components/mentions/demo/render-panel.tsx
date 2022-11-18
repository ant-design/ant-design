import React from 'react';
import { Mentions } from 'antd';

const { Option } = Mentions;

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalMentions } = Mentions;

const App: React.FC = () => (
  <InternalMentions style={{ width: '100%' }} value="@">
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
  </InternalMentions>
);

export default App;
