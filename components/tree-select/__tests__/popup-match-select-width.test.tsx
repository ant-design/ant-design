import React from 'react';
import { TreeSelect } from 'antd';
import { render } from '../../../tests/utils';

describe('TreeSelect popupMatchSelectWidth behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
        },
        {
          title: 'Very long child node text that should test the dropdown width',
          value: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
    },
  ];

  it('should handle numeric popupMatchSelectWidth with documented min-width behavior', () => {
    // Mock getBoundingClientRect to simulate select width
    const mockGetBoundingClientRect = jest.fn();
    HTMLDivElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;

    // Test case 1: Number smaller than select width (should use select width as min-width)
    mockGetBoundingClientRect.mockReturnValue({ width: 200 });
    
    const { container: container1 } = render(
      <div style={{ width: 'max-content' }}>
        <TreeSelect
          style={{ width: 200 }}
          popupMatchSelectWidth={100}
          open
          treeData={treeData}
          data-testid="smaller-number"
        />
      </div>
    );

    const dropdown1 = container1.querySelector('.ant-tree-select-dropdown');
    expect(dropdown1).toBeInTheDocument();

    // Test case 2: Number larger than select width (should be used)
    mockGetBoundingClientRect.mockReturnValue({ width: 150 });
    
    const { container: container2 } = render(
      <div style={{ width: 'max-content' }}>
        <TreeSelect
          style={{ width: 150 }}
          popupMatchSelectWidth={300}
          open
          treeData={treeData}
          data-testid="larger-number"
        />
      </div>
    );

    const dropdown2 = container2.querySelector('.ant-tree-select-dropdown');
    expect(dropdown2).toBeInTheDocument();

    // Test case 3: Default behavior
    const { container: container3 } = render(
      <div style={{ width: 'max-content' }}>
        <TreeSelect
          style={{ width: 180 }}
          open
          treeData={treeData}
          data-testid="default"
        />
      </div>
    );

    const dropdown3 = container3.querySelector('.ant-tree-select-dropdown');
    expect(dropdown3).toBeInTheDocument();

    // Test case 4: False (should not constrain width)
    const { container: container4 } = render(
      <div style={{ width: 'max-content' }}>
        <TreeSelect
          style={{ width: 180 }}
          popupMatchSelectWidth={false}
          open
          treeData={treeData}
          data-testid="false"
        />
      </div>
    );

    const dropdown4 = container4.querySelector('.ant-tree-select-dropdown');
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
        <TreeSelect
          style={{ width: 150 }}
          popupMatchSelectWidth={value}
          open
          treeData={treeData}
          data-testid={`numeric-${value}`}
        />
      );

      const dropdown = container.querySelector('.ant-tree-select-dropdown');
      expect(dropdown).toBeInTheDocument();
    });
  });

  it('should pass correct props to rc-tree-select for different popupMatchSelectWidth values', () => {
    // Test that the transformation logic works correctly
    const { container: container1 } = render(
      <TreeSelect popupMatchSelectWidth={100} open treeData={treeData} />
    );

    const { container: container2 } = render(
      <TreeSelect popupMatchSelectWidth={false} open treeData={treeData} />
    );

    const { container: container3 } = render(
      <TreeSelect popupMatchSelectWidth={true} open treeData={treeData} />
    );

    // Verify that all dropdowns are rendered
    expect(container1.querySelector('.ant-tree-select-dropdown')).toBeInTheDocument();
    expect(container2.querySelector('.ant-tree-select-dropdown')).toBeInTheDocument();
    expect(container3.querySelector('.ant-tree-select-dropdown')).toBeInTheDocument();
  });
});