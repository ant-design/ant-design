import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Form from '../../form';
import zhCN from '../../locale/zh_CN';

describe('ConfigProvider.Form', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('form validateMessages', () => {
    const renderComponent = ({ validateMessages }) => {
      const formRef = React.createRef();

      const { container } = render(
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

      return [container, formRef];
    };

    it('set locale zhCN', async () => {
      const [container, formRef] = renderComponent({});

      await act(async () => {
        try {
          await formRef.current.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        await Promise.resolve();
      });

      expect(container.querySelector('.ant-form-item-explain')).toHaveTextContent('请输入姓名');
    });

    it('set locale zhCN and set form validateMessages one item, other use default message', async () => {
      const [container, formRef] = renderComponent({ validateMessages: { required: '必须' } });

      await act(async () => {
        try {
          await formRef.current.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        await Promise.resolve();
      });

      const explains = Array.from(container.querySelectorAll('.ant-form-item-explain'));

      expect(explains[0]).toHaveTextContent('必须');
      expect(explains[explains.length - 1]).toHaveTextContent('年龄必须等于17');
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

      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe('form colon', () => {
    it('set colon false', async () => {
      const wrapper = mount(
        <ConfigProvider form={{ colon: false }}>
          <Form>
            <Form.Item label="没有冒号">
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(wrapper.exists('.ant-form-item-no-colon')).toBeTruthy();
    });

    it('set colon default', async () => {
      const wrapper = mount(
        <ConfigProvider>
          <Form>
            <Form.Item label="姓名">
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(wrapper.exists('.ant-form-item-no-colon')).toBeFalsy();
    });
  });
});
