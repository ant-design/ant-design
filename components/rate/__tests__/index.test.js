import Rate from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Rate', () => {
  focusTest(Rate, { refFocus: true });
  mountTest(Rate);
  rtlTest(Rate);
});
