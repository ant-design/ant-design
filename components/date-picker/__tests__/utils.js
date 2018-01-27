/* eslint-disable import/prefer-default-export */
export function selectDate(wrapper, date, index) {
  let calendar = wrapper;
  if (index) {
    calendar = wrapper.find('.ant-calendar-range-part')[index];
  }
  calendar.find({ title: date.format('LL') }).simulate('click');
}
