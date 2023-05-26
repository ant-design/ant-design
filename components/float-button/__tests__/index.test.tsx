import React from 'react';
import FloatButton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import getOffset from '../util';

describe('FloatButton', () => {
  mountTest(FloatButton);
  rtlTest(FloatButton);
  it('should correct render', () => {
    const { container } = render(<FloatButton />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render <button> when href not exist', () => {
    const { container } = render(<FloatButton href={undefined} />);
    expect(container.querySelector('button')).toBeTruthy();
  });
  it('should render <a> when href exist', () => {
    const url = 'https://ant.design/index-cn';
    const target = '_blank';
    const { container } = render(<FloatButton href={url} target={target} />);
    expect(container.querySelector('a')).toBeTruthy();
    expect(container.querySelector('a')?.href).toBe(url);
    expect(container.querySelector('a')?.target).toBe(target);
  });
  it('support type', () => {
    const [defaultType, primaryType] = ['default', 'primary'] as const;
    const { container, rerender } = render(<FloatButton type={defaultType} />);
    expect(container.querySelector(`.ant-float-btn-${defaultType}`)).toBeTruthy();
    rerender(<FloatButton type={primaryType} />);
    expect(container.querySelector(`.ant-float-btn-${primaryType}`)).toBeTruthy();
  });
  it('support shape', () => {
    const [defaultShape, squareShape] = ['circle', 'square'] as const;
    const { container, rerender } = render(<FloatButton shape={defaultShape} />);
    expect(container.querySelector(`.ant-float-btn-${defaultShape}`)).toBeTruthy();
    rerender(<FloatButton shape={squareShape} />);
    expect(container.querySelector(`.ant-float-btn-${squareShape}`)).toBeTruthy();
  });
  it('support onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<FloatButton onClick={onClick} />);
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
  });
  it('should console Error', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<FloatButton description="test" shape="circle" />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: FloatButton] supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );
    errSpy.mockRestore();
  });

  it('tooltip should support number `0`', async () => {
    jest.useFakeTimers();
    const { container } = render(<FloatButton tooltip={0} />);
    fireEvent.mouseEnter(container.querySelector<HTMLDivElement>('.ant-float-btn-body')!);
    await waitFakeTimer();
    const element = container.querySelector('.ant-tooltip')?.querySelector('.ant-tooltip-inner');
    expect(element?.textContent).toBe('0');
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('getOffset should return 0 when radius is 0', () => {
    const result1 = getOffset(0);
    expect(result1).toBe(0);
    const result2 = getOffset(1);
    expect(result2).not.toBe(0);
  });

  it('support badge number', () => {
    const { container } = render(<FloatButton badge={{ count: 10 }} />);
    const badgeElement = container?.querySelector<HTMLSpanElement>('.ant-float-btn .ant-badge');
    expect(badgeElement?.querySelector<HTMLElement>('.ant-badge-count')).toBeTruthy();
  });

  it('support badge dot', () => {
    const { container } = render(<FloatButton badge={{ dot: true }} />);
    const badgeElement = container?.querySelector<HTMLSpanElement>('.ant-float-btn .ant-badge');
    expect(badgeElement?.querySelector<HTMLElement>('.ant-badge-dot')).toBeTruthy();
  });
});
