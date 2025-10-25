import React from 'react';
import { Select, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * Sample fruit options for demonstration purposes.
 * Used across multiple examples to show different ARIA attribute patterns.
 */
const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

/**
 * Accessibility demo component for Select.
 *
 * Demonstrates proper usage of ARIA attributes for making Select components accessible:
 * - aria-label: Direct accessible name
 * - aria-labelledby: Reference to external label
 * - aria-describedby: Reference to description text
 *
 * @returns {JSX.Element} Accessibility demonstration examples
 */
const App: React.FC = () => (
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
      <Paragraph type="secondary">References an external element that labels the Select</Paragraph>
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
      <Title level={5}>Using aria-describedby with help text</Title>
      <Paragraph type="secondary">Provides additional context or instructions</Paragraph>
      <Select
        aria-label="Select your preferred animal"
        aria-describedby="animal-description"
        placeholder="Select animal"
        style={{ width: 200 }}
        options={[
          { value: 'dog', label: 'Dog' },
          { value: 'cat', label: 'Cat' },
          { value: 'bird', label: 'Bird' },
        ]}
      />
      <div id="animal-description" style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
        This selection helps us understand your preferences.
      </div>
    </div>

    <div>
      <Title level={5}>Combined ARIA attributes</Title>
      <Paragraph type="secondary">Using multiple attributes together</Paragraph>
      <span id="country-label" style={{ display: 'block', marginBottom: 4 }}>
        Country of residence:
      </span>
      <div id="country-help" style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
        Select the country where you currently live
      </div>
      <Select
        aria-labelledby="country-label"
        aria-describedby="country-help"
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

export default App;
