import React from 'react';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Dropdown, Flex, Slider, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

type DateComponent = Required<NonNullable<DatePickerProps<Dayjs>['components']>>['date'];
type GetProps<T> = T extends React.ComponentType<infer P> ? P : never;

const MyDatePanel = (props: GetProps<DateComponent>) => {
  const { value, onSelect, onHover } = props;

  // Value
  const startDate = React.useMemo(() => dayjs().date(1).month(0), []);
  const [innerValue, setInnerValue] = React.useState(value || startDate);

  React.useEffect(() => {
    if (value) {
      setInnerValue(value);
    }
  }, [value]);

  // Range
  const dateCount = React.useMemo(() => {
    const endDate = startDate.add(1, 'year').add(-1, 'day');
    return endDate.diff(startDate, 'day');
  }, [startDate]);

  const sliderValue = Math.min(Math.max(0, innerValue.diff(startDate, 'day')), dateCount);

  // Render
  return (
    <Flex vertical gap="small" style={{ padding: 16 }}>
      <Typography.Title level={4} style={{ margin: 0 }} title="no, it's not">
        The BEST Picker Panel
      </Typography.Title>
      <Slider
        min={0}
        max={dateCount}
        value={sliderValue}
        onChange={(nextValue) => {
          const nextDate = startDate.add(nextValue, 'day');
          setInnerValue(nextDate);
          onHover?.(nextDate);
        }}
        tooltip={{
          formatter: (nextValue) => startDate.add(nextValue || 0, 'day').format('YYYY-MM-DD'),
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          onSelect(innerValue);
        }}
      >{`That's It!`}</Button>
    </Flex>
  );
};

const ExtraCase = () => {
  const [show, setShow] = React.useState(false);
  const [panelShow, setPanelShow] = React.useState(false);

  const [date, setDate] = React.useState(dayjs());

  return (
    <>
      <Dropdown
        arrow
        open={show}
        trigger={['click']}
        destroyPopupOnHide
        onOpenChange={(open) => {
          setShow(open);

          if (!open) {
            setPanelShow(false);
          }
        }}
        menu={{
          items: [
            {
              key: 'today',
              label: <div>Today</div>,
            },
            {
              key: 'tomorrow',
              label: <div>Tomorrow </div>,
            },
            {
              key: 'custom-date',
              label: (
                <div
                  style={{ position: 'relative' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPanelShow(true);
                  }}
                >
                  <div>Customize</div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      height: 0,
                      width: 0,
                      overflow: 'hidden',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    <DatePicker
                      open={panelShow}
                      onChange={(date) => {
                        setDate(date);
                        setShow(false);
                        setPanelShow(false);
                      }}
                    />
                  </div>
                </div>
              ),
            },
          ],
        }}
      >
        {date.format('YYYY-MM-DD')}
      </Dropdown>
    </>
  );
};

const App: React.FC = () => (
  <Space direction="vertical">
    <DatePicker
      showNow={false}
      onChange={onChange}
      components={{
        date: MyDatePanel,
      }}
    />

    <ExtraCase />
  </Space>
);

export default App;
