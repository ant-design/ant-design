import React from 'react';
import ConfigProvider from '..';
import { act, render } from '../../../tests/utils';
import Affix from '../../affix';
import Anchor from '../../anchor';

describe('ConfigProvider.getTargetContainer', () => {
  it('Affix', () => {
    vi.useFakeTimers();
    const getTargetContainer = vi.fn(() => window);
    render(
      <ConfigProvider getTargetContainer={getTargetContainer}>
        <Affix>
          <span />
        </Affix>
      </ConfigProvider>,
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(getTargetContainer).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('Anchor', () => {
    vi.useFakeTimers();
    const getTargetContainer = vi.fn(() => window);
    render(
      <ConfigProvider getTargetContainer={getTargetContainer}>
        <Anchor>
          <Anchor.Link href="#API" title="API" />
        </Anchor>
      </ConfigProvider>,
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(getTargetContainer).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
