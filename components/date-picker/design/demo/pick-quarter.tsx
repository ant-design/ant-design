import { DatePicker } from 'antd';
import type { FC } from 'react';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureDatePicker } = DatePicker;

const Demo: FC = () => <PureDatePicker picker="quarter" />;

export default Demo;
