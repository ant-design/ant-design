import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Button from '../../button';
import Space from '../../space';
import mountTest from '../../../tests/shared/mountTest';

describe('ConfigProvider', () => {
  mountTest(() => (
    <ConfigProvider>
      <div />
    </ConfigProvider>
  ));

  it('Content Security Policy', () => {
    const csp = { nonce: 'test-antd' };
    const wrapper = mount(
      <ConfigProvider csp={csp}>
        <Button />
      </ConfigProvider>,
    );

    expect(wrapper.find('Wave').instance().csp).toBe(csp);
  });

  it('autoInsertSpaceInButton', () => {
    const wrapper = mount(
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button>确定</Button>
      </ConfigProvider>,
    );

    expect(wrapper.find('Button').text()).toBe('确定');
  });

  it('spaceBaseSize', () => {
    const wrapper = mount(
      <ConfigProvider spaceBaseSize={7}>
        <Space />
      </ConfigProvider>,
    );
    expect(getComputedStyle(wrapper.find('span').getDOMNode())).toHaveProperty('width', '14px');
  });
});
