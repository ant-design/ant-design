import moment from 'moment';
import MockDate from 'mockdate';

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  MockDate.set(moment(dateString));
}

export function resetMockDate() {
  MockDate.reset();
}
