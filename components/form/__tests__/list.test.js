import React from 'react';
import { act } from 'react-dom/test-utils';
import Form from '..';
import { fireEvent, render, sleep } from '../../../tests/utils';
import Button from '../../button';
import Input from '../../input';

describe('Form.List', () => {
  async function change(wrapper, index, value) {
    fireEvent.change(wrapper.getElementsByClassName('ant-input')[index], { target: { value } });
    await sleep();
  }

  function testList(name, renderField) {
    it(name, async () => {
      jest.useFakeTimers();

      const { container } = render(
        <Form>
          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => renderField(field))}
                <Button className="add" onClick={add}>
                  Add
                </Button>
                <Button
                  className="remove-0"
                  onClick={() => {
                    remove(0);
                  }}
                />
                <Button
                  className="remove-1"
                  onClick={() => {
                    remove(1);
                  }}
                />
              </>
            )}
          </Form.List>
        </Form>,
      );

      function operate(className) {
        act(() => {
          fireEvent.click(container.querySelector(className));
          jest.runAllTimers();
        });
      }

      operate('.add');
      expect(container.getElementsByClassName('ant-input').length).toBe(1);

      operate('.add');
      expect(container.getElementsByClassName('ant-input').length).toBe(2);

      operate('.add');
      expect(container.getElementsByClassName('ant-input').length).toBe(3);

      await change(container, 2, '');
      for (let i = 0; i < 10; i += 1) {
        act(() => {
          jest.runAllTimers();
        });
      }
      expect(container.getElementsByClassName('ant-form-item-explain').length).toBe(1);

      operate('.remove-0');
      expect(container.getElementsByClassName('ant-input').length).toBe(2);
      expect(container.getElementsByClassName('ant-form-item-explain').length).toBe(1);

      operate('.remove-1');
      expect(container.getElementsByClassName('ant-input').length).toBe(1);
      expect(container.getElementsByClassName('ant-form-item-explain').length).toBe(0);

      jest.useRealTimers();
    });
  }

  testList('operation correctly', field => (
    <Form.Item {...field} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  ));

  // FIXME: @zombieJ React 18 StrictMode
  testList('nest noStyle', field => (
    <Form.Item key={field.key}>
      <Form.Item noStyle {...field} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form.Item>
  ));

  it('correct onFinish values', async () => {
    async function click(wrapper, className) {
      fireEvent.click(wrapper.querySelector(className));
    }

    const onFinish = jest.fn().mockImplementation(() => {});

    const { container } = render(
      <Form
        onFinish={v => {
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
              {fields.map(field => (
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
    await change(container, 0, 'input1');
    fireEvent.submit(container.querySelector('form'));
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1'] });

    await click(container, '.add');
    await change(container, 1, 'input2');
    await click(container, '.add');
    await change(container, 2, 'input3');
    fireEvent.submit(container.querySelector('form'));
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1', 'input2', 'input3'] });

    await click(container, '.remove'); // will remove first input
    fireEvent.submit(container.querySelector('form'));
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input2', 'input3'] });
  });

  it('list errors', async () => {
    jest.useFakeTimers();

    let operation;
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
      await act(async () => {
        operation.add();
        await sleep(100);
        jest.runAllTimers();
      });
    }

    await addItem();
    expect(container.querySelector('.ant-form-item-explain div').innerHTML).toEqual('At least 2');

    await addItem();
    expect(container.getElementsByClassName('ant-form-item-explain div')).toHaveLength(0);

    jest.useRealTimers();
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
            {fields =>
              fields.map(field => (
                <Form.Item key={field.key} {...field}>
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
    fireEvent.click(container.querySelector('button'));

    await sleep();

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
