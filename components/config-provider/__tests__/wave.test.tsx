import React from 'react';
import { vi } from 'vitest';

import ConfigProvider from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import { ConfigContext } from '../context';

vi.mock('@rc-component/util', async () => {
  const util = await vi.importActual<typeof import('@rc-component/util')>('@rc-component/util');
  return {
    ...util,
    isVisible: () => true,
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

  it('should pass wave config to context', () => {
    const { container } = render(
      <ConfigProvider wave={{ triggerType: 'pointerdown' }}>
        <ConfigContext.Consumer>
          {(context) => <div id="trigger">{context.wave?.triggerType}</div>}
        </ConfigContext.Consumer>
      </ConfigProvider>,
    );
    expect(container.querySelector('#trigger')?.textContent).toBe('pointerdown');
  });
});
