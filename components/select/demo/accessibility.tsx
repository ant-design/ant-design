import React from 'react';
import { Form, Select, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

const App: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={5}>Using aria-label</Title>
        <Paragraph type="secondary">Provides a direct accessible name for screen readers</Paragraph>
        <Select
          aria-label="Select your favorite fruit"
          placeholder="Choose a fruit"
          style={{ width: 200 }}
          options={fruitOptions}
        />
      </div>

      <div>
        <Title level={5}>Using aria-labelledby</Title>
        <Paragraph type="secondary">
          References an external element that labels the Select
        </Paragraph>
        <span id="color-label" style={{ display: 'block', marginBottom: 8 }}>
          Choose a color:
        </span>
        <Select
          aria-labelledby="color-label"
          placeholder="Select color"
          style={{ width: 200 }}
          options={[
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
          ]}
        />
      </div>

      <div>
        <Title level={5}>Using aria-describedby</Title>
        <Paragraph type="secondary">Provides additional description for the Select</Paragraph>
        <Select
          aria-label="Select size"
          aria-describedby="size-description"
          placeholder="Choose size"
          style={{ width: 200 }}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
        />
        <div id="size-description" style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          Select the size that best fits your needs
        </div>
      </div>

      <div>
        <Title level={5}>Form integration with automatic aria attributes</Title>
        <Paragraph type="secondary">
          Form.Item automatically adds aria-required, aria-invalid, and aria-describedby
        </Paragraph>
        <Form form={form} layout="vertical" style={{ maxWidth: 400 }}>
          <Form.Item
            name="fruit"
            label="Favorite Fruit"
            rules={[{ required: true, message: 'Please select a fruit' }]}
            help="This field is required"
          >
            <Select placeholder="Select a fruit" options={fruitOptions} />
          </Form.Item>

          <Form.Item name="vegetables" label="Vegetables" extra="You can select multiple options">
            <Select
              mode="multiple"
              placeholder="Select vegetables"
              options={[
                { value: 'carrot', label: 'Carrot' },
                { value: 'broccoli', label: 'Broccoli' },
                { value: 'spinach', label: 'Spinach' },
              ]}
            />
          </Form.Item>
        </Form>
      </div>

      <div>
        <Title level={5}>Multiple accessibility attributes</Title>
        <Paragraph type="secondary">
          Combining multiple aria attributes for comprehensive accessibility
        </Paragraph>
        <span id="country-label" style={{ display: 'block', marginBottom: 4 }}>
          Country of residence:
        </span>
        <div id="country-help" style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
          Select the country where you currently live
        </div>
        <Select
          aria-labelledby="country-label"
          aria-describedby="country-help"
          aria-required
          placeholder="Select country"
          style={{ width: 200 }}
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
          ]}
        />
      </div>
    </Space>
  );
};

export default App;
