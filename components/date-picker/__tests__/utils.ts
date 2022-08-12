import { fireEvent } from '../../../tests/utils';
import type { render } from '../../../tests/utils';

export function selectDate(wrapper: any, date: any, index?: number) {
  let calendar = wrapper;
  if (index !== undefined) {
    calendar = wrapper.find('.ant-calendar-range-part').at(index);
  }
  calendar.find({ title: date.format('LL'), role: 'gridcell' }).simulate('click');
}

export function hasSelected(wrapper: any, date: any) {
  return wrapper
    .find({ title: date.format('LL'), role: 'gridcell' })
    .hasClass('ant-calendar-selected-day');
}

export function openPanel(wrapper: ReturnType<typeof render>) {
  fireEvent.click(wrapper.container.querySelector('.ant-calendar-picker-input')!);
}

export function clearInput(wrapper: ReturnType<typeof render>) {
  fireEvent.click(wrapper.container.querySelector('.ant-calendar-picker-clear')!);
}

export function nextYear(wrapper: ReturnType<typeof render>) {
  fireEvent.click(wrapper.container.querySelector('.ant-calendar-next-year-btn')!);
}

export function nextMonth(wrapper: ReturnType<typeof render>) {
  fireEvent.click(wrapper.container.querySelector('.ant-calendar-next-month-btn')!);
}

export function openPicker(wrapper: ReturnType<typeof render>, index = 0) {
  fireEvent.mouseDown(wrapper.container.querySelectorAll('input')[index]!);
  fireEvent.focus(wrapper.container.querySelectorAll('input')[index]!);
}

export function closePicker(wrapper: ReturnType<typeof render>, index = 0) {
  fireEvent.blur(wrapper.container.querySelectorAll('input')[index]!);
}

export function selectCell(wrapper: ReturnType<typeof render>, text: string | number, index = 0) {
  const matchCell = Array.from(
    wrapper.container?.querySelectorAll('table')?.[index]?.querySelectorAll('td'),
  ).find(
    td => td.querySelector<HTMLDivElement>('.ant-picker-cell-inner')?.innerText === String(text),
  );

  if (matchCell) {
    fireEvent.click(matchCell);
  } else {
    throw new Error('Cell not match in picker panel.');
  }

  return matchCell;
}
