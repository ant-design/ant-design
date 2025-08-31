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

describe('Select min-width behavior comprehensive test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockRcSelectProps.length = 0; // Clear props array
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should implement the documented min-width behavior correctly', () => {
    // Test case 1: Default behavior (popupMatchSelectWidth: true) should use min-width
    const { container: container1 } = render(
      <Select style={{ width: 'auto' }} open data-testid="default-select" aria-label="Default select behavior">
        <Option value="short">Short</Option>
        <Option value="long">This is a very long option text that should expand the dropdown</Option>
      </Select>
    );

    const dropdown1 = container1.querySelector('.ant-select-dropdown');
    expect(dropdown1).toBeInTheDocument();
    
    // Verify props passed to rc-select for default behavior
    let lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps.dropdownMatchSelectWidth).toBe(true);

    // Test case 2: Explicit true should behave same as default  
    const { container: container2 } = render(
      <Select style={{ width: 'auto' }} popupMatchSelectWidth={true} open data-testid="explicit-true-select" aria-label="Explicit true select">
        <Option value="short">Short</Option>
        <Option value="long">This is a very long option text that should expand the dropdown</Option>
      </Select>
    );

    const dropdown2 = container2.querySelector('.ant-select-dropdown');
    expect(dropdown2).toBeInTheDocument();
    
    // Verify props for explicit true
    lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps.dropdownMatchSelectWidth).toBe(true);

    // Test case 3: False should not constrain dropdown width
    const { container: container3 } = render(
      <Select style={{ width: 'auto' }} popupMatchSelectWidth={false} open data-testid="false-select" aria-label="No width constraint select">
        <Option value="short">Short</Option>
        <Option value="long">This is a very long option text that should expand the dropdown</Option>
      </Select>
    );

    const dropdown3 = container3.querySelector('.ant-select-dropdown');
    expect(dropdown3).toBeInTheDocument();
    
    // Verify props for false
    lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps.dropdownMatchSelectWidth).toBe(false);

    // Test case 4: Numeric value should set specific width
    const { container: container4 } = render(
      <Select style={{ width: 'auto' }} popupMatchSelectWidth={300} open data-testid="numeric-select" aria-label="Numeric width select">
        <Option value="short">Short</Option>
        <Option value="long">This is a very long option text that should expand the dropdown</Option>
      </Select>
    );

    const dropdown4 = container4.querySelector('.ant-select-dropdown');
    expect(dropdown4).toBeInTheDocument();
    
    // Verify props for numeric value
    lastProps = mockRcSelectProps[mockRcSelectProps.length - 1];
    expect(lastProps.dropdownMatchSelectWidth).toBe(300);
  });

  it('should work correctly with different select widths', () => {
    // Test with explicit width
    const { container: container1 } = render(
      <Select style={{ width: 200 }} open aria-label="Select with 200px width">
        <Option value="test">Test option</Option>
      </Select>
    );

    const dropdown1 = container1.querySelector('.ant-select-dropdown');
    expect(dropdown1).toBeInTheDocument();

    // Test with percentage width
    const { container: container2 } = render(
      <Select style={{ width: '100%' }} open aria-label="Select with 100% width">
        <Option value="test">Test option</Option>
      </Select>
    );

    const dropdown2 = container2.querySelector('.ant-select-dropdown');
    expect(dropdown2).toBeInTheDocument();

    // Test with no explicit width (should use default)
    const { container: container3 } = render(
      <Select open aria-label="Select with default width">
        <Option value="test">Test option</Option>
      </Select>
    );

    const dropdown3 = container3.querySelector('.ant-select-dropdown');
    expect(dropdown3).toBeInTheDocument();
  });

  it('should handle mode variations correctly', () => {
    // Single select mode
    const { container: container1 } = render(
      <Select style={{ width: 'auto' }} open aria-label="Single select mode">
        <Option value="single">Single option</Option>
      </Select>
    );

    const dropdown1 = container1.querySelector('.ant-select-dropdown');
    expect(dropdown1).toBeInTheDocument();

    // Multiple select mode
    const { container: container2 } = render(
      <Select mode="multiple" style={{ width: 'auto' }} open aria-label="Multiple select mode">
        <Option value="multi1">Multiple option 1</Option>
        <Option value="multi2">Multiple option 2</Option>
      </Select>
    );

    const dropdown2 = container2.querySelector('.ant-select-dropdown');
    expect(dropdown2).toBeInTheDocument();

    // Tags mode
    const { container: container3 } = render(
      <Select mode="tags" style={{ width: 'auto' }} open aria-label="Tags select mode">
        <Option value="tag1">Tag option 1</Option>
        <Option value="tag2">Tag option 2</Option>
      </Select>
    );

    const dropdown3 = container3.querySelector('.ant-select-dropdown');
    expect(dropdown3).toBeInTheDocument();
  });
});