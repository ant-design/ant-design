import React from 'react';
import Switch from '..';
import { mount } from 'enzyme';
import focusTest from '../../../tests/shared/focusTest';

describe('Switch', () => {
  focusTest(Switch);

  it('should has click wave effect', async () => {
    const wrapper = mount(<Switch />);
    wrapper.find('.ant-switch').getDOMNode().click();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(wrapper.render()).toMatchSnapshot();
  });
});
