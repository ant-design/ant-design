import ChatBox from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('chat-box', () => {
  mountTest(ChatBox);
  rtlTest(ChatBox);
});
