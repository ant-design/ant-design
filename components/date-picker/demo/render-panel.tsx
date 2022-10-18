import React from 'react';
/*
 * debug: true
 */

import { DatePicker } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDatePicker } = DatePicker;

const App: React.FC = () => <InternalDatePicker />;

export default App;
