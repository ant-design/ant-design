import React from 'react';
import { act } from 'react-dom/test-utils';
import ConfigProvider from '..';
import { render, screen } from '../../../tests/utils';
import Form from '../../form';
import zhCN from '../../locale/zh_CN';

describe('ConfigProvider.Form', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('form validateMessages', () => {
    const setup = ({ validateMessages }) => {
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

      return { container, formRef };
    };
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
      return [container, formRef] as const;
    };

    it('should show validate message correctly when set locale zhCN', async () => {
      const { formRef } = setup({});

      await act(async () => {
        try {
          await formRef.current?.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      act(() => {
        jest.runAllTimers();
      });

      await Promise.resolve();

      act(() => {
        jest.runAllTimers();
      });

      expect(screen.getByText('请输入姓名')).toBeInTheDocument();
    });

    it('should set locale zhCN and set correspond validate messages when use use validateMessages, others use default message', async () => {
      const { formRef } = setup({ validateMessages: { required: '必须' } });

      await act(async () => {
        try {
          await formRef.current?.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      act(() => {
        jest.runAllTimers();
      });

      await Promise.resolve();

      act(() => {
        jest.runAllTimers();
      });

      // first field is required, it should be set as validateMessage's message
      expect(screen.getAllByRole('alert')[0]).toHaveTextContent('必须');
      // second field is not set in validateMessage so it should be default message
      expect(screen.getAllByRole('alert')[1]).toHaveTextContent('年龄必须等于17');
    });
  });

  it('should set form item requiredMark optional when set requiredMark optional in provider', async () => {
    render(
      <ConfigProvider form={{ requiredMark: 'optional' }}>
        <Form initialValues={{ age: 18 }}>
          <Form.Item name="age" label="年龄" rules={[{ type: 'number', len: 17 }]}>
            <input />
          </Form.Item>
        </Form>
      </ConfigProvider>,
    );

    expect(screen.getByTitle('年龄')).toHaveClass('ant-form-item-required-mark-optional');
  });

  describe('form colon', () => {
    it('should set form item colon false when set form colon false in provider', async () => {
      render(
        <ConfigProvider form={{ colon: false }}>
          <Form>
            <Form.Item label="没有冒号">
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(screen.getByTitle('没有冒号')).toHaveClass('ant-form-item-no-colon');
    });

    it("should not set form item colon false when colon doesn't set in provider", async () => {
      render(
        <ConfigProvider>
          <Form>
            <Form.Item label="姓名">
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(screen.getByTitle('姓名')).not.toHaveClass('ant-form-item-no-colonn');
    });
  });
});
