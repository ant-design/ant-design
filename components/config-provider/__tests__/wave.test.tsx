import React from 'react';
import ConfigProvider from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';

vi.mock('rc-util/es/Dom/isVisible', () => {
  return {
    default: () => true,
  };
});

describe('ConfigProvider.Wave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('disable', async () => {
    const showEffect = vi.fn();
    const onClick = vi.fn();

    const { container } = render(
      <ConfigProvider wave={{ disabled: true, showEffect }}>
        <Button onClick={onClick} />
      </ConfigProvider>,
    );

    fireEvent.click(container.querySelector('button')!);
    await waitFakeTimer();

    expect(onClick).toHaveBeenCalled();
    expect(showEffect).not.toHaveBeenCalled();
  });

  it('support customize effect', async () => {
    const showEffect = vi.fn();
    const onClick = vi.fn();

    const { container } = render(
      <ConfigProvider wave={{ showEffect }}>
        <Button onClick={onClick} />
      </ConfigProvider>,
    );

    fireEvent.click(container.querySelector('button')!);
    await waitFakeTimer();

    expect(onClick).toHaveBeenCalled();
    expect(showEffect).toHaveBeenCalled();
  });
});
