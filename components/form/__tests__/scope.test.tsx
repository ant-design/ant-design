import { renderHook } from '@testing-library/react';
import React from 'react';
import Form from '..';
import Input from '../../input';
import { FieldContext } from 'rc-field-form';

describe('Form.Scope', () => {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => (
    <Form
      layout="vertical"
      initialValues={{
        parent1: [
          {
            name: 'parent1',
            parent2: [
              {
                name: 'parent2',
              },
            ],
          },
        ],
      }}
    >
      <Form.List name="parent1">
        {(fields) =>
          fields.map((field) => (
            <div key={field.key}>
              <Form.Item label="parent1" name={[field.name, 'name']}>
                <Input />
              </Form.Item>
              <Form.List name={[field.name, 'parent2']}>
                {(fields2) =>
                  fields2.map((field2) => (
                    <div key={field2.key}>
                      <Form.Item label="parent2" name={[field2.name, 'name']}>
                        <Input />
                      </Form.Item>
                      <Form.Scope name={field2.name}>{children}</Form.Scope>
                    </div>
                  ))
                }
              </Form.List>
            </div>
          ))
        }
      </Form.List>
    </Form>
  );

  it('Form.useScope', () => {
    const { result } = renderHook(() => Form.useScope(), {
      wrapper: Wrapper,
    });

    expect(result.current.prefixName).toEqual(['parent1', 0, 'parent2', 0]);
    expect(result.current.name).toBe(0);
  });

  it('FieldContext', () => {
    const { result } = renderHook(() => React.useContext(FieldContext), {
      wrapper: Wrapper,
    });

    expect(result.current.prefixName).toEqual(['parent1', 0, 'parent2', 0]);
  });
});
