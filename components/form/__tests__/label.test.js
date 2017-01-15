import React from 'react';
import { mount } from 'enzyme';
import Form from '..';

describe('Form', () => {
  it('should remove duplicated user input colon', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="label:">input</Form.Item>
        <Form.Item label="label：">input</Form.Item>
      </Form>
    );
    expect(wrapper.find('.ant-form-item-label label').at(0).text()).not.toContain(':');
    expect(wrapper.find('.ant-form-item-label label').at(1).text()).not.toContain('：');
  });

  it('should not remove duplicated user input colon when props colon is false', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="label:" colon={false}>input</Form.Item>
        <Form.Item label="label：" colon={false}>input</Form.Item>
      </Form>
    );
    expect(wrapper.find('.ant-form-item-label label').at(0).text()).toContain(':');
    expect(wrapper.find('.ant-form-item-label label').at(1).text()).toContain('：');
  });

  it('should not remove duplicated user input colon when layout is vertical', () => {
    const wrapper = mount(
      <Form vertical>
        <Form.Item label="label:">input</Form.Item>
        <Form.Item label="label：">input</Form.Item>
      </Form>
    );
    expect(wrapper.find('.ant-form-item-label label').at(0).text()).toContain(':');
    expect(wrapper.find('.ant-form-item-label label').at(1).text()).toContain('：');
  });
});
