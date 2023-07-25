import React from 'react';
import ConfigProvider from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';

jest.mock('rc-util/lib/Dom/isVisible', () => () => true);

describe('ConfigProvider.Wave', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('disable', async () => {
    const showEffect = jest.fn();
    const onClick = jest.fn();

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
    const showEffect = jest.fn();
    const onClick = jest.fn();

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
