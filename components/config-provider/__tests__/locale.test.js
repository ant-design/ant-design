import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';

describe('ConfigProvider.Locale', () => {
  it('not throw', () => {
    mount(
      <ConfigProvider locale={{}}>
        <span />
        <span />
      </ConfigProvider>,
    );
  });
});
