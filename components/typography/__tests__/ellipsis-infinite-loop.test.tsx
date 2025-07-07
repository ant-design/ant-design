import React from 'react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

import { render, triggerResize, waitFakeTimer } from '../../../tests/utils';
import Base from '../Base';

jest.mock('../../_util/styleChecker', () => ({
  isStyleSupport: () => true,
}));

describe('Ellipsis infinite loop prevention', () => {
  const LINE_HEIGHT = 16;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let mockRectSpy: ReturnType<typeof spyElementPrototypes>;

  beforeAll(() => {
    jest.useFakeTimers();
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      scrollWidth: {
        get: () => 200,
      },
      offsetWidth: {
        get: () => 100,
      },
      scrollHeight: {
        get: () => LINE_HEIGHT * 2, // Simulate content that needs ellipsis
      },
      clientHeight: {
        get: () => LINE_HEIGHT, // Single line height
      },
    });
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    jest.useRealTimers();
    errorSpy.mockRestore();
    mockRectSpy.mockRestore();
  });

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
      >
        {longText}
      </Base>
    );

    // Trigger ellipsis calculation
    triggerResize(ref.current!);
    await waitFakeTimer();

    // Check that no "Maximum update depth exceeded" error occurred
    const hasMaxUpdateError = errorSpy.mock.calls.some(([msg]) => 
      typeof msg === 'string' && (
        msg.includes('Maximum update depth exceeded') || 
        msg.includes('Too many re-renders')
      )
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
      >
        {edgeCaseText}
      </Base>
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    const hasMaxUpdateError = errorSpy.mock.calls.some(([msg]) => 
      typeof msg === 'string' && (
        msg.includes('Maximum update depth exceeded') || 
        msg.includes('Too many re-renders')
      )
    );

    expect(hasMaxUpdateError).toBe(false);
    expect(container.firstChild).toBeTruthy();
  });
});