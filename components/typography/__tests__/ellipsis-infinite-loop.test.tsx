import React from 'react';
import { render } from '@testing-library/react';
import Base from '../Base';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock console.error to catch React warnings
const originalError = console.error;
let errorMessages: string[] = [];

beforeEach(() => {
  errorMessages = [];
  console.error = jest.fn((message) => {
    errorMessages.push(message);
  });
});

afterEach(() => {
  console.error = originalError;
});

const triggerResize = (element: HTMLElement) => {
  const resizeObserver = (global as any).ResizeObserver;
  if (resizeObserver && element) {
    // Simulate resize event
    const observer = new resizeObserver(() => {});
    observer.observe(element);
  }
};

describe('Ellipsis infinite loop prevention', () => {
  it('should not cause maximum update depth exceeded error with copyable and ellipsis', async () => {
    const longText = 'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.';
    
    const ref = React.createRef<HTMLElement>();
    
    // Render component with both ellipsis and copyable
    const { container } = render(
      <Base 
        ellipsis={{ rows: 1 }} 
        copyable
        component="span"
        ref={ref}
        style={{ width: 300 }}
      >
        {longText}
      </Base>
    );

    // Simulate resize to trigger ellipsis calculation
    if (ref.current) {
      triggerResize(ref.current);
    }

    // Wait for any async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check that no "Maximum update depth exceeded" error occurred
    const hasMaxUpdateError = errorMessages.some(msg => 
      msg.includes('Maximum update depth exceeded') || 
      msg.includes('Too many re-renders')
    );

    expect(hasMaxUpdateError).toBe(false);
    
    // Verify component rendered successfully
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle edge case with minimal text differences', async () => {
    // Test with text that might cause binary search issues
    const edgeCaseText = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
    
    const ref = React.createRef<HTMLElement>();
    
    const { container } = render(
      <Base 
        ellipsis={{ rows: 1 }} 
        copyable
        component="span"
        ref={ref}
        style={{ width: 100 }} // Very narrow to force ellipsis
      >
        {edgeCaseText}
      </Base>
    );

    if (ref.current) {
      triggerResize(ref.current);
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const hasMaxUpdateError = errorMessages.some(msg => 
      msg.includes('Maximum update depth exceeded') || 
      msg.includes('Too many re-renders')
    );

    expect(hasMaxUpdateError).toBe(false);
    expect(container.firstChild).toBeTruthy();
  });
});