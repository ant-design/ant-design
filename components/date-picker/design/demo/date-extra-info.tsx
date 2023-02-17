import type { FC } from 'react';
import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureDatePicker } = DatePicker;

const useStyle = createStyles(({ token }) => ({
  weekendCell: css`
    color: #ff4d4f40;
    .ant-picker-cell-in-view & {
      color: #ff4d4f;
    }
  `,
  detailedCell: css`
    width: 40px;
    height: 40px !important;
  `,
  detailedPicker: css`
    .ant-picker-date-panel {
      width: auto;
      .ant-picker-content {
        width: auto;
      }
    }
  `,
  extraInfo: css`
    font-size: 12px;
    line-height: 12px;
    transform: scale(${10 / 12});
    color: ${token.colorTextQuaternary};
    .ant-picker-cell-in-view & {
      color: ${token.colorTextSecondary};
    }
    .ant-picker-cell-selected & {
      color: #fff;
    }
  `,
  add: css`
    color: #ff4d4f80;
    .ant-picker-cell-in-view & {
      color: #ff4d4f;
    }
    .ant-picker-cell-selected & {
      color: #fff;
    }
  `,
  minus: css`
    color: #52C41A80;
    .ant-picker-cell-in-view & {
      color: #52C41A;
    }
    .ant-picker-cell-selected & {
      color: #fff;
    }
  `,
}));

const seeds = Array(30)
  .fill(1)
  .map(() => Math.random());

const getSales = (date: Dayjs) => Math.floor(seeds[date.date() % 30] * 10000);

const getData = (date: Dayjs) => (Math.floor(seeds[date.date() % 30] * 10000) - 5000) / 5000;

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

  const saleDateRender = (current: Dayjs) => (
    <div className={classNames('ant-picker-cell-inner', styles.detailedCell)}>
      {current.date()}
      <div className={styles.extraInfo}>{getSales(current)}</div>
    </div>
  );

  const dataDateRender = (current: Dayjs) => {
    const data = getData(current);

    return (
      <div className={classNames('ant-picker-cell-inner', styles.detailedCell)}>
        {current.date()}
        <div className={classNames(styles.extraInfo, data > 0 ? styles.add : styles.minus)}>
          {data.toFixed(2)}%
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>办公场景：预览节假日信息</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <PureDatePicker dateRender={dateRender} popupClassName={styles.detailedPicker} />
      </div>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>电商场景：预览销售额信息</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <PureDatePicker dateRender={saleDateRender} popupClassName={styles.detailedPicker} />
      </div>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>大数据场景：预览数据波动</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <PureDatePicker dateRender={dataDateRender} popupClassName={styles.detailedPicker} />
      </div>
    </div>
  );
};

export default Demo;
