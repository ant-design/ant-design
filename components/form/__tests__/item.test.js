/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { mount } from 'enzyme';
import Form from '..';

describe('Form.Item', () => {
  it('passes id as a prop', () => {
    const wrapper = mount(<Form.Item id="id">Test</Form.Item>);
    expect(wrapper.find('div#id.ant-form-item').text()).toBe('Test');
  });
});
