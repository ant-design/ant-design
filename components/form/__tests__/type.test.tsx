import * as React from 'react';
import Form, { FormInstance } from '..';
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
      const Demo = () => {
        const [form] = Form.useForm<FormValues>();

        form.setFieldsValue({ path1: { path2: 2333 } });

        return (
          <Form
            form={form}
            onFinish={values => {
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
      class Demo extends React.Component {
        formRef = React.createRef<FormInstance<FormValues>>();

        componentDidMount() {
          this.formRef.current?.setFieldsValue({ path1: { path2: 233 } });
        }

        render() {
          return (
            <Form
              ref={this.formRef}
              onFinish={values => {
                expect(values).toBeTruthy();
                expect(values.username).toBeTruthy();
                expect(values.path1?.path2).toBeTruthy();
              }}
            />
          );
        }
      }

      expect(Demo).toBeTruthy();
    });
  });

  it('FormItem renderProps support generic', () => {
    const Demo = () => (
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
});
