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

  it('ChatBox support content', () => {
    const { container } = render(<ChatBox content="hello world" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chat-box .ant-chat-box-content');
    expect(element?.textContent).toBe('hello world');
  });

  it('ChatBox support contentRender', () => {
    const { container } = render(
      <ChatBox
        content="test-contentRender"
        contentRender={(content) => <span className="test-contentRender">{content}</span>}
      />,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-chat-box .test-contentRender');
    expect(element).toBeTruthy();
    expect(element?.textContent).toBe('test-contentRender');
  });

  it('ChatBox support step', () => {
    const { container } = render(<ChatBox step content="test" />);
    const selectors = '.ant-chat-box .ant-chat-box-content';
    expect(container.querySelector<HTMLDivElement>(selectors)).toHaveClass(
      'ant-chat-box-content-cursorBlink',
    );
  });

  it('ChatBox support avatar', () => {
    const { container } = render(
      <ChatBox avatar={<span className="test-avatar">avatar</span>} content="" />,
    );
    expect(container.querySelector<HTMLSpanElement>('.ant-chat-box .test-avatar')).toBeTruthy();
  });

  it('ChatBox support loading', () => {
    const { container } = render(<ChatBox content="" loading />);
    expect(
      container.querySelector<HTMLSpanElement>('.ant-chat-box .ant-spin.ant-spin-spinning'),
    ).toBeTruthy();
  });

  it('ChatBox support placement', () => {
    const { container, rerender } = render(<ChatBox placement="start" content="" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chat-box');
    expect(element).toHaveClass('ant-chat-box-start');
    rerender(<ChatBox placement="end" content="" />);
    expect(element).toHaveClass('ant-chat-box-end');
  });
});
