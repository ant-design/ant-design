import React from 'react';
import type { FormListFieldData, FormListOperation } from '..';
import Form from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import Input from '../../input';

describe('Form.List', () => {
  // const change = async (
  //   wrapper: ReturnType<typeof render>['container'],
  //   index: number,
  //   value: string,
  // ) => {
  //   fireEvent.change(wrapper.getElementsByClassName('ant-input')?.[index], { target: { value } });
  //   await sleep();
  // };

  const changeValue = async (
    input: HTMLElement | null | number,
    value: string,
    advTimer = 1000,
  ) => {
    let element: HTMLElement;

    if (typeof input === 'number') {
      element = document.querySelectorAll('input')[input];
    }

    expect(element!).toBeTruthy();

    fireEvent.change(element!, {
      target: {
        value,
      },
    });

    if (advTimer) {
      await waitFakeTimer(advTimer / 20);
    }
  };

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const testList = (
    name: string,
    renderField: (value: FormListFieldData) => React.ReactNode,
  ): void => {
    it(name, async () => {
      const { container } = render(
        <Form>
          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map(renderField)}
                <Button className="add" onClick={add}>
                  Add
                </Button>
                <Button className="remove-0" onClick={() => remove(0)} />
                <Button className="remove-1" onClick={() => remove(1)} />
              </>
            )}
          </Form.List>
        </Form>,
      );

      async function operate(className: string) {
        fireEvent.click(container.querySelector(className)!);
        await waitFakeTimer();
      }

      await operate('.add');
      expect(container.querySelectorAll('.ant-input').length).toBe(1);

      await operate('.add');
      expect(container.querySelectorAll('.ant-input').length).toBe(2);

      await operate('.add');
      expect(container.querySelectorAll('.ant-input').length).toBe(3);

      await changeValue(2, '');

      expect(container.querySelectorAll('.ant-form-item-explain').length).toBe(1);

      await operate('.remove-0');
      expect(container.querySelectorAll('.ant-input').length).toBe(2);
      expect(container.querySelectorAll('.ant-form-item-explain').length).toBe(1);

      await operate('.remove-1');
      expect(container.querySelectorAll('.ant-input').length).toBe(1);
      expect(container.querySelectorAll('.ant-form-item-explain').length).toBe(0);
    });
  };

  testList('operation correctly', (field) => (
    <Form.Item {...field} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  ));

  // FIXME: @zombieJ React 18 StrictMode
  testList('nest noStyle', (field) => (
    <Form.Item key={field.key}>
      <Form.Item noStyle {...field} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form.Item>
  ));

  it('correct onFinish values', async () => {
    async function click(wrapper: ReturnType<typeof render>['container'], className: string) {
      fireEvent.click(wrapper.querySelector(className)!);
    }

    const onFinish = jest.fn().mockImplementation(() => {});

    const { container } = render(
      <Form
        onFinish={(v) => {
          if (typeof v.list[0] === 'object') {
            /* old version led to SyntheticEvent be passed as an value here
              that led to weird infinite loop somewhere and OutOfMemory crash */
            v = new Error('We expect value to be a primitive here');
          }
          onFinish(v);
        }}
      >
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                // key is in a field
                // eslint-disable-next-line react/jsx-key
                <Form.Item {...field}>
                  <Input />
                </Form.Item>
              ))}
              <Button className="add" onClick={add}>
                Add
              </Button>
              <Button className="remove" onClick={() => remove(0)}>
                Remove
              </Button>
            </>
          )}
        </Form.List>
      </Form>,
    );

    await click(container, '.add');
    await changeValue(0, 'input1');
    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1'] });

    await click(container, '.add');
    await changeValue(1, 'input2');
    await click(container, '.add');
    await changeValue(2, 'input3');
    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1', 'input2', 'input3'] });

    await click(container, '.remove'); // will remove first input
    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input2', 'input3'] });
  });

  it('list errors', async () => {
    let operation: FormListOperation;
    const { container } = render(
      <Form>
        <Form.List
          name="list"
          rules={[
            {
              validator: async (_, value) => {
                if (value.length < 2) {
                  return Promise.reject(new Error('At least 2'));
                }
              },
            },
          ]}
        >
          {(_, opt, { errors }) => {
            operation = opt;
            return <Form.ErrorList errors={errors} />;
          }}
        </Form.List>
      </Form>,
    );

    async function addItem() {
      operation.add();
      await waitFakeTimer();
    }

    await addItem();
    expect(container.querySelector('.ant-form-item-explain div')?.innerHTML).toEqual('At least 2');

    await addItem();
    expect(container.getElementsByClassName('ant-form-item-explain div')).toHaveLength(0);
  });

  it('should render empty without errors', () => {
    const { container } = render(<Form.ErrorList />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('no warning when reset in validate', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Demo = () => {
      const [form] = Form.useForm();

      React.useEffect(() => {
        form.setFieldsValue({
          list: [1],
        });
      }, []);

      return (
        <Form form={form}>
          <Form.List name="list">
            {(fields) =>
              fields.map((field) => (
                <Form.Item {...field} key={field.key}>
                  <Input />
                </Form.Item>
              ))
            }
          </Form.List>
          <button
            id="validate"
            type="button"
            onClick={() => {
              form.validateFields().then(() => {
                form.resetFields();
              });
            }}
          >
            Validate
          </button>
        </Form>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);

    await waitFakeTimer();

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
