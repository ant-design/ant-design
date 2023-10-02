import React from 'react';
import { InputNumber } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalInputNumber } = InputNumber;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
    <InternalInputNumber style={{ width: '100%' }} />
  </div>
);
