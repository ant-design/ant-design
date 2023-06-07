import { DatePicker } from 'antd';
import type { FC } from 'react';
import React from 'react';

const { _InternalRangePanelDoNotUseOrYouWillBeFired: PureRangePicker } = DatePicker;

const Demo: FC = () => <PureRangePicker picker="week" />;

export default Demo;
