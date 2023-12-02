import type { FC } from 'react';
import React from 'react';
import { DatePicker } from 'antd';

const { _InternalRangePanelDoNotUseOrYouWillBeFired: PureRangePicker } = DatePicker;

const Demo: FC = () => <PureRangePicker picker="month" />;

export default Demo;
