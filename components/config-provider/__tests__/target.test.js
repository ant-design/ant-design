import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Affix from '../../affix';

describe('ConfigProvider.getTargetContainer', () => {
  it('Affix', () => {
    jest.useFakeTimers();
    const getTargetContainer = jest.fn();
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
});
