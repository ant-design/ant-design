import type { ValidateMessages } from 'rc-field-form/es/interface';
import React from 'react';
import { act } from 'react-dom/test-utils';
import scrollIntoView from 'scroll-into-view-if-needed';
import ConfigProvider from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import type { FormInstance } from '../../form';
import Form from '../../form';
import Input from '../../input';
import InputNumber from '../../input-number';
import zhCN from '../../locale/zh_CN';

jest.mock('scroll-into-view-if-needed');

describe('ConfigProvider.Form', () => {
  (scrollIntoView as any).mockImplementation(() => {});

  beforeEach(() => {
    (scrollIntoView as any).mockReset();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    (scrollIntoView as any).mockRestore();
  });

  describe('form validateMessages', () => {
    const renderComponent = ({ validateMessages }: { validateMessages?: any }) => {
      const formRef = React.createRef<FormInstance>();
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

    it('set locale zhCN', async () => {
      const [container, formRef] = renderComponent({});

      await act(async () => {
        try {
          await formRef.current?.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        await Promise.resolve();
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(container.querySelector('.ant-form-item-explain')).toHaveTextContent('请输入姓名');
    });

    it('set locale zhCN and set form validateMessages one item, other use default message', async () => {
      const [container, formRef] = renderComponent({ validateMessages: { required: '必须' } });

      await act(async () => {
        try {
          await formRef.current?.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        await Promise.resolve();
      });

      act(() => {
        jest.runAllTimers();
      });

      const explains = Array.from(container.querySelectorAll('.ant-form-item-explain'));

      expect(explains[0]).toHaveTextContent('必须');
      expect(explains[explains.length - 1]).toHaveTextContent('年龄必须等于17');
    });

    it('nested description should use the default value of this warehouse first', async () => {
      const validateMessages: ValidateMessages = {
        number: {
          // eslint-disable-next-line no-template-curly-in-string
          max: '${label} 最大值为 ${max}',
          /**
           * Intentionally not filling `range` to test default message
           * default: https://github.com/ant-design/ant-design/blob/12596a06f2ff88d8a27e72f6f9bac7c63a0b2ece/components/locale/en_US.ts#L123
           */
          // range:
        },
      };

      const formRef = React.createRef<FormInstance>();
      const { container } = render(
        <ConfigProvider form={{ validateMessages }}>
          <Form ref={formRef} initialValues={{ age: 1, rate: 6 }}>
            <Form.Item name="rate" rules={[{ type: 'number', max: 5 }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name="age" rules={[{ type: 'number', max: 99, min: 18 }]}>
              <InputNumber />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      await act(async () => {
        try {
          await formRef.current?.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        await Promise.resolve();
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(container.querySelectorAll('.ant-form-item-explain')).toHaveLength(2);
      expect(container.querySelectorAll('.ant-form-item-explain')[0]).toHaveTextContent(
        'rate 最大值为 5',
      );
      expect(container.querySelectorAll('.ant-form-item-explain')[1]).toHaveTextContent(
        'age must be between 18-99',
      );
    });

    // https://github.com/ant-design/ant-design/issues/43210
    it('should merge parent ConfigProvider validateMessages', async () => {
      const MyForm = () => (
        <Form>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      );

      const { container, getAllByRole, getAllByText } = render(
        <ConfigProvider>
          <MyForm />
          <ConfigProvider form={{ validateMessages: { required: 'Required' } }}>
            <MyForm />
            <ConfigProvider>
              <MyForm />
            </ConfigProvider>
          </ConfigProvider>
        </ConfigProvider>,
      );

      const submitButtons = getAllByRole('button');
      expect(submitButtons).toHaveLength(3);
      submitButtons.forEach(fireEvent.click);

      await waitFakeTimer();

      expect(container.querySelectorAll('.ant-form-item-explain-error')).toHaveLength(3);
      expect(getAllByText('Please enter Name')).toHaveLength(1);
      expect(getAllByText('Required')).toHaveLength(2);
    });
  });

  describe('form requiredMark', () => {
    it('set requiredMark optional', () => {
      const { container } = render(
        <ConfigProvider form={{ requiredMark: 'optional' }}>
          <Form initialValues={{ age: 18 }}>
            <Form.Item name="age" label="年龄" rules={[{ type: 'number', len: 17 }]}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('form colon', () => {
    it('set colon false', () => {
      const { container } = render(
        <ConfigProvider form={{ colon: false }}>
          <Form>
            <Form.Item label="没有冒号">
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );
      expect(container.querySelector('.ant-form-item-no-colon')).toBeTruthy();
    });

    it('set colon default', () => {
      const { container } = render(
        <ConfigProvider>
          <Form>
            <Form.Item label="姓名">
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );
      expect(container.querySelector('.ant-form-item-no-colon')).toBeFalsy();
    });
  });

  describe('form disabled', () => {
    it('set Input enabled', () => {
      const { container } = render(
        <Form disabled>
          <ConfigProvider componentDisabled={false}>
            <Form.Item name="input1" label="启用">
              <Input />
            </Form.Item>
          </ConfigProvider>
          <Form.Item name="input" label="禁用">
            <Input />
          </Form.Item>
        </Form>,
      );

      expect(container.querySelector('#input1[disabled]')).toBeFalsy();
      expect(container.querySelector('#input[disabled]')).toBeTruthy();
    });
  });

  describe('form scrollToFirstError', () => {
    it('set object, form not set', async () => {
      (scrollIntoView as any).mockImplementation(() => {});
      const onFinishFailed = jest.fn();

      const { container } = render(
        <ConfigProvider form={{ scrollToFirstError: { block: 'center' } }}>
          <Form onFinishFailed={onFinishFailed}>
            <Form.Item name="test" rules={[{ required: true }]}>
              <input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(scrollIntoView).not.toHaveBeenCalled();
      fireEvent.submit(container.querySelector('form')!);
      await waitFakeTimer();

      const inputNode = document.getElementById('test');
      expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
        block: 'center',
        scrollMode: 'if-needed',
      });
      expect(onFinishFailed).toHaveBeenCalled();
    });

    it('not set, form set object', async () => {
      (scrollIntoView as any).mockImplementation(() => {});
      const onFinishFailed = jest.fn();

      const { container } = render(
        <ConfigProvider>
          <Form scrollToFirstError={{ block: 'center' }} onFinishFailed={onFinishFailed}>
            <Form.Item name="test" rules={[{ required: true }]}>
              <input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(scrollIntoView).not.toHaveBeenCalled();
      fireEvent.submit(container.querySelector('form')!);
      await waitFakeTimer();

      const inputNode = document.getElementById('test');
      expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
        block: 'center',
        scrollMode: 'if-needed',
      });
      expect(onFinishFailed).toHaveBeenCalled();
    });

    it('set object, form set false', async () => {
      (scrollIntoView as any).mockImplementation(() => {});
      const onFinishFailed = jest.fn();

      const { container } = render(
        <ConfigProvider form={{ scrollToFirstError: { block: 'center' } }}>
          <Form scrollToFirstError={false} onFinishFailed={onFinishFailed}>
            <Form.Item name="test" rules={[{ required: true }]}>
              <input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      expect(scrollIntoView).not.toHaveBeenCalled();
      fireEvent.submit(container.querySelector('form')!);
      await waitFakeTimer();

      expect(scrollIntoView).not.toHaveBeenCalled();
      expect(onFinishFailed).toHaveBeenCalled();
    });
  });
});
