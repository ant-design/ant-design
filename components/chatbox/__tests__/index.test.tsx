import React from 'react';

import Chatbox from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('chatbox', () => {
  mountTest(() => <Chatbox content="test" />);
  rtlTest(() => <Chatbox content="test" />);
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
    expect(
      container.querySelector<HTMLSpanElement>('.ant-chatbox .ant-spin.ant-spin-spinning'),
    ).toBeTruthy();
  });

  it('Chatbox support placement', () => {
    const { container, rerender } = render(<Chatbox placement="start" content="" />);
    const element = container.querySelector<HTMLDivElement>('.ant-chatbox');
    expect(element).toHaveClass('ant-chatbox-start');
    rerender(<Chatbox placement="end" content="" />);
    expect(element).toHaveClass('ant-chatbox-end');
  });
});
