import React from 'react';
/*
 * debug: true
 */

import { TimePicker } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTimePicker } = TimePicker;

const App: React.FC = () => <InternalTimePicker />;

export default App;
