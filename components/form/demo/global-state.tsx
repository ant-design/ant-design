import React, { useState } from 'react';
import { Form, Input, Typography } from 'antd';

const { Paragraph } = Typography;

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="username"
      label="Username"
      rules={[{ required: true, message: 'Username is required!' }]}
    >
      <Input />
    </Form.Item>
  </Form>
);

const App: React.FC = () => {
  const [fields, setFields] = useState<FieldData[]>([{ name: ['username'], value: 'Ant Design' }]);

  return (
    <>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
        <pre style={{ border: 'none' }}>{JSON.stringify(fields, null, 2)}</pre>
      </Paragraph>
    </>
  );
};

export default App;
