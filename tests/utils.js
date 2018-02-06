import moment from 'moment';
import MockDate from 'mockdate';

export function setMockDate(dateString = '2017-09-18T03:30:07.795Z') {
  MockDate.set(moment(dateString).valueOf() + (new Date().getTimezoneOffset() * 60 * 1000));
}

export function resetMockDate() {
  MockDate.reset();
}
