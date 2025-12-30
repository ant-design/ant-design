import React from 'react';

import ConfigProvider from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import { ConfigContext } from '../context';

jest.mock('@rc-component/util/lib/Dom/isVisible', () => () => true);

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

  it('should pass wave config to context', () => {
    const { container } = render(
      <ConfigProvider wave={{ triggerType: 'onPointerDown' }}>
        <ConfigContext.Consumer>
          {(context) => <div id="trigger">{context.wave?.triggerType}</div>}
        </ConfigContext.Consumer>
      </ConfigProvider>,
    );
    expect(container.querySelector('#trigger')?.textContent).toBe('onPointerDown');
  });
});
