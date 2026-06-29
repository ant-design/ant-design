import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureDatePicker } = DatePicker;

const App: React.FC = () => (
  <PureDatePicker
    presets={[
      { label: 'Yesterday', value: dayjs().add(-1, 'd') },
      { label: 'Last Week', value: dayjs().add(-7, 'd') },
      { label: 'Last Month', value: dayjs().add(-1, 'month') },
    ]}
  />
);

export default App;
