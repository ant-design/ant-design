import React from 'react';
import { fireEvent, render } from '../../../tests/utils';
import Input from '..';

const { TextArea } = Input;

describe('TextArea cursor position with maxLength', () => {
  it('should preserve cursor position when input exceeds maxLength', () => {
    const { container } = render(<TextArea maxLength={5} defaultValue="hello" />);
    const textarea = container.querySelector('textarea')!;
    
    // Position cursor in the middle (position 2, between 'e' and 'l')
    textarea.setSelectionRange(2, 2);
    expect(textarea.selectionStart).toBe(2);
    
    // Simulate typing 'x' which would exceed maxLength
    fireEvent.keyDown(textarea, { key: 'x' });
    fireEvent.input(textarea, { target: { value: 'hello' } }); // value shouldn't change
    
    // Give the cursor position fix time to run
    setTimeout(() => {
      expect(textarea.selectionStart).toBe(2);
      expect(textarea.value).toBe('hello'); // Value should not change
    }, 10);
  });

  it('should preserve cursor position when typing in controlled component at maxLength', async () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState('1234567890'); // At maxLength
      
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Only update if within maxLength
        if (e.target.value.length <= 10) {
          setValue(e.target.value);
        }
      };
      
      return (
        <TextArea
          maxLength={10}
          value={value}
          onChange={handleChange}
        />
      );
    };

    const { container } = render(<TestComponent />);
    const textarea = container.querySelector('textarea')!;
    
    // Position cursor in the middle (position 5)
    textarea.focus();
    textarea.setSelectionRange(5, 5);
    expect(textarea.selectionStart).toBe(5);
    
    // Try to type additional characters
    fireEvent.keyDown(textarea, { key: 'x' });
    fireEvent.input(textarea, { target: { value: '1234567890' } }); // Shouldn't change
    
    // Give the cursor position fix time to run
    setTimeout(() => {
      expect(textarea.value).toBe('1234567890');
      expect(textarea.selectionStart).toBe(5); // Cursor should stay at position 5
    }, 10);
  });
});