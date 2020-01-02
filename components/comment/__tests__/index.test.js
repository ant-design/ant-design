import Comment from '../index';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Comment', () => {
  mountTest(Comment);
  rtlTest(Comment);
});
