import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ConfigProvider from '..';
import zhCN from '../../locale/zh_CN';
import Form from '../../form';

describe('ConfigProvider.Form', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('form validateMessages', () => {
    const wrapperComponent = ({ validateMessages }) => {
      const formRef = React.createRef();

      const wrapper = mount(
        <ConfigProvider locale={zhCN} form={{ validateMessages }}>
          <Form ref={formRef} initialValues={{ age: 18 }}>
            <Form.Item name="test" label="姓名" rules={[{ required: true }]}>
              <input />
            </Form.Item>
            <Form.Item name="age" label="年龄" rules={[{ type: 'number', len: 17 }]}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      return [wrapper, formRef];
    };

    it('set locale zhCN', async () => {
      const [wrapper, formRef] = wrapperComponent({});

      await act(async () => {
        try {
          await formRef.current.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        wrapper.update();
        await Promise.resolve();
      });

      expect(wrapper.find('.ant-form-item-explain').first().text()).toEqual('请输入姓名');
    });

    it('set locale zhCN and set form validateMessages one item, other use default message', async () => {
      const [wrapper, formRef] = wrapperComponent({ validateMessages: { required: '必须' } });

      await act(async () => {
        try {
          await formRef.current.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        wrapper.update();
        await Promise.resolve();
      });

      expect(wrapper.find('.ant-form-item-explain').first().text()).toEqual('必须');
      expect(wrapper.find('.ant-form-item-explain').last().text()).toEqual('年龄必须等于17');
    });
  });

  describe('form requiredMark', () => {
    it('set requiredMark optional', async () => {
      const wrapper = mount(
        <ConfigProvider form={{ requiredMark: 'optional' }}>
          <Form initialValues={{ age: 18 }}>
            <Form.Item name="age" label="年龄" rules={[{ type: 'number', len: 17 }]}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(wrapper).toMatchRenderedSnapshot();
    });
  });
});
