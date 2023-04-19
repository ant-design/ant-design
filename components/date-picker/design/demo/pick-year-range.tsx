import React from 'react';
import { DatePicker } from 'antd';

const { _InternalRangePanelDoNotUseOrYouWillBeFired: PureRangePicker } = DatePicker;

const Demo = () => <PureRangePicker picker="year" />;

export default Demo;
