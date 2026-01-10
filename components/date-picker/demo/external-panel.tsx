import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const DatePickerDemo: React.FC = () => {
  type DropdownState = {
    visible: boolean;
    panelVisible: boolean;
  };

  const [dropdownState, setDropdownState] = React.useState<DropdownState>({
    visible: false,
    panelVisible: false,
  });

  const [date, setDate] = React.useState<Dayjs | null>(() => dayjs());

  return (
    <Dropdown
      arrow
      open={visible}
      trigger={['click']}
      destroyOnHidden
      onOpenChange={(open) => {
        setVisible(open);
        if (!open) {
          setPanelVisible(false);
        }
      }}
      menu={{
        items: [
          {
            key: 'today',
            label: 'Today',
            onClick() {
              setDate(dayjs());
              setVisible(false);
            },
          },
          {
            key: 'tomorrow',
            label: 'Tomorrow',
            onClick() {
              setDate(dayjs().add(1, 'day'));
              setVisible(false);
            },
          },
          {
            key: 'custom-date',
            label: (
              <div
                style={{ position: 'relative', overflow: 'hidden' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPanelVisible(true);
                }}
              >
                <div>Customize</div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DatePicker
                    open={panelVisible}
                    styles={{
                      root: {
                        pointerEvents: 'none',
                        opacity: 0,
                        position: 'absolute',
                        bottom: -12,
                        insetInlineStart: 0,
                      },
                    }}
                    onChange={(date) => {
                      setDate(date);
                      setVisible(false);
                      setPanelVisible(false);
                    }}
                  />
                </div>
              </div>
            ),
          },
        ],
      }}
    >
      <Space>
        <span>{date?.format('YYYY-MM-DD')}</span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

const RangePickerDemo: React.FC = () => {
  type DropdownState = {
    visible: boolean;
    panelVisible: boolean;
  };

  const [dropdownState, setDropdownState] = React.useState<DropdownState>({
    visible: false,
    panelVisible: false,
  });

  const [dates, setDates] = React.useState<[Dayjs, Dayjs] | null>(() => [
    dayjs(),
    dayjs().add(1, 'day'),
  ]);

  return (
    <Dropdown
      arrow
      open={visible}
      trigger={['click']}
      destroyOnHidden
      onOpenChange={(open) => {
        setVisible(open);
        if (!open) {
          setPanelVisible(false);
        }
      }}
      menu={{
        items: [
          {
            key: '7',
            label: '7 days',
            onClick() {
              setDates([dayjs(), dayjs().add(7, 'day')]);
              setVisible(false);
            },
          },
          {
            key: '30',
            label: '30 days',
            onClick() {
              setDates([dayjs(), dayjs().add(30, 'day')]);
              setVisible(false);
            },
          },
          {
            key: 'custom-date',
            label: (
              <div
                style={{ position: 'relative', overflow: 'hidden' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPanelVisible(true);
                }}
              >
                <div>Customize</div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DatePicker.RangePicker
                    open={panelVisible}
                    styles={{
                      root: {
                        pointerEvents: 'none',
                        opacity: 0,
                        position: 'absolute',
                        bottom: 0, // RangePicker use this style
                        insetInlineStart: 0,
                      },
                    }}
                    onChange={(ranges) => {
                      if (ranges?.[0] && ranges?.[1]) {
                        setDates([ranges[0], ranges[1]]);
                      } else {
                        setDates(null);
                      }
                      setVisible(false);
                      setPanelVisible(false);
                    }}
                  />
                </div>
              </div>
            ),
          },
        ],
      }}
    >
      <Space>
        <span>
          {dates
            ? `${dates[0].format('YYYY-MM-DD')} ~ ${dates[1].format('YYYY-MM-DD')}`
            : 'Select range'}
        </span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

const Demo = () => {
  return (
    <div style={{ display: 'flex', gap: '20%' }}>
      <div>
        <div style={{ marginBottom: 12 }}>DatePicker</div>
        <DatePickerDemo />
      </div>

      <div>
        <div style={{ marginBottom: 12 }}>RangePicker</div>
        <RangePickerDemo />
      </div>
    </div>
  );
};

export default Demo;
