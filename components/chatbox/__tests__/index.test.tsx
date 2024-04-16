import React from 'react';

import Chatbox from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';

describe('chatbox', () => {
  mountTest(() => <Chatbox content="test" />);
  rtlTest(() => <Chatbox content="test" />);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Chatbox component work', () => {
    const { container } = render(<Chatbox content="test" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chatbox');
    expect(element).toBeTruthy();
    expect(element).toMatchSnapshot();
  });

  it('Chatbox support content', () => {
    const { container } = render(<Chatbox content="hello world" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chatbox .ant-chatbox-content');
    expect(element?.textContent).toBe('hello world');
  });

  it('Chatbox support contentRender', () => {
    const { container } = render(
      <Chatbox
        content="test-contentRender"
        contentRender={(content) => <span className="test-contentRender">{content}</span>}
      />,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-chatbox .test-contentRender');
    expect(element).toBeTruthy();
    expect(element?.textContent).toBe('test-contentRender');
  });

  it('Chatbox support typing', () => {
    const { container } = render(<Chatbox typing content="test" />);
    const selectors = '.ant-chatbox .ant-chatbox-content';
    expect(container.querySelector<HTMLDivElement>(selectors)).toHaveClass(
      'ant-chatbox-content-cursorBlink',
    );
  });

  it('Chatbox support avatar', () => {
    const { container } = render(
      <Chatbox avatar={<span className="test-avatar">avatar</span>} content="" />,
    );
    expect(container.querySelector<HTMLSpanElement>('.ant-chatbox .test-avatar')).toBeTruthy();
  });

  it('Chatbox support loading', () => {
    const { container } = render(<Chatbox content="" loading />);
    const selectors = '.ant-chatbox .ant-chatbox-content .ant-chatbox-dot';
    expect(container.querySelector<HTMLSpanElement>(selectors)).toBeTruthy();
  });

  it('Chatbox support placement', () => {
    const { container, rerender } = render(<Chatbox placement="start" content="" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chatbox');
    expect(element).toHaveClass('ant-chatbox-start');
    rerender(<Chatbox placement="end" content="" />);
    expect(element).toHaveClass('ant-chatbox-end');
  });

  it('Chatbox support typing effect', async () => {
    const { container } = render(<Chatbox typing content="你好你好你好" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chatbox .ant-chatbox-content');
    expect(element?.textContent).toBe('你');
    await waitFakeTimer();
    expect(element?.textContent).toBe('你好你好你好');
  });

  it('Chatbox Should support Chatbox', () => {
    const { container } = render(
      <Chatbox
        content="hello"
        avatar={<span>avatar</span>}
        className="test-className"
        classNames={{ avatar: 'test-avatar', content: 'test-content' }}
        style={{ backgroundColor: 'green' }}
        styles={{ avatar: { color: 'red' }, content: { color: 'blue' } }}
      />,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-chatbox');
    const avatarElement = element?.querySelector<HTMLDivElement>('.ant-chatbox-avatar');
    const contentElement = element?.querySelector<HTMLDivElement>('.ant-chatbox-content');
    expect(element).toHaveClass('test-className');
    expect(avatarElement).toHaveClass('test-avatar');
    expect(contentElement).toHaveClass('test-content');
    expect(element).toHaveStyle({ backgroundColor: 'green' });
    expect(avatarElement).toHaveStyle({ color: 'red' });
    expect(contentElement).toHaveStyle({ color: 'blue' });
  });
});
