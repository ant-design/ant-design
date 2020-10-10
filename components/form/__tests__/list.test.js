import React from 'react';
import { mount } from 'enzyme';
import raf from 'raf';
import { act } from 'react-dom/test-utils';
import Form from '..';
import Input from '../../input';
import Button from '../../button';
import { sleep } from '../../../tests/utils';

jest.mock('raf');

describe('Form.List', () => {
  raf.mockImplementation(callback => window.setTimeout(callback));

  afterAll(() => {
    raf.mockRestore();
  });

  async function change(wrapper, index, value) {
    wrapper.find(Input).at(index).simulate('change', { target: { value } });
    await sleep();
    wrapper.update();
  }

  function testList(name, renderField) {
    it(name, async () => {
      jest.useFakeTimers();

      const wrapper = mount(
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
          wrapper.find(className).last().simulate('click');
          jest.runAllTimers();
        });
        wrapper.update();
      }

      operate('.add');
      expect(wrapper.find(Input).length).toBe(1);

      operate('.add');
      expect(wrapper.find(Input).length).toBe(2);

      operate('.add');
      expect(wrapper.find(Input).length).toBe(3);

      await change(wrapper, 2, '');
      act(() => {
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find('.ant-form-item-explain div').length).toBe(1);

      operate('.remove-0');
      expect(wrapper.find(Input).length).toBe(2);
      expect(wrapper.find('.ant-form-item-explain div').length).toBe(1);

      operate('.remove-1');
      expect(wrapper.find(Input).length).toBe(1);
      expect(wrapper.find('.ant-form-item-explain div').length).toBe(0);

      jest.useRealTimers();
    });
  }

  testList('operation correctly', field => (
    <Form.Item {...field} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  ));

  testList('nest noStyle', field => (
    <Form.Item key={field.key}>
      <Form.Item noStyle {...field} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form.Item>
  ));

  it('correct onFinish values', async () => {
    async function click(wrapper, className) {
      wrapper.find(className).last().simulate('click');
      await sleep();
      wrapper.update();
    }

    const onFinish = jest.fn().mockImplementation(() => {});

    const wrapper = mount(
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

    await click(wrapper, '.add');
    await change(wrapper, 0, 'input1');
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1'] });

    await click(wrapper, '.add');
    await change(wrapper, 1, 'input2');
    await click(wrapper, '.add');
    await change(wrapper, 2, 'input3');
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1', 'input2', 'input3'] });

    await click(wrapper, '.remove'); // will remove first input
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input2', 'input3'] });
  });

  it('list errors', async () => {
    jest.useFakeTimers();

    let operation;
    const wrapper = mount(
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
        wrapper.update();
      });
    }

    await addItem();
    expect(wrapper.find('.ant-form-item-explain div').text()).toEqual('At least 2');

    await addItem();
    expect(wrapper.find('.ant-form-item-explain div')).toHaveLength(0);

    jest.useRealTimers();
  });

  describe('ErrorList component', () => {
    it('should trigger onDomErrorVisibleChange by motion end', async () => {
      jest.useFakeTimers();

      const onDomErrorVisibleChange = jest.fn();
      const wrapper = mount(
        <Form.ErrorList
          errors={['bamboo is light']}
          onDomErrorVisibleChange={onDomErrorVisibleChange}
        />,
      );

      await act(async () => {
        await sleep();
        jest.runAllTimers();
        wrapper.update();
      });

      act(() => {
        wrapper.find('CSSMotion').props().onLeaveEnd();
      });

      expect(onDomErrorVisibleChange).toHaveBeenCalledWith(false);

      jest.useRealTimers();
    });
  });
});
