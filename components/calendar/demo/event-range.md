## zh-CN

通过 `cellRender` 渲染跨日期事件范围。示例根据日期判断事件的开始、持续、结束或单日状态，并用连续色条展示。

## en-US

Render event ranges across days with `cellRender`. The example calculates whether each date is the start, middle, end, or a single-day event and draws compact range bars.

```css
.calendar-event-range-cell {
  min-height: 72px;
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
  margin-inline-end: -8px;
  padding-inline-start: 6px;
  border-radius: 9px 0 0 9px;
}

.calendar-event-range-bar-middle {
  margin-inline: -8px;
}

.calendar-event-range-bar-end {
  margin-inline-start: -8px;
  border-radius: 0 9px 9px 0;
}

.calendar-event-range-bar-single {
  padding-inline-start: 6px;
  border-radius: 9px;
}
```
