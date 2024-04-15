import React from 'react';

import ChatBox from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('chat-box', () => {
  mountTest(() => <ChatBox content="test" />);
  rtlTest(() => <ChatBox content="test" />);
  it('ChatBox component work', () => {
    const { container } = render(<ChatBox content="test" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chat-box');
    expect(element).toBeTruthy();
    expect(element).toMatchSnapshot();
  });
});
