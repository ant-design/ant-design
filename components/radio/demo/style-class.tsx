import React from 'react';
import { Radio } from 'antd';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Basic Radio with classNames */}
    <div>
      <h4>Radio with classNames</h4>
      <Radio
        classNames={{
          root: 'custom-radio-wrapper',
          icon: 'custom-radio-icon',
          label: 'custom-radio-label',
        }}
      >
        Custom styled radio
      </Radio>
    </div>

    {/* Radio with styles */}
    <div>
      <h4>Radio with styles</h4>
      <Radio
        styles={{
          root: { border: '1px solid #1890ff', padding: '8px', borderRadius: '4px' },
          icon: { transform: 'scale(1.2)' },
          label: { color: '#1890ff', fontWeight: 'bold' },
        }}
      >
        Styled radio
      </Radio>
    </div>

    {/* Radio.Group with classNames */}
    <div>
      <h4>Radio.Group with classNames</h4>
      <Radio.Group
        classNames={{
          root: 'custom-radio-group',
        }}
        defaultValue="a"
      >
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
      </Radio.Group>
    </div>

    {/* Radio.Group with styles */}
    <div>
      <h4>Radio.Group with styles</h4>
      <Radio.Group
        styles={{
          root: {
            background: '#f0f2ff',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #d9d9d9',
          },
        }}
        defaultValue="x"
      >
        <Radio
          value="x"
          styles={{
            root: { margin: '4px 8px' },
            label: { color: '#722ed1' },
          }}
        >
          Option X
        </Radio>
        <Radio
          value="y"
          styles={{
            root: { margin: '4px 8px' },
            label: { color: '#722ed1' },
          }}
        >
          Option Y
        </Radio>
        <Radio
          value="z"
          styles={{
            root: { margin: '4px 8px' },
            label: { color: '#722ed1' },
          }}
        >
          Option Z
        </Radio>
      </Radio.Group>
    </div>

    {/* Button style Radio.Group with custom styles */}
    <div>
      <h4>Button Radio.Group with styles</h4>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        styles={{
          root: {
            display: 'flex',
            gap: '8px',
            padding: '8px',
            background: '#fafafa',
            borderRadius: '8px',
          },
        }}
        defaultValue="large"
      >
        <Radio
          value="large"
          styles={{
            root: { borderRadius: '6px' },
          }}
        >
          Large
        </Radio>
        <Radio
          value="default"
          styles={{
            root: { borderRadius: '6px' },
          }}
        >
          Default
        </Radio>
        <Radio
          value="small"
          styles={{
            root: { borderRadius: '6px' },
          }}
        >
          Small
        </Radio>
      </Radio.Group>
    </div>

    {/* Combining classNames and styles */}
    <div>
      <h4>Combining classNames and styles</h4>
      <Radio.Group
        classNames={{
          root: 'combined-radio-group',
        }}
        styles={{
          root: {
            background: 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)',
            padding: '16px',
            borderRadius: '8px',
          },
        }}
        defaultValue="option1"
      >
        <Radio
          value="option1"
          classNames={{
            root: 'combined-radio',
            label: 'combined-label',
          }}
          styles={{
            root: {
              background: 'white',
              margin: '4px',
              padding: '8px 12px',
              borderRadius: '20px',
              border: '2px solid transparent',
            },
            label: {
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        >
          Option 1
        </Radio>
        <Radio
          value="option2"
          classNames={{
            root: 'combined-radio',
            label: 'combined-label',
          }}
          styles={{
            root: {
              background: 'white',
              margin: '4px',
              padding: '8px 12px',
              borderRadius: '20px',
              border: '2px solid transparent',
            },
            label: {
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        >
          Option 2
        </Radio>
      </Radio.Group>
    </div>
  </div>
);

export default App;
