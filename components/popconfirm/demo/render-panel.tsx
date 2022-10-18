import React from 'react';
import { Popconfirm } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopconfirm } = Popconfirm;

const App: React.FC = () => (
  <>
    <InternalPopconfirm title="Are you OK?" />
    <InternalPopconfirm title="Are you OK?" placement="bottomRight" style={{ width: 250 }} />
  </>
);

export default App;
