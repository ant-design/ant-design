import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '..';
import Input from '../../input';
import { sleep } from '../../../tests/utils';
import { FormListOperation } from '../FormList';

describe('Form.List.NoStyle', () => {
  it('nest error should clean up', async () => {
    jest.useFakeTimers();

    let operation: FormListOperation;

    const wrapper = mount(
      <Form>
        <Form.List name="users">
          {(fields, op) => {
            operation = op;

            return fields.map(field => (
              <Form.Item key={field.key}>
                <Form.Item
                  {...field}
                  name={[field.name, 'first']}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true }]}
                  noStyle
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            ));
          }}
        </Form.List>
      </Form>,
    );

    // Add two
    async function addItem() {
      await act(async () => {
        operation!.add();
        await sleep(100);
        jest.runAllTimers();
        wrapper.update();
      });
    }

    addItem();
    addItem();

    // Submit
    await act(async () => {
      wrapper.find('form').simulate('submit');
      await sleep(100);
      jest.runAllTimers();
      wrapper.update();
    });

    // Remove first field
    await act(async () => {
      operation!.remove(0);
      await sleep(100);
      jest.runAllTimers();
      wrapper.update();
    });

    // Match error message
    expect(wrapper.find('.ant-form-item-explain-error').text()).toEqual(
      "'users.1.first' is required",
    );

    jest.useRealTimers();
  });
});
