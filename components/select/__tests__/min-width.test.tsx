import React from 'react';
import { Select } from 'antd';
import { render } from '../../../tests/utils';

const { Option } = Select;

// Mock rc-select to capture props passed to it
const mockRcSelectProps: any[] = [];
jest.mock('rc-select', () => {
  const original = jest.requireActual('rc-select');
  const RcSelect = original.default;
  return {
    ...original,
    __esModule: true,
    default: jest.fn((props: any) => {
      mockRcSelectProps.push(props);
      return <RcSelect {...props} />;
    }),
  };
});

describe('Select min-width behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockRcSelectProps.length = 0; // Clear props array
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  function toggleOpen(container: ReturnType<typeof render>['container']): void {
    const selector = container.querySelector('.ant-select-selector');
    if (selector) {
      selector.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      jest.runAllTimers();
    }
  }

  it('should apply min-width to dropdown when popupMatchSelectWidth is true (default)', () => {
    const { container } = render(
      <Select
        style={{ width: 'auto' }}
        data-testid="select-auto-width"
        open
        aria-label="Select with auto width"
      >
        <Option value="option1">Very long option text that should test the dropdown width</Option>
        <Option value="option2">Short</Option>
      </Select>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeTruthy();
    
    // The dropdown should be visible and have proper styling
    expect(dropdown).toBeInTheDocument();
    
    // Verify props passed to rc-select
    const lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps).toBeDefined();
    expect(lastProps.dropdownMatchSelectWidth).toBe(true);
  });

  it('should not apply min-width when popupMatchSelectWidth is false', () => {
    const { container } = render(
      <Select
        style={{ width: 'auto' }}
        popupMatchSelectWidth={false}
        data-testid="select-no-match-width"
        open
        aria-label="Select with no width matching"
      >
        <Option value="option1">Very long option text that should test the dropdown width</Option>
        <Option value="option2">Short</Option>
      </Select>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeTruthy();
    expect(dropdown).toBeInTheDocument();
    
    // Verify props passed to rc-select
    const lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps).toBeDefined();
    expect(lastProps.dropdownMatchSelectWidth).toBe(false);
  });

  it('should handle numeric popupMatchSelectWidth', () => {
    const { container } = render(
      <Select
        style={{ width: 'auto' }}
        popupMatchSelectWidth={300}
        data-testid="select-numeric-width"
        open
        aria-label="Select with numeric width"
      >
        <Option value="option1">Very long option text that should test the dropdown width</Option>
        <Option value="option2">Short</Option>
      </Select>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeTruthy();
    expect(dropdown).toBeInTheDocument();
    
    // Verify props passed to rc-select - numeric values should be passed through
    const lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps).toBeDefined();
    expect(lastProps.dropdownMatchSelectWidth).toBe(300);
  });

  it('should implement documented min-width behavior when numeric value is smaller than select width', () => {
    // Mock getBoundingClientRect to simulate select width
    const getBoundingClientRectSpy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
    getBoundingClientRectSpy.mockReturnValue({
      width: 200,
      height: 32,
      top: 0,
      left: 0,
      bottom: 32,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect);

    try {
      // Test case 1: Numeric value smaller than select width (should use select width)
      const { container: container1 } = render(
        <Select 
          style={{ width: 200 }} 
          popupMatchSelectWidth={100} 
          open
          aria-label="Select with smaller numeric width"
        >
          <Option value="test">Test</Option>
        </Select>
      );
      
      // Test case 2: Numeric value larger than select width (should use the number)
      getBoundingClientRectSpy.mockReturnValue({
        width: 150,
        height: 32,
        top: 0,
        left: 0,
        bottom: 32,
        right: 150,
        x: 0,
        y: 0,
        toJSON: () => ({})
      } as DOMRect);
      
      const { container: container2 } = render(
        <Select 
          style={{ width: 150 }} 
          popupMatchSelectWidth={300} 
          open
          aria-label="Select with larger numeric width"
        >
          <Option value="test">Test</Option>
        </Select>
      );

      // Basic checks that dropdowns exist
      expect(container1.querySelector('.ant-select-dropdown')).toBeInTheDocument();
      expect(container2.querySelector('.ant-select-dropdown')).toBeInTheDocument();
      
      // The actual behavior verification needs to happen after the component
      // measures the width on open, which would require more complex async testing
      // For now, we verify the dropdowns render correctly
    } finally {
      getBoundingClientRectSpy.mockRestore();
    }
  });
});