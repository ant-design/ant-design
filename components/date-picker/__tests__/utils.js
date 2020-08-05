/* eslint-disable import/prefer-default-export */
export function selectDate(wrapper, date, index) {
  let calendar = wrapper;
  if (index !== undefined) {
    calendar = wrapper.find('.ant-calendar-range-part').at(index);
  }
  calendar.find({ title: date.format('LL'), role: 'gridcell' }).simulate('click');
}

export function hasSelected(wrapper, date) {
  return wrapper
    .find({ title: date.format('LL'), role: 'gridcell' })
    .hasClass('ant-calendar-selected-day');
}

export function openPanel(wrapper) {
  wrapper.find('.ant-calendar-picker-input').simulate('click');
}

export function clearInput(wrapper) {
  wrapper
    .find('.ant-calendar-picker-clear')
    .hostNodes()
    .simulate('click');
}

export function nextYear(wrapper) {
  wrapper.find('.ant-calendar-next-year-btn').simulate('click');
}

export function nextMonth(wrapper) {
  wrapper.find('.ant-calendar-next-month-btn').simulate('click');
}

export function openPicker(wrapper, index = 0) {
  wrapper
    .find('input')
    .at(index)
    .simulate('mousedown')
    .simulate('focus');
}
export function closePicker(wrapper, index = 0) {
  wrapper
    .find('input')
    .at(index)
    .simulate('blur');
}

export function selectCell(wrapper, text, index = 0) {
  let matchCell;

  wrapper
    .find('table')
    .at(index)
    .find('td')
    .forEach(td => {
      if (td.text() === String(text) && td.props().className.includes('-in-view')) {
        matchCell = td;
        td.simulate('click');
      }
    });

  if (!matchCell) {
    throw new Error('Cell not match in picker panel.');
  }

  return matchCell;
}
