import type { FC } from 'react';
import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureDatePicker } = DatePicker;

const seed = Math.random();

const getSales = (date: Dayjs) => Math.floor((date.date() + date.month() * 30) * seed * 1000);

const Demo: FC = () => {
  const dateRender = (current: Dayjs) => (
    <div className="ant-picker-cell-inner" style={{ width: 40, height: 40, margin: '0 4px' }}>
      {current.date()}
      <div style={{ transform: 'scale(0.8)', color: 'rgba(0,0,0,0.65)', marginTop: -8 }}>
        {getSales(current)}
      </div>
    </div>
  );

  return (
    <div>
      <div>电商场景：预览销售额信息</div>
      <PureDatePicker dateRender={dateRender} />
    </div>
  );
};

export default Demo;
