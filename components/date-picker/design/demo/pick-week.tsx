import React from 'react';
import { DatePicker } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureDatePicker } = DatePicker;

const Demo = () => <PureDatePicker picker="week" />;

export default Demo;
