import React from 'react';
import { spyElementPrototype } from '@rc-component/util';

import Popover from '..';
import { render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Popover.Unique', () => {
  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('renders the unique container when popover.unique is enabled', async () => {
    render(
      <ConfigProvider popover={{ unique: true }}>
        <Popover content="text" title="title" open>
          <span>trigger</span>
        </Popover>
      </ConfigProvider>,
    );

    await waitFakeTimer();
    expect(document.querySelector('.ant-popover-unique-container-visible')).toBeTruthy();
  });

  it('keeps the default popup when popover.unique is not enabled', async () => {
    render(
      <ConfigProvider>
        <Popover content="text" title="title" open>
          <span>trigger</span>
        </Popover>
      </ConfigProvider>,
    );

    await waitFakeTimer();
    expect(document.querySelector('.ant-popover-unique-container')).toBeFalsy();
    expect(document.querySelector('.ant-popover')).toBeTruthy();
  });
});
