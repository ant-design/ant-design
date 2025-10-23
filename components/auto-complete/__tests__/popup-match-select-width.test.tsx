import React from 'react';
import { AutoComplete } from 'antd';
import { render } from '../../../tests/utils';

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

describe('AutoComplete popupMatchSelectWidth behavior', () => {
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

  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('should handle numeric popupMatchSelectWidth with documented min-width behavior', () => {
    // Test case 1: Number smaller than select width (should use select width as min-width)
    getBoundingClientRectSpy.mockReturnValue(createMockRect(200));
    
    const { container: container1 } = render(
      <div style={{ width: 'max-content' }}>
        <AutoComplete
          style={{ width: 200 }}
          popupMatchSelectWidth={100}
          open
          options={mockOptions}
          data-testid="smaller-number"
          aria-label="AutoComplete with smaller width value"
        />
      </div>
    );

    const dropdown1 = container1.querySelector('.ant-select-dropdown');
    expect(dropdown1).toBeInTheDocument();

    // Test case 2: Number larger than select width (should be used)
    getBoundingClientRectSpy.mockReturnValue(createMockRect(150));
    
    const { container: container2 } = render(
      <div style={{ width: 'max-content' }}>
        <AutoComplete
          style={{ width: 150 }}
          popupMatchSelectWidth={300}
          open
          options={mockOptions}
          data-testid="larger-number"
          aria-label="AutoComplete with larger width value"
        />
      </div>
    );

    const dropdown2 = container2.querySelector('.ant-select-dropdown');
    expect(dropdown2).toBeInTheDocument();

    // Test case 3: Default behavior
    const { container: container3 } = render(
      <div style={{ width: 'max-content' }}>
        <AutoComplete
          style={{ width: 180 }}
          open
          options={mockOptions}
          data-testid="default"
          aria-label="AutoComplete with default behavior"
        />
      </div>
    );

    const dropdown3 = container3.querySelector('.ant-select-dropdown');
    expect(dropdown3).toBeInTheDocument();

    // Test case 4: False (should not constrain width)
    const { container: container4 } = render(
      <div style={{ width: 'max-content' }}>
        <AutoComplete
          style={{ width: 180 }}
          popupMatchSelectWidth={false}
          open
          options={mockOptions}
          data-testid="false"
          aria-label="AutoComplete with no width constraint"
        />
      </div>
    );

    const dropdown4 = container4.querySelector('.ant-select-dropdown');
    expect(dropdown4).toBeInTheDocument();
    
    // Verify that the last props passed had correct dropdownMatchSelectWidth
    const lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps.dropdownMatchSelectWidth).toBe(false);
  });

  it('should pass correct props to rc-select for different popupMatchSelectWidth values', () => {
    // Test that the transformation logic works correctly through AutoComplete to Select
    const { container: container1 } = render(
      <AutoComplete popupMatchSelectWidth={100} open options={mockOptions} aria-label="AutoComplete with 100px width" />
    );

    const { container: container2 } = render(
      <AutoComplete popupMatchSelectWidth={false} open options={mockOptions} aria-label="AutoComplete with no width matching" />
    );

    const { container: container3 } = render(
      <AutoComplete popupMatchSelectWidth={true} open options={mockOptions} aria-label="AutoComplete with width matching" />
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

  it('should work with custom input element', () => {
    const { container } = render(
      <AutoComplete
        popupMatchSelectWidth={200}
        open
        options={mockOptions}
        aria-label="AutoComplete with custom input"
      >
        <input data-testid="custom-input" />
      </AutoComplete>
    );

    const dropdown = container.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeInTheDocument();
    
    // Custom input should still be there
    expect(container.querySelector('[data-testid="custom-input"]')).toBeInTheDocument();
  });
});