import React from 'react';
import { mount } from 'enzyme';
import Form from '..';

describe('Form', () => {
  // Mock of `querySelector`
  const originQuerySelector = HTMLElement.prototype.querySelector;
  HTMLElement.prototype.querySelector = function querySelector(str) {
    const match = str.match(/^\[id=('|")(.*)('|")]$/);
    const id = match && match[2];

    // Use origin logic
    if (id) {
      const [input] = this.getElementsByTagName('input');
      if (input && input.id === id) {
        return input;
      }
    }

    return originQuerySelector.call(this, str);
  };

  afterAll(() => {
    HTMLElement.prototype.querySelector = originQuerySelector;
  });

  it('should remove duplicated user input colon', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="label:">input</Form.Item>
        <Form.Item label="label：">input</Form.Item>
      </Form>,
    );

    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(0)
        .text(),
    ).not.toContain(':');
    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(1)
        .text(),
    ).not.toContain('：');
  });

  it('should disable colon when props colon Form is false', () => {
    const wrapper = mount(
      <Form colon={false}>
        <Form.Item label="label">input</Form.Item>
      </Form>,
    );
    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(0)
        .hasClass('ant-form-item-no-colon'),
    ).toBe(true);
  });

  it('should props colon of Form.Item override the props colon of Form.', () => {
    const wrapper = mount(
      <Form colon={false}>
        <Form.Item label="label">input</Form.Item>
        <Form.Item label="label" colon>
          input
        </Form.Item>
        <Form.Item label="label" colon={false}>
          input
        </Form.Item>
      </Form>,
    );
    expect(wrapper.render()).toMatchSnapshot();

    const testLabel = mount(
      <Form colon={false}>
        <Form.Item label="label:" colon>
          input
        </Form.Item>
        <Form.Item label="label：" colon>
          input
        </Form.Item>
      </Form>,
    );
    expect(
      testLabel
        .find('.ant-form-item-label label')
        .at(0)
        .text(),
    ).not.toContain(':');
    expect(
      testLabel
        .find('.ant-form-item-label label')
        .at(1)
        .text(),
    ).not.toContain('：');
  });

  it('should not remove duplicated user input colon when props colon is false', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="label:" colon={false}>
          input
        </Form.Item>
        <Form.Item label="label：" colon={false}>
          input
        </Form.Item>
      </Form>,
    );
    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(0)
        .text(),
    ).toContain(':');
    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(1)
        .text(),
    ).toContain('：');
  });

  it('should not remove duplicated user input colon when layout is vertical', () => {
    const wrapper = mount(
      <Form layout="vertical">
        <Form.Item label="label:">input</Form.Item>
        <Form.Item label="label：">input</Form.Item>
      </Form>,
    );
    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(0)
        .text(),
    ).toContain(':');
    expect(
      wrapper
        .find('.ant-form-item-label label')
        .at(1)
        .text(),
    ).toContain('：');
  });

  it('should has dom with .ant-form-item-control-wrapper', () => {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const wrapper = mount(
      <Form>
        <Form.Item {...formItemLayout}>input</Form.Item>
        <Form.Item>input</Form.Item>
      </Form>,
    );
    expect(wrapper.find('.ant-form-item-control-wrapper').hostNodes().length).toBe(2);
    expect(wrapper.find('.ant-form-item-control-wrapper.ant-col-14').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/7351
  it('focus correct input when click label', () => {
    const Form1 = Form.create()(({ form }) => (
      <Form>
        <Form.Item label="label 1">{form.getFieldDecorator('test')(<input />)}</Form.Item>
      </Form>
    ));
    const Form2 = Form.create()(({ form }) => (
      <Form>
        <Form.Item label="label 2">{form.getFieldDecorator('test2')(<input />)}</Form.Item>
      </Form>
    ));
    const wrapper = mount(
      <div>
        <Form1 />
        <Form2 />
      </div>,
    );
    wrapper
      .find('Form label')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('Form input')
        .at(0)
        .getDOMNode(),
    ).toBe(document.activeElement);
    wrapper
      .find('Form label')
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('Form input')
        .at(1)
        .getDOMNode(),
    ).toBe(document.activeElement);
  });

  // https://github.com/ant-design/ant-design/issues/7693
  it('should not throw error when is not a valid id', () => {
    const Form1 = Form.create()(({ form }) => (
      <Form>
        <Form.Item label="label 1">
          {form.getFieldDecorator('member[0].name.firstname')(<input />)}
        </Form.Item>
      </Form>
    ));
    const wrapper = mount(<Form1 />);
    expect(() => {
      wrapper
        .find('Form label')
        .at(0)
        .simulate('click');
    }).not.toThrow();
    expect(
      wrapper
        .find('Form input')
        .at(0)
        .getDOMNode(),
    ).toBe(document.activeElement);
  });
});
