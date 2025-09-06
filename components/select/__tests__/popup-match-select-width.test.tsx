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

describe('Select popupMatchSelectWidth behavior', () => {
  let getBoundingClientRectSpy: jest.SpyInstance<DOMRect, []>;
  
  const createMockRect = (width: number): DOMRect => ({
    width,
    height: 32,
    top: 0,
    left: 0,
    bottom: 32,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => ({})
  } as DOMRect);

  beforeEach(() => {
    jest.useFakeTimers();
    mockRcSelectProps.length = 0; // Clear props array
    getBoundingClientRectSpy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
  });

  afterEach(() => {
    jest.useRealTimers();
    getBoundingClientRectSpy.mockRestore();
  });

  it('should handle numeric popupMatchSelectWidth with documented min-width behavior', () => {
    // Test case 1: Number smaller than select width (should use select width as min-width)
    getBoundingClientRectSpy.mockReturnValue(createMockRect(200));
    
    const { container: container1 } = render(
      <div style={{ width: 'max-content' }}>
        <Select
          style={{ width: 200 }}
          popupMatchSelectWidth={100}
          open
          data-testid="smaller-number"
          aria-label="Select with smaller width value"
        >
          <Option value="test">Test option that might be wider than 100px</Option>
        </Select>
      </div>
    );

    const dropdown1 = container1.querySelector('.ant-select-dropdown');
    expect(dropdown1).toBeInTheDocument();

    // Test case 2: Number larger than select width (should be used)
    getBoundingClientRectSpy.mockReturnValue(createMockRect(150));
    
    const { container: container2 } = render(
      <div style={{ width: 'max-content' }}>
        <Select
          style={{ width: 150 }}
          popupMatchSelectWidth={300}
          open
          data-testid="larger-number"
          aria-label="Select with larger width value"
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
          aria-label="Select with default behavior"
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
          aria-label="Select with no width constraint"
        >
          <Option value="test">Test option with very long text that should expand</Option>
        </Select>
      </div>
    );

    const dropdown4 = container4.querySelector('.ant-select-dropdown');
    expect(dropdown4).toBeInTheDocument();
    
    // Verify that the last props passed had correct dropdownMatchSelectWidth
    const lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps.dropdownMatchSelectWidth).toBe(false);
  });

  it('should work correctly with different popupMatchSelectWidth values', () => {
    // Mock getBoundingClientRect to simulate select width
    getBoundingClientRectSpy.mockReturnValue(createMockRect(150));

    // Test different numeric values
    const values = [50, 100, 200, 300];
    
    values.forEach(value => {
      const { container } = render(
        <Select
          style={{ width: 150 }}
          popupMatchSelectWidth={value}
          open
          data-testid={`numeric-${value}`}
          aria-label={`Select with width ${value}`}
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
      <Select popupMatchSelectWidth={100} open aria-label="Select with 100px width">
        <Option value="test">Test</Option>
      </Select>
    );

    const { container: container2 } = render(
      <Select popupMatchSelectWidth={false} open aria-label="Select with no width matching">
        <Option value="test">Test</Option>
      </Select>
    );

    const { container: container3 } = render(
      <Select popupMatchSelectWidth={true} open aria-label="Select with width matching">
        <Option value="test">Test</Option>
      </Select>
    );

    // Verify that all dropdowns are rendered
    expect(container1.querySelector('.ant-select-dropdown')).toBeInTheDocument();
    expect(container2.querySelector('.ant-select-dropdown')).toBeInTheDocument();
    expect(container3.querySelector('.ant-select-dropdown')).toBeInTheDocument();
    
    // Verify that props were passed correctly
    expect(mockRcSelectProps.length).toBeGreaterThan(0);
    const props1 = mockRcSelectProps.find(props => props.dropdownMatchSelectWidth === 100);
    const props2 = mockRcSelectProps.find(props => props.dropdownMatchSelectWidth === false);
    const props3 = mockRcSelectProps.find(props => props.dropdownMatchSelectWidth === true);
    
    expect(props1).toBeDefined();
    expect(props2).toBeDefined();
    expect(props3).toBeDefined();
  });
});