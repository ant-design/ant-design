import React from 'react';
import { Select, Space } from 'antd';

const options = [
  {
    label: 'Happy',
    value: 'happy',
    emoji: '😄',
    desc: 'Feeling Good',
  },
  {
    label: 'Sad',
    value: 'sad',
    emoji: '😢',
    desc: 'Feeling Blue',
  },
  {
    label: 'Angry',
    value: 'angry',
    emoji: '😡',
    desc: 'Furious',
  },
  {
    label: 'Cool',
    value: 'cool',
    emoji: '😎',
    desc: 'Chilling',
  },
  {
    label: 'Sleepy',
    value: 'sleepy',
    emoji: '😴',
    desc: 'Need Sleep',
  },
];

const App: React.FC = () => (
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select your current mood."
    defaultValue={['happy']}
    onChange={(value) => {
      console.log(`selected ${value}`);
    }}
    options={options}
    optionRender={(option) => (
      <Space>
        <span role="img" aria-label={option.data.label}>
          {option.data.emoji}
        </span>
        {`${option.data.label}(${option.data.desc})`}
      </Space>
    )}
  />
);

export default App;
