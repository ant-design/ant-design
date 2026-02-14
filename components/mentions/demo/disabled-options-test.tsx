import React, { useState } from 'react';
import { Mentions, Space, Typography } from 'antd';
import type { GetProp, MentionProps } from 'antd';

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [lastSelected, setLastSelected] = useState<string>('');

  const options: MentionsOptionProps[] = [
    {
      value: 'disabled-user',
      label: 'Disabled User (First - should be skipped)',
      disabled: true,
    },
    {
      value: 'afc163',
      label: 'afc163',
    },
    {
      value: 'zombieJ',
      label: 'zombieJ',
    },
    {
      value: 'disabled-user-2',
      label: 'Disabled User 2 (should be skipped)',
      disabled: true,
    },
    {
      value: 'yesmeck',
      label: 'yesmeck',
    },
  ];

  const handleSelect = (option: MentionsOptionProps) => {
    setLastSelected(`${option.label} (${option.value})`);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title level={3}>
        Mentions - Disabled Options Bug Fix Test
      </Typography.Title>
      
      <Typography.Paragraph>
        <strong>Instructions:</strong>
        <ol>
          <li>Type <code>@</code> in the input below to open the dropdown</li>
          <li>Notice that the first option is disabled but should NOT be highlighted</li>
          <li>Press <strong>Enter</strong> - it should select "afc163" (first non-disabled option), not the disabled one</li>
          <li>Try using <strong>Arrow Keys</strong> to navigate - they should skip disabled options</li>
        </ol>
      </Typography.Paragraph>

      <Mentions
        style={{ width: '100%' }}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        options={options}
        placeholder="Type @ to mention someone"
        rows={3}
      />

      {lastSelected && (
        <Typography.Text type="success">
          ✓ Last selected: <strong>{lastSelected}</strong>
        </Typography.Text>
      )}

      <Typography.Paragraph type="secondary">
        Current value: {value || '(empty)'}
      </Typography.Paragraph>
    </Space>
  );
};

export default App;
