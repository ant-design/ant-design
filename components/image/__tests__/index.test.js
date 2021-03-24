import Image from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Image', () => {
  mountTest(Image);
  rtlTest(Image);
});
