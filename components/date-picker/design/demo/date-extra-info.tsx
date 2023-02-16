import type { FC } from 'react';
import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureDatePicker } = DatePicker;

const useStyle = createStyles(() => ({
  weekendCell: css`
    color: #ff4d4f40;
    .ant-picker-cell-in-view & {
      color: #ff4d4f;
    }
  `,
}));

const Demo: FC = () => {
  const { styles } = useStyle();
  const dateRender = (current: Dayjs) => (
    <div
      className={classNames(
        'ant-picker-cell-inner',
        [6, 0].includes(current.day()) && styles.weekendCell,
      )}
    >
      {current.date()}
    </div>
  );

  return (
    <div style={{ width: '100%' }}>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>办公场景：预览节假日信息</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PureDatePicker dateRender={dateRender} />
      </div>
    </div>
  );
};

export default Demo;
