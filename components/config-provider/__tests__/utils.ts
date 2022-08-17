import type { mount } from 'enzyme';

export function openPicker(wrapper: ReturnType<typeof mount>, index = 0) {
  wrapper.find('input').at(index).simulate('mousedown').simulate('focus');
}
export function closePicker(wrapper: ReturnType<typeof mount>, index = 0) {
  wrapper.find('input').at(index).simulate('blur');
}

export function selectCell(wrapper: ReturnType<typeof mount>, text: number | string, index = 0) {
  let matchCell;
  wrapper
    .find('table')
    .at(index)
    .find('td')
    .forEach(td => {
      if (td.text() === String(text) && td?.props()?.className?.includes('-in-view')) {
        matchCell = td;
        td.simulate('click');
      }
    });

  if (!matchCell) {
    throw new Error('Cell not match in picker panel.');
  }

  return matchCell;
}
