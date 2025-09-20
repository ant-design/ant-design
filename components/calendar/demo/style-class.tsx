import React from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const App: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const onSelect = (date: Dayjs) => {
    console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>对象形式的 classNames 和 styles</h3>
      <Calendar
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        classNames={{
          root: 'custom-calendar-root',
          header: 'custom-calendar-header',
          body: 'custom-calendar-body',
          content: 'custom-calendar-content',
          item: 'custom-calendar-item',
        }}
        styles={{
          root: {
            border: '2px solid #1890ff',
            borderRadius: '8px',
            backgroundColor: '#f0f8ff',
          },
          header: {
            backgroundColor: '#e6f7ff',
            padding: '16px',
            borderBottom: '1px solid #d9d9d9',
          },
          body: {
            padding: '16px',
          },
          content: {
            backgroundColor: '#ffffff',
          },
          item: {
            borderRadius: '4px',
            transition: 'all 0.3s',
          },
        }}
      />

      <h3 style={{ marginTop: '40px' }}>函数形式的 classNames 和 styles</h3>
      <Calendar
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        fullscreen={false}
        classNames={(info) => ({
          root: info.props.fullscreen ? 'fullscreen-calendar' : 'mini-calendar',
          header: `calendar-header-${info.props.mode || 'month'}`,
          body: 'dynamic-calendar-body',
          content: info.props.showWeek ? 'calendar-with-week' : 'calendar-without-week',
          item: 'dynamic-calendar-item',
        })}
        styles={(info) => ({
          root: {
            border: info.props.fullscreen ? '1px solid #d9d9d9' : '2px solid #52c41a',
            borderRadius: info.props.fullscreen ? '6px' : '12px',
            backgroundColor: info.props.fullscreen ? '#ffffff' : '#f6ffed',
            width: info.props.fullscreen ? '100%' : '300px',
          },
          header: {
            backgroundColor: info.props.fullscreen ? '#fafafa' : '#f0f9ff',
            padding: info.props.fullscreen ? '12px 16px' : '8px 12px',
            fontSize: info.props.fullscreen ? '16px' : '14px',
          },
          body: {
            padding: info.props.fullscreen ? '16px' : '12px',
          },
          content: {
            backgroundColor: '#ffffff',
            minHeight: info.props.fullscreen ? 'auto' : '200px',
          },
          item: {
            borderRadius: '6px',
            fontSize: info.props.fullscreen ? '14px' : '12px',
            transition: 'all 0.2s ease-in-out',
          },
        })}
      />

      <h3 style={{ marginTop: '40px' }}>带周显示的日历样式</h3>
      <Calendar
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        showWeek
        classNames={{
          root: 'week-calendar-root',
          header: 'week-calendar-header',
          body: 'week-calendar-body',
          content: 'week-calendar-content',
          item: 'week-calendar-item',
        }}
        styles={{
          root: {
            border: '1px solid #ff7a45',
            borderRadius: '6px',
            backgroundColor: '#fff2e8',
          },
          header: {
            backgroundColor: '#ffe7ba',
            padding: '12px 16px',
            fontWeight: 'bold',
          },
          body: {
            padding: '16px',
          },
          content: {
            backgroundColor: '#ffffff',
          },
          item: {
            borderRadius: '4px',
            border: '1px solid transparent',
          },
        }}
      />
    </div>
  );
};

export default App;
