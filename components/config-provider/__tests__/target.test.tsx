import React from 'react';
import ConfigProvider from '..';
import { act, render } from '../../../tests/utils';
import Affix from '../../affix';
import Anchor from '../../anchor';

describe('ConfigProvider.getTargetContainer', () => {
  it('Affix', () => {
    jest.useFakeTimers();
    const getTargetContainer = jest.fn(() => window);
    render(
      <ConfigProvider getTargetContainer={getTargetContainer}>
        <Affix>
          <span />
        </Affix>
      </ConfigProvider>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getTargetContainer).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('Anchor', () => {
    jest.useFakeTimers();
    const getTargetContainer = jest.fn(() => window);
    render(
      <ConfigProvider getTargetContainer={getTargetContainer}>
        <Anchor>
          <Anchor.Link href="#API" title="API" />
        </Anchor>
      </ConfigProvider>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getTargetContainer).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
