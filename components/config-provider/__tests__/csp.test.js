import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Button from '../../button';

describe('ConfigProvider', () => {
  it('Content Security Policy', () => {
    const csp = { nonce: 'test-antd' };
    const wrapper = mount(
      <ConfigProvider csp={csp}>
        <Button />
      </ConfigProvider>,
    );

    expect(wrapper.find('Wave').instance().csp).toBe(csp);
  });
});
