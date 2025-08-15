import React, { useState } from 'react';
import { Input } from '../../../index';

const { TextArea } = Input;

const CursorJumpTest: React.FC = () => {
  const [value, setValue] = useState('1234567890'); // Start at maxLength

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Cursor position on change:', e.target.selectionStart);
    setValue(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Ant Design TextArea Cursor Jump Test</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>TextArea with maxLength=10 (already at limit):</label>
      </div>
      <TextArea
        maxLength={10}
        value={value}
        onChange={handleChange}
        placeholder="Type in middle to test cursor position"
        style={{ width: '300px', height: '100px' }}
      />
      <div style={{ marginTop: '10px' }}>
        <p>Current value: "{value}" (length: {value.length})</p>
        <p>Instructions: Position cursor in middle, then try typing additional characters</p>
      </div>
    </div>
  );
};

export default CursorJumpTest;