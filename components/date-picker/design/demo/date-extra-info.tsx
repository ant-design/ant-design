import type { FC } from 'react';
import React from 'react';
import { DatePicker } from 'antd';
import { createStyles, css } from 'antd-style';
import { clsx } from 'clsx';
import type { Dayjs } from 'dayjs';

import useLocale from '../../../../.dumi/hooks/useLocale';

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
    color: #52c41a80;
    .ant-picker-cell-in-view & {
      color: #52c41a;
    }
    .ant-picker-cell-selected & {
      color: #fff;
    }
  `,
}));

const seeds = Array.from({ length: 30 }).map(Math.random);

const getSales = (date: Dayjs) => Math.floor(seeds[date.date() % 30] * 10000);

const getData = (date: Dayjs) => (Math.floor(seeds[date.date() % 30] * 10000) - 5000) / 5000;

const locales = {
  cn: {
    officeScenario: '办公场景：预览节假日信息',
    commerceScenario: '电商场景：预览销售额信息',
    bigDataScenario: '大数据场景：预览数据波动',
  },
  en: {
    officeScenario: 'Office scenario: preview holiday information',
    commerceScenario: 'E-commerce scenario: preview sales information',
    bigDataScenario: 'Big data scenario: preview data fluctuations',
  },
};

const Demo: FC = () => {
  const { styles } = useStyle();
  const [locale] = useLocale(locales);
  const dateRender = (current: Dayjs) => (
    <div
      className={clsx('ant-picker-cell-inner', {
        [styles.weekendCell]: [6, 0].includes(current.day()),
      })}
    >
      {current.date()}
    </div>
  );

  const saleDateRender = (current: Dayjs) => (
    <div className={clsx('ant-picker-cell-inner', styles.detailedCell)}>
      {current.date()}
      <div className={styles.extraInfo}>{getSales(current)}</div>
    </div>
  );

  const dataDateRender = (current: Dayjs) => {
    const data = getData(current);
    return (
      <div className={clsx('ant-picker-cell-inner', styles.detailedCell)}>
        {current.date()}
        <div className={clsx(styles.extraInfo, data > 0 ? styles.add : styles.minus)}>
          {data.toFixed(2)}%
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>{locale.officeScenario}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <PureDatePicker dateRender={dateRender} popupClassName={styles.detailedPicker} />
      </div>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>{locale.commerceScenario}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <PureDatePicker dateRender={saleDateRender} popupClassName={styles.detailedPicker} />
      </div>
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>{locale.bigDataScenario}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <PureDatePicker dateRender={dataDateRender} popupClassName={styles.detailedPicker} />
      </div>
    </div>
  );
};

export default Demo;
