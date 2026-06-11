## zh-CN

通过 `cellRender` 渲染跨日期事件范围。示例根据日期判断事件的开始、持续、结束或单日状态，并用连续色条展示。

## en-US

Render event ranges across days with `cellRender`. The example calculates whether each date is the start, middle, end, or a single-day event and draws compact range bars.

```css
.calendar-event-range-cell {
  --calendar-event-range-cell-offset: calc(
    var(--calendar-event-range-date-padding) + var(--calendar-event-range-date-margin)
  );

  min-height: 72px;
}

.calendar-event-range-calendar .ant-picker-calendar-date-content {
  overflow: visible;
}

.calendar-event-range-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}

.calendar-event-range-bar {
  display: block;
  height: 18px;
  overflow: hidden;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: var(--event-color);
}

.calendar-event-range-bar-start {
  margin-inline-end: calc(0px - var(--calendar-event-range-cell-offset));
  padding-inline-start: 6px;
  border-start-start-radius: 9px;
  border-end-start-radius: 9px;
}

.calendar-event-range-bar-middle {
  margin-inline: calc(0px - var(--calendar-event-range-cell-offset));
}

.calendar-event-range-bar-end {
  margin-inline-start: calc(0px - var(--calendar-event-range-cell-offset));
  border-start-end-radius: 9px;
  border-end-end-radius: 9px;
}

.calendar-event-range-bar-single {
  padding-inline-start: 6px;
  border-radius: 9px;
}
```
