import React from 'react';
import { spyElementPrototype } from '@rc-component/util';
import { vi } from 'vitest';

import Tooltip from '..';
import type { GetRef } from '../../_util/type';
import { render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Tooltip.Unique', () => {
  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('render MotionContent', async () => {
    const tooltipRef = React.createRef<GetRef<typeof Tooltip>>();

    render(
      <ConfigProvider tooltip={{ unique: true }}>
        <Tooltip title="text" open ref={tooltipRef}>
          <span>xxxx</span>
        </Tooltip>
      </ConfigProvider>,
    );

    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip-unique-container-visible')).toBeTruthy();

    expect(() => {
      tooltipRef.current?.forceAlign();
    }).not.toThrow();
  });
});
