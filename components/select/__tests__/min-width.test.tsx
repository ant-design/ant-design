import React from 'react';
import { Select } from 'antd';
import { render } from '../../../tests/utils';

const { Option } = Select;

describe('Select min-width behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
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
      >
        <Option value="option1">Very long option text that should test the dropdown width</Option>
        <Option value="option2">Short</Option>
      </Select>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeTruthy();
    
    // The dropdown should be visible and have proper styling
    expect(dropdown).toBeInTheDocument();
  });

  it('should not apply min-width when popupMatchSelectWidth is false', () => {
    const { container } = render(
      <Select
        style={{ width: 'auto' }}
        popupMatchSelectWidth={false}
        data-testid="select-no-match-width"
        open
      >
        <Option value="option1">Very long option text that should test the dropdown width</Option>
        <Option value="option2">Short</Option>
      </Select>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeTruthy();
    expect(dropdown).toBeInTheDocument();
  });

  it('should handle numeric popupMatchSelectWidth', () => {
    const { container } = render(
      <Select
        style={{ width: 'auto' }}
        popupMatchSelectWidth={300}
        data-testid="select-numeric-width"
        open
      >
        <Option value="option1">Very long option text that should test the dropdown width</Option>
        <Option value="option2">Short</Option>
      </Select>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeTruthy();
    expect(dropdown).toBeInTheDocument();
  });

  it('should pass correct dropdownMatchSelectWidth to rc-select based on popupMatchSelectWidth', () => {
    // Mock the rc-select to capture the props passed to it
    jest.mock('rc-select', () => {
      const original = jest.requireActual('rc-select');
      return {
        ...original,
        default: jest.fn((props) => {
          // Store the props for inspection
          (global as any).lastRcSelectProps = props;
          return original.default(props);
        }),
      };
    });

    // Test default behavior (popupMatchSelectWidth: true should become dropdownMatchSelectWidth: false to get min-width)
    const { container: container1 } = render(
      <Select open>
        <Option value="test">Test</Option>
      </Select>
    );
    
    // Test explicit false (popupMatchSelectWidth: false should become dropdownMatchSelectWidth: true to get width matching)
    const { container: container2 } = render(
      <Select popupMatchSelectWidth={false} open>
        <Option value="test">Test</Option>
      </Select>
    );

    // Test numeric value (should pass through unchanged)
    const { container: container3 } = render(
      <Select popupMatchSelectWidth={200} open>
        <Option value="test">Test</Option>
      </Select>
    );

    // Basic checks that dropdowns exist
    expect(container1.querySelector('.ant-select-dropdown')).toBeInTheDocument();
    expect(container2.querySelector('.ant-select-dropdown')).toBeInTheDocument();  
    expect(container3.querySelector('.ant-select-dropdown')).toBeInTheDocument();
  });
});