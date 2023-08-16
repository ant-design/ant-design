import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import lunisolar from 'lunisolar';
import zhCn from 'lunisolar/locale/zh-cn';
import { Calendar, Col, Radio, Row, Select, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

lunisolar.locale(zhCn);

const App: React.FC = () => {
  const { token } = theme.useToken();

  const [selectDate, setSelectDate] = React.useState<Dayjs>(dayjs());

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    setSelectDate(value);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const lunarStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    fontSize: token.fontSizeSM,
  };
  const monthCurrentStyle: React.CSSProperties = {
    color: token.colorTextLightSolid,
  };
  const monthStyle: React.CSSProperties = {
    color: token.colorTextBase,
  };
  const monthCellStyle: React.CSSProperties = {
    width: 120,
  };

  const cellRender = (date: Dayjs, info: CellRenderInfo<Dayjs>) => {
    const d = lunisolar(date.toDate());
    const lunar = d.lunar.getDayName();
    const solarTerm = d.solarTerm?.name;
    if (info.type === 'date') {
      return (
        <div>
          {info.originNode}
          {info.type === 'date' && <div style={lunarStyle}>{solarTerm || lunar}</div>}
        </div>
      );
    }

    if (info.type === 'month') {
      // Due to the fact that a solar month is part of the lunar month X and part of the lunar month X+1,
      // when rendering a month, always take X as the lunar month of the month
      const d2 = lunisolar(new Date(date.get('year'), date.get('month')));
      const month = d2.lunar.getMonthName();
      return React.cloneElement(info.originNode, {
        style: monthCellStyle,
        children: [
          ...info.originNode.props.children,
          <span key="m" style={selectDate?.isSame(date, 'month') ? monthCurrentStyle : monthStyle}>
            （{month}）
          </span>,
        ],
      });
    }
  };

  const getYearLabel = (year: number) => {
    const d = lunisolar(new Date(year + 1, 0));
    return `${year}年（${d.format('cYcZ年')}）`;
  };

  const getMonthLabel = (month: number, value: Dayjs) => {
    const d = lunisolar(new Date(value.year(), month));
    const lunar = d.lunar.getMonthName();
    return `${month + 1}月（${lunar}）`;
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullCellRender={cellRender}
        fullscreen={false}
        onPanelChange={onPanelChange}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {getMonthLabel(i, value)}
              </Select.Option>,
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {getYearLabel(i)}
              </Select.Option>,
            );
          }
          return (
            <Row gutter={8} style={{ padding: '10px' }}>
              <Col>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  className="my-year-select"
                  value={year}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                >
                  {options}
                </Select>
              </Col>
              <Col>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  value={month}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
              </Col>
              <Col>
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}
                >
                  <Radio.Button value="month">月</Radio.Button>
                  <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          );
        }}
      />
    </div>
  );
};

export default App;
