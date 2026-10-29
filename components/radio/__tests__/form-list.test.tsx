import React from 'react';
import Radio from '..';
import Form from '../../form';
import { fireEvent, render } from '../../../tests/utils';

it.each([false, true])(
  'keeps radio values in separate Form.List fields independent (noStyle=%s)',
  (noStyle) => {
    const { container } = render(
      <Form initialValues={{ billing: [{ method: 'card' }], shipping: [{ method: 'card' }] }}>
        {['billing', 'shipping'].map((list) => (
          <Form.List key={list} name={list}>
            {(fields) =>
              fields.map((field) => (
                <Form.Item noStyle={noStyle} key={field.key} name={[field.name, 'method']}>
                  <Radio.Group options={['card', 'cash']} />
                </Form.Item>
              ))
            }
          </Form.List>
        ))}
      </Form>,
    );
    const inputs = container.querySelectorAll('input');
    fireEvent.click(inputs[3]);
    expect(inputs[0]).toBeChecked();
    expect(inputs[3]).toBeChecked();
    expect(inputs[0].name).not.toBe(inputs[2].name);
  },
);
