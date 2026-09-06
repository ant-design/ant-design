import React from 'react';
import { spyElementPrototype } from '@rc-component/util';

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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('render MotionContent', async () => {
    const tooltipRef = React.createRef<GetRef<typeof Tooltip>>();

    render(
      <ConfigProvider
        tooltip={{
          unique: true,
          styles: {
            container: {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(12px)',
            },
          },
        }}
      >
        <Tooltip title="text" open ref={tooltipRef}>
          <span>xxxx</span>
        </Tooltip>
      </ConfigProvider>,
    );

    await waitFakeTimer();
    const root = document.querySelector('.ant-tooltip');
    const container = document.querySelector('.ant-tooltip-container');
    const uniqueContainer = document.querySelector('.ant-tooltip-unique-container-visible');

    expect(uniqueContainer).toHaveStyle({ backgroundColor: 'rgba(255, 255, 255, 0.4)' });
    expect(getComputedStyle(root!).filter || 'none').toBe('none');
    expect(getComputedStyle(container!).filter || 'none').toBe('none');
    expect(getComputedStyle(uniqueContainer!).filter).toBe('var(--ant-drop-shadow-popover)');

    expect(() => {
      tooltipRef.current?.forceAlign();
    }).not.toThrow();
  });
});
