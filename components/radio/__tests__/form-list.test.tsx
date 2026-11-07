import React from 'react';
import type { RadioGroupProps } from '..';
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

it.each(['shouldUpdate', 'dependencies'])(
  'inherits the field name through an unnamed noStyle item with %s',
  (mode) => {
    const wrapperProps =
      mode === 'shouldUpdate' ? { shouldUpdate: true } : { dependencies: ['other'] };
    const CustomRadio = ({ value, onChange }: RadioGroupProps) => (
      <Form.Item noStyle {...wrapperProps}>
        {() => <Radio.Group value={value} onChange={onChange} options={['card', 'cash']} />}
      </Form.Item>
    );
    const { container } = render(
      <Form initialValues={{ preference: 'card' }}>
        <Form.Item name="preference">
          <CustomRadio />
        </Form.Item>
      </Form>,
    );
    const inputs = container.querySelectorAll('input');

    fireEvent.click(inputs[1]);

    expect(inputs[1]).toBeChecked();
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('name', 'preference');
    });
    expect(new FormData(container.querySelector('form')!).get('preference')).toBe('cash');
  },
);

it.each([false, true])(
  'keeps a list field independent from a matching flat name (noStyle=%s)',
  (noStyle) => {
    const { container } = render(
      <Form initialValues={{ billing: [{ method: 'card' }], billing_0_method: 'card' }}>
        <Form.List name="billing">
          {(fields) =>
            fields.map((field) => (
              <Form.Item noStyle={noStyle} key={field.key} name={[field.name, 'method']}>
                <Radio.Group options={['card', 'cash']} />
              </Form.Item>
            ))
          }
        </Form.List>
        <Form.Item name="billing_0_method">
          <Radio.Group options={['card', 'cash']} />
        </Form.Item>
      </Form>,
    );
    const inputs = container.querySelectorAll('input');
    fireEvent.click(inputs[3]);
    expect(inputs[0]).toBeChecked();
    expect(inputs[3]).toBeChecked();
    expect(inputs[0].name).not.toBe(inputs[2].name);
  },
);

it.each([false, true])(
  'preserves native submission keys outside Form.List (noStyle=%s)',
  (noStyle) => {
    const { container } = render(
      <Form initialValues={{ user: { profile: { preference: 'card' } } }}>
        <Form.Item noStyle={noStyle} name={['user', 'profile', 'preference']}>
          <Radio.Group options={['card', 'cash']} />
        </Form.Item>
      </Form>,
    );
    const inputs = container.querySelectorAll('input');
    fireEvent.click(inputs[1]);
    expect(new FormData(container.querySelector('form')!).get('user_profile_preference')).toBe(
      'cash',
    );
  },
);

it('preserves an explicit native submission key inside Form.List', () => {
  const { container } = render(
    <Form initialValues={{ billing: [{ method: 'card' }] }}>
      <Form.List name="billing">
        {(fields) =>
          fields.map((field) => (
            <Form.Item key={field.key} name={[field.name, 'method']}>
              <Radio.Group name="billing-method" options={['card', 'cash']} />
            </Form.Item>
          ))
        }
      </Form.List>
    </Form>,
  );
  const inputs = container.querySelectorAll('input');
  fireEvent.click(inputs[1]);
  expect(new FormData(container.querySelector('form')!).get('billing-method')).toBe('cash');
});
