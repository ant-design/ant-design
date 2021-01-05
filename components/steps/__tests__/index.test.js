import Steps from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Steps', () => {
  mountTest(Steps);
  rtlTest(Steps);
});
