import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

function onChange() {}
export default () => (
  <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
);
