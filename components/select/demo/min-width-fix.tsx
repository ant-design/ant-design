import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%', padding: '20px' }}>
    <div>
      <h4>Select with width: auto (Default popupMatchSelectWidth=true)</h4>
      <p>Dropdown should have min-width equal to select input width</p>
      <Select
        style={{ width: 'auto' }}
        placeholder="Short"
        defaultOpen
      >
        <Option value="option1">This is a very long option text that should test the dropdown min-width behavior</Option>
        <Option value="option2">Short</Option>
        <Option value="option3">Medium length option text</Option>
      </Select>
    </div>
    
    <div>
      <h4>Select with width: 200px (Default popupMatchSelectWidth=true)</h4>
      <p>Dropdown should match the 200px width with min-width</p>
      <Select
        style={{ width: 200 }}
        placeholder="Select an option"
        defaultOpen
      >
        <Option value="option1">This is a very long option text that should test the dropdown min-width behavior</Option>
        <Option value="option2">Short</Option>
        <Option value="option3">Medium length option text</Option>
      </Select>
    </div>
    
    <div>
      <h4>Select with width: auto and popupMatchSelectWidth=false</h4>
      <p>Dropdown width should not be constrained by select width</p>
      <Select
        style={{ width: 'auto' }}
        placeholder="Short"
        popupMatchSelectWidth={false}
        defaultOpen
      >
        <Option value="option1">This is a very long option text that should test the dropdown min-width behavior</Option>
        <Option value="option2">Short</Option>
        <Option value="option3">Medium length option text</Option>
      </Select>
    </div>
    
    <div>
      <h4>Select with popupMatchSelectWidth=300 (specific width)</h4>
      <p>Dropdown should be exactly 300px wide</p>
      <Select
        style={{ width: 'auto' }}
        placeholder="Short"
        popupMatchSelectWidth={300}
        defaultOpen
      >
        <Option value="option1">This is a very long option text that should test the dropdown min-width behavior</Option>
        <Option value="option2">Short</Option>
        <Option value="option3">Medium length option text</Option>
      </Select>
    </div>
  </Space>
);

export default App;