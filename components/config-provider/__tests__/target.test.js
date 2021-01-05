import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Affix from '../../affix';
import Anchor from '../../anchor';

describe('ConfigProvider.getTargetContainer', () => {
  it('Affix', () => {
    jest.useFakeTimers();
    const getTargetContainer = jest.fn(() => window);
    mount(
      <ConfigProvider getTargetContainer={getTargetContainer}>
        <Affix>
          <span />
        </Affix>
      </ConfigProvider>,
    );

    jest.runAllTimers();

    expect(getTargetContainer).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('Anchor', () => {
    jest.useFakeTimers();
    const getTargetContainer = jest.fn(() => window);
    mount(
      <ConfigProvider getTargetContainer={getTargetContainer}>
        <Anchor>
          <Anchor.Link href="#API" title="API" />
        </Anchor>
      </ConfigProvider>,
    );

    jest.runAllTimers();

    expect(getTargetContainer).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
