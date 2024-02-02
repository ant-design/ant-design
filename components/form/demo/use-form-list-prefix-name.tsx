import * as React from 'react';
import { Form, Input } from 'antd';

const ChildrenContent = () => {
  const prefixName = Form.List.usePrefixName();
  const watchedValue = Form.useWatch([...prefixName!, 'watched']);

  return (
    <>
      <Form.Item label="watched" name="watched">
        <Input />
      </Form.Item>
      <Form.Item>watched value: {watchedValue}</Form.Item>
      <Form.Item label="prefixName">{JSON.stringify(prefixName)}</Form.Item>
    </>
  );
};

export default () => (
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
                    <ChildrenContent />
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
