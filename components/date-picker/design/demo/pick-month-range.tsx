import React from 'react';
import { DatePicker } from 'antd';

const { _InternalRangePanelDoNotUseOrYouWillBeFired: PureRangePicker } = DatePicker;

const Demo = () => <PureRangePicker picker="month" />;

export default Demo;
