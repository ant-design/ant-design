import React, { useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

// Simple integration test component to verify the cursor position fix
const CursorPositionTest: React.FC = () => {
  const [value, setValue] = useState('1234567890'); // At maxLength
  const [cursorPos, setCursorPos] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Track cursor position after change
    setTimeout(() => {
      setCursorPos(e.target.selectionStart || 0);
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Store cursor position before key press
    const target = e.currentTarget;
    console.log('Cursor before key press:', target.selectionStart);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>TextArea Cursor Position Test</h2>
      <p>Instructions:</p>
      <ol>
        <li>Position cursor in middle of text below</li>
        <li>Try typing additional characters</li>
        <li>Cursor should stay in place (not jump to end)</li>
      </ol>
      
      <TextArea
        maxLength={10}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ width: 300, height: 100 }}
        placeholder="Test cursor position with maxLength"
      />
      
      <div style={{ marginTop: 10 }}>
        <p>Value: "{value}" (length: {value.length}/10)</p>
        <p>Last tracked cursor position: {cursorPos}</p>
      </div>
    </div>
  );
};

export default CursorPositionTest;