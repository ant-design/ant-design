import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';

describe('ConfigProvider.Locale', () => {
  it('not throw', () => {
    if (process.env.REACT === '15') {
      return;
    }

    mount(
      <ConfigProvider locale={{}}>
        <span />
        <span />
      </ConfigProvider>,
    );
  });
});
