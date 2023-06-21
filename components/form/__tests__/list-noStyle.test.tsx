import React from 'react';
import { act } from 'react-dom/test-utils';
import Form from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Input from '../../input';
import type { FormListOperation } from '../FormList';

describe('Form.List.NoStyle', () => {
  it('nest error should clean up', async () => {
    jest.useFakeTimers();

    let operation: FormListOperation;

    const { container } = render(
      <Form>
        <Form.List name="users">
          {(fields, op) => {
            operation = op;
            return fields.map((field) => (
              <Form.Item key={field.key}>
                <Form.Item
                  {...field}
                  name={[field.name, 'first']}
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
    const addItem = async () => {
      await act(async () => {
        operation?.add();
      });

      await waitFakeTimer();
    };

    await addItem();
    await addItem();

    // Submit
    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    // Remove first field
    await act(async () => {
      operation?.remove(0);
    });
    await waitFakeTimer();

    // Match error message
    expect(container.querySelector('.ant-form-item-explain-error')?.textContent).toBe(
      "'users.1.first' is required",
    );

    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
