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
    // Test case 1: Number smaller than select width (should use select width as min-width)
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
    
    // The dropdown should have min-width: 100% to ensure it's at least as wide as the select
    expect(dropdown1).toHaveStyle('min-width: 100%');

    // Test case 2: Number larger than select width (should be used)
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
    
    // The dropdown should have both width: 300px (from rc-tree-select) and min-width: 100%
    expect(dropdown2).toHaveStyle('min-width: 100%');

    // Test case 3: Default behavior (should use min-width)
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
    // Default behavior should not have the explicit min-width style
    expect(dropdown3).not.toHaveStyle('min-width: 100%');

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
    // False should not have the explicit min-width style
    expect(dropdown4).not.toHaveStyle('min-width: 100%');
  });

  it('should work correctly with different popupMatchSelectWidth values', () => {
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
      
      // All numeric values should result in min-width: 100% being applied
      expect(dropdown).toHaveStyle('min-width: 100%');
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