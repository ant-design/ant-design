import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '..';
import Form from '..';
import Input from '../../input';

interface FormValues {
  username?: string;
  path1?: { path2?: number };
}

describe('Form.typescript', () => {
  it('Form.Item', () => {
    const form = (
      <Form>
        <Form.Item name="test">
          <Input />
        </Form.Item>
      </Form>
    );
    expect(form).toBeTruthy();
  });

  describe('generic', () => {
    it('hooks', () => {
      const Demo: React.FC = () => {
        const [form] = Form.useForm<FormValues>();

        form.setFieldsValue({ path1: { path2: 2333 } });

        return (
          <Form
            form={form}
            onFinish={(values) => {
              expect(values).toBeTruthy();
              expect(values.username).toBeTruthy();
              expect(values.path1?.path2).toBeTruthy();
            }}
          />
        );
      };

      expect(Demo).toBeTruthy();
    });

    it('ref', () => {
      const Demo: React.FC = () => {
        const formRef = useRef<FormInstance<FormValues>>(null);
        useEffect(() => {
          formRef.current?.setFieldsValue({ path1: { path2: 233 } });
        }, []);
        return (
          <Form
            ref={formRef}
            onFinish={(values) => {
              expect(values).toBeTruthy();
              expect(values.username).toBeTruthy();
              expect(values.path1?.path2).toBeTruthy();
            }}
          />
        );
      };
      expect(Demo).toBeTruthy();
    });
  });

  it('FormItem renderProps support generic', () => {
    const Demo: React.FC = () => (
      <Form<FormValues>>
        <Form.Item<FormValues>>
          {({ getFieldsValue }) => {
            const values = getFieldsValue();
            expect(values).toBeTruthy();
            expect(values.username).toBeTruthy();
            expect(values.path1?.path2).toBeTruthy();
            return null;
          }}
        </Form.Item>
      </Form>
    );

    expect(Demo).toBeTruthy();
  });

  // TODO: @crazyair fix for value types
  it('useWatch', () => {
    const Demo: React.FC = () => {
      const [form] = Form.useForm<FormValues>();
      const value = Form.useWatch('username', form);

      return <Form form={form}>{value}</Form>;
    };

    expect(Demo).toBeTruthy();
  });
});
