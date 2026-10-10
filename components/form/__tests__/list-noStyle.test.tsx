import React from 'react';

import Form from '..';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
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

  // https://github.com/ant-design/ant-design/issues/54119
  it('should not keep the error of a re-indexed nested field', async () => {
    jest.useFakeTimers();

    let itemsOperation: FormListOperation;
    const listOperations: FormListOperation[] = [];

    const { container } = render(
      <Form>
        <Form.List name="items">
          {(fields, op) => {
            itemsOperation = op;
            return fields.map((field) => (
              <div key={field.key} className="card">
                <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOp) => {
                      listOperations[field.key] = subOp;
                      return subFields.map((subField) => (
                        <Form.Item
                          key={subField.key}
                          noStyle
                          name={[subField.name, 'first']}
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                      ));
                    }}
                  </Form.List>
                </Form.Item>
              </div>
            ));
          }}
        </Form.List>
      </Form>,
    );

    const run = async (fn: () => void) => {
      await act(async () => {
        fn();
      });
      await waitFakeTimer();
    };

    await run(() => itemsOperation.add());
    await run(() => itemsOperation.add());
    await run(() => listOperations[0].add());
    await run(() => listOperations[1].add());

    await run(() => fireEvent.submit(container.querySelector('form')!));
    await run(() => itemsOperation.remove(0));
    await run(() => fireEvent.submit(container.querySelector('form')!));

    const errors = Array.from(container.querySelectorAll('.ant-form-item-explain-error')).map(
      (node) => node.textContent,
    );
    expect(errors).toEqual(["'items.0.list.0.first' is required"]);

    fireEvent.change(container.querySelector('input')!, { target: { value: 'filled' } });
    await waitFakeTimer();

    expect(container.querySelectorAll('.ant-form-item-explain-error')).toHaveLength(0);

    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
