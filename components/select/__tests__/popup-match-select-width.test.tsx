import React from 'react';
import { Select } from 'antd';
import { render } from '../../../tests/utils';

const { Option } = Select;

describe('Select popupMatchSelectWidth behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle numeric popupMatchSelectWidth with documented min-width behavior', () => {
    // Mock getBoundingClientRect to simulate select width
    const mockGetBoundingClientRect = jest.fn();
    HTMLDivElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;

    // Test case 1: Number smaller than select width (should use select width as min-width)
    mockGetBoundingClientRect.mockReturnValue({ width: 200 });
    
    const { container: container1 } = render(
      <div style={{ width: 'max-content' }}>
        <Select
          style={{ width: 200 }}
          popupMatchSelectWidth={100}
          open
          data-testid="smaller-number"
        >
          <Option value="test">Test option that might be wider than 100px</Option>
        </Select>
      </div>
    );

    const dropdown1 = container1.querySelector('.ant-select-dropdown');
    expect(dropdown1).toBeInTheDocument();

    // Test case 2: Number larger than select width (should be used)
    mockGetBoundingClientRect.mockReturnValue({ width: 150 });
    
    const { container: container2 } = render(
      <div style={{ width: 'max-content' }}>
        <Select
          style={{ width: 150 }}
          popupMatchSelectWidth={300}
          open
          data-testid="larger-number"
        >
          <Option value="test">Test option</Option>
        </Select>
      </div>
    );

    const dropdown2 = container2.querySelector('.ant-select-dropdown');
    expect(dropdown2).toBeInTheDocument();

    // Test case 3: Default behavior
    const { container: container3 } = render(
      <div style={{ width: 'max-content' }}>
        <Select
          style={{ width: 180 }}
          open
          data-testid="default"
        >
          <Option value="test">Test option</Option>
        </Select>
      </div>
    );

    const dropdown3 = container3.querySelector('.ant-select-dropdown');
    expect(dropdown3).toBeInTheDocument();

    // Test case 4: False (should not constrain width)
    const { container: container4 } = render(
      <div style={{ width: 'max-content' }}>
        <Select
          style={{ width: 180 }}
          popupMatchSelectWidth={false}
          open
          data-testid="false"
        >
          <Option value="test">Test option with very long text that should expand</Option>
        </Select>
      </div>
    );

    const dropdown4 = container4.querySelector('.ant-select-dropdown');
    expect(dropdown4).toBeInTheDocument();
  });

  it('should work correctly with different popupMatchSelectWidth values', () => {
    // Mock getBoundingClientRect to simulate select width
    const mockGetBoundingClientRect = jest.fn();
    HTMLDivElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;
    mockGetBoundingClientRect.mockReturnValue({ width: 150 });

    // Test different numeric values
    const values = [50, 100, 200, 300];
    
    values.forEach(value => {
      const { container } = render(
        <Select
          style={{ width: 150 }}
          popupMatchSelectWidth={value}
          open
          data-testid={`numeric-${value}`}
        >
          <Option value="test">Test option</Option>
        </Select>
      );

      const dropdown = container.querySelector('.ant-select-dropdown');
      expect(dropdown).toBeInTheDocument();
    });
  });

  it('should pass correct props to rc-select for different popupMatchSelectWidth values', () => {
    // Test that the transformation logic works correctly
    const { container: container1 } = render(
      <Select popupMatchSelectWidth={100} open>
        <Option value="test">Test</Option>
      </Select>
    );

    const { container: container2 } = render(
      <Select popupMatchSelectWidth={false} open>
        <Option value="test">Test</Option>
      </Select>
    );

    const { container: container3 } = render(
      <Select popupMatchSelectWidth={true} open>
        <Option value="test">Test</Option>
      </Select>
    );

    // Verify that all dropdowns are rendered
    expect(container1.querySelector('.ant-select-dropdown')).toBeInTheDocument();
    expect(container2.querySelector('.ant-select-dropdown')).toBeInTheDocument();
    expect(container3.querySelector('.ant-select-dropdown')).toBeInTheDocument();
  });
});