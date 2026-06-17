import React, { useEffect, useRef } from 'react';

import type { FormInstance } from '..';
import Form from '..';
import Input from '../../input';

interface FormValues {
  username?: string;
  value3: string;
  path1?: { path2?: number };
}

type IsAny<T> = 0 extends 1 & T ? true : false;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

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

  it('useWatch', () => {
    const Demo: React.FC = () => {
      const [form] = Form.useForm<FormValues>();
      const value = Form.useWatch('username', form);
      const value3 = Form.useWatch('value3', form);
      const pathValue = Form.useWatch(['path1', 'path2'], form);
      const typeCheck: [
        Expect<Equal<IsAny<typeof value3>, false>>,
        Expect<Equal<typeof value3, string>>,
        Expect<Equal<typeof pathValue, number | undefined>>,
      ] = [true, true, true];

      // @ts-expect-error not a field of FormValues
      Form.useWatch('unknown', form);
      // @ts-expect-error not a nested field of FormValues
      Form.useWatch(['path1', 'unknown'], form);

      expect(typeCheck).toBeTruthy();

      return <Form form={form}>{value ?? value3 ?? pathValue}</Form>;
    };

    expect(Demo).toBeTruthy();
  });
});
