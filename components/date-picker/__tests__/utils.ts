import { fireEvent } from '../../../tests/utils';
import type { render } from '../../../tests/utils';

export function openPanel(wrapper: ReturnType<typeof render>) {
  const target = wrapper.container?.querySelector('.ant-calendar-picker-input');
  if (target) {
    fireEvent.click(target);
  }
}

export function clearInput(wrapper: ReturnType<typeof render>) {
  const target = wrapper.container?.querySelector('.ant-calendar-picker-clear');
  if (target) {
    fireEvent.click(target);
  }
}

export function nextYear(wrapper: ReturnType<typeof render>) {
  const target = wrapper.container?.querySelector('.ant-calendar-next-year-btn');
  if (target) {
    fireEvent.click(target);
  }
}

export function nextMonth(wrapper: ReturnType<typeof render>) {
  const target = wrapper.container?.querySelector('.ant-calendar-next-month-btn');
  if (target) {
    fireEvent.click(target);
  }
}

export function openPicker(wrapper: ReturnType<typeof render>, index = 0) {
  const target = wrapper.container?.querySelectorAll('input')[index];
  if (target) {
    fireEvent.mouseDown(target);
    fireEvent.focus(target);
  }
}

export function closePicker(wrapper: ReturnType<typeof render>, index = 0) {
  const target = wrapper.container?.querySelectorAll('input')[index];
  if (target) {
    fireEvent.blur(target);
  }
}

export function selectCell(wrapper: ReturnType<typeof render>, text: string | number, index = 0) {
  let matchCell: HTMLTableCellElement | null = null;
  const target = wrapper.container?.querySelectorAll('table')?.[index];
  if (target) {
    const tds = target?.querySelectorAll('td');
    tds.forEach(td => {
      if (
        td.querySelector('div')?.innerHTML === String(text) &&
        td.className.includes('-in-view')
      ) {
        matchCell = td;
        fireEvent.click(td);
      }
    });
    if (!matchCell) {
      throw new Error('Cell not match in picker panel.');
    }
  }

  return matchCell;
}
