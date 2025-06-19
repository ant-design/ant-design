import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Transfer from '..';
import Button from '../../button';

const listCommonProps: {
  dataSource: { key: string; title: string; disabled?: boolean }[];
  selectedKeys?: string[];
  targetKeys?: string[];
} = {
  dataSource: [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c', disabled: true },
  ],
  selectedKeys: ['a'],
  targetKeys: ['b'],
};

describe('Actions', () => {
  it('should handle custom button click correctly via actions', () => {
    const handleChange = jest.fn();
    const customButtonClick = jest.fn();

    const CustomButton = ({ onClick }: { onClick: () => void }) => (
      <Button type="link" onClick={onClick}>
        Custom Button
      </Button>
    );

    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        onChange={handleChange}
        oneWay
        actions={[<CustomButton key="test" onClick={customButtonClick} />]}
      />,
    );

    fireEvent.click(getByText('Custom Button'));
    expect(customButtonClick).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });

  it('should accept multiple actions >= 3', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="test">test</Button>,
          <Button key="test2">test2</Button>,
          <Button key="test3">test3</Button>,
        ]}
      />,
    );

    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
    expect(getByText('test3')).toBeInTheDocument();
  });

  it('should accept multiple actions >= 2 when it is oneWay', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        oneWay
        actions={[<Button key="test">test</Button>, <Button key="test2">test2</Button>]}
      />,
    );

    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
  });

  it('should accept operations for compatibility', () => {
    const { getByText } = render(
      <Transfer {...listCommonProps} operations={['to right', 'to left']} />,
    );
    expect(getByText('to right')).toBeInTheDocument();
    expect(getByText('to left')).toBeInTheDocument();
  });
// Edge Cases and Error Conditions
  it('should handle empty actions array', () => {
    const { container } = render(
      <Transfer {...listCommonProps} actions={[]} />
    );
    // Should render without crashing and show default transfer buttons
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle null/undefined actions gracefully', () => {
    const { container } = render(
      <Transfer {...listCommonProps} actions={undefined} />
    );
    expect(container.firstChild).toBeInTheDocument();
    
    const { container: container2 } = render(
      <Transfer {...listCommonProps} actions={null as any} />
    );
    expect(container2.firstChild).toBeInTheDocument();
  });

  it('should handle actions with no onClick handlers', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="no-handler">No Handler</Button>]}
      />
    );
    
    expect(getByText('No Handler')).toBeInTheDocument();
    // Should not throw when clicked
    expect(() => fireEvent.click(getByText('No Handler'))).not.toThrow();
  });

  it('should handle disabled custom action buttons', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="disabled" disabled onClick={handleClick}>Disabled</Button>]}
      />
    );
    
    const disabledButton = getByText('Disabled');
    expect(disabledButton).toBeInTheDocument();
    expect(disabledButton).toBeDisabled();
    
    fireEvent.click(disabledButton);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should handle single action element', () => {
    const singleAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="single" onClick={singleAction}>Single Action</Button>]}
      />
    );
    
    expect(getByText('Single Action')).toBeInTheDocument();
    fireEvent.click(getByText('Single Action'));
    expect(singleAction).toHaveBeenCalledTimes(1);
  });

  // Actions with Different Transfer States
  it('should handle actions when all items are disabled', () => {
    const disabledDataSource = [
      { key: 'a', title: 'a', disabled: true },
      { key: 'b', title: 'b', disabled: true },
      { key: 'c', title: 'c', disabled: true },
    ];
    
    const customAction = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={disabledDataSource}
        actions={[<Button key="action" onClick={customAction}>Action</Button>]}
      />
    );
    
    fireEvent.click(getByText('Action'));
    expect(customAction).toHaveBeenCalled();
  });

  it('should handle actions with empty dataSource', () => {
    const customAction = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={[]}
        actions={[<Button key="action" onClick={customAction}>Action</Button>]}
      />
    );
    
    fireEvent.click(getByText('Action'));
    expect(customAction).toHaveBeenCalled();
  });

  it('should handle actions with no targetKeys', () => {
    const customAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        targetKeys={[]}
        actions={[<Button key="action" onClick={customAction}>Action</Button>]}
      />
    );
    
    fireEvent.click(getByText('Action'));
    expect(customAction).toHaveBeenCalled();
  });

  it('should handle actions with no selectedKeys', () => {
    const customAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        selectedKeys={[]}
        actions={[<Button key="action" onClick={customAction}>Action</Button>]}
      />
    );
    
    fireEvent.click(getByText('Action'));
    expect(customAction).toHaveBeenCalled();
  });

  // Complex Actions Scenarios
  it('should handle mixed action types in array', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="button" onClick={handleClick}>Button</Button>,
          <span key="span">Span Element</span>,
          <div key="div">Div Element</div>,
        ]}
      />
    );
    
    expect(getByText('Button')).toBeInTheDocument();
    expect(getByText('Span Element')).toBeInTheDocument();
    expect(getByText('Div Element')).toBeInTheDocument();
    
    fireEvent.click(getByText('Button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should handle actions with complex nested elements', () => {
    const nestedAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <div key="nested">
            <Button onClick={nestedAction}>Nested Button</Button>
            <span>Additional Text</span>
          </div>
        ]}
      />
    );
    
    expect(getByText('Nested Button')).toBeInTheDocument();
    expect(getByText('Additional Text')).toBeInTheDocument();
    
    fireEvent.click(getByText('Nested Button'));
    expect(nestedAction).toHaveBeenCalled();
  });

  it('should handle actions with conditional rendering', () => {
    const conditionalAction = jest.fn();
    const showAction = true;
    
    const { getByText, queryByText, rerender } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          showAction ? <Button key="conditional" onClick={conditionalAction}>Conditional</Button> : null
        ]}
      />
    );
    
    expect(getByText('Conditional')).toBeInTheDocument();
    
    // Re-render with condition false
    rerender(
      <Transfer
        {...listCommonProps}
        actions={[
          false ? <Button key="conditional" onClick={conditionalAction}>Conditional</Button> : null
        ]}
      />
    );
    
    expect(queryByText('Conditional')).not.toBeInTheDocument();
  });

  // Actions State Management
  it('should not interfere with onChange when actions are present', () => {
    const handleChange = jest.fn();
    const actionClick = jest.fn();
    
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        onChange={handleChange}
        actions={[<Button key="action" onClick={actionClick}>Action</Button>]}
      />
    );
    
    fireEvent.click(getByText('Action'));
    expect(actionClick).toHaveBeenCalled();
    // onChange should not be called by action clicks directly
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle actions with different button types', () => {
    const primaryAction = jest.fn();
    const linkAction = jest.fn();
    const defaultAction = jest.fn();
    
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="primary" type="primary" onClick={primaryAction}>Primary</Button>,
          <Button key="link" type="link" onClick={linkAction}>Link</Button>,
          <Button key="default" onClick={defaultAction}>Default</Button>,
        ]}
      />
    );
    
    fireEvent.click(getByText('Primary'));
    fireEvent.click(getByText('Link'));
    fireEvent.click(getByText('Default'));
    
    expect(primaryAction).toHaveBeenCalled();
    expect(linkAction).toHaveBeenCalled();
    expect(defaultAction).toHaveBeenCalled();
  });

  it('should handle actions with different sizes', () => {
    const smallAction = jest.fn();
    const largeAction = jest.fn();
    
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="small" size="small" onClick={smallAction}>Small</Button>,
          <Button key="large" size="large" onClick={largeAction}>Large</Button>,
        ]}
      />
    );
    
    fireEvent.click(getByText('Small'));
    fireEvent.click(getByText('Large'));
    
    expect(smallAction).toHaveBeenCalled();
    expect(largeAction).toHaveBeenCalled();
  });

  // Accessibility and Keyboard Interaction
  it('should preserve ARIA attributes on action elements', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button 
            key="aria" 
            aria-label="Custom Action"
            aria-describedby="action-description"
          >
            Action
          </Button>
        ]}
      />
    );
    
    const actionButton = getByText('Action');
    expect(actionButton).toHaveAttribute('aria-label', 'Custom Action');
    expect(actionButton).toHaveAttribute('aria-describedby', 'action-description');
  });

  it('should handle actions with loading states', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="loading" loading>Loading Action</Button>]}
      />
    );
    
    expect(getByText('Loading Action')).toBeInTheDocument();
  });

  it('should handle actions with icons', () => {
    const iconAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="icon" icon={<span>⚙️</span>} onClick={iconAction}>
            Settings
          </Button>
        ]}
      />
    );
    
    expect(getByText('Settings')).toBeInTheDocument();
    fireEvent.click(getByText('Settings'));
    expect(iconAction).toHaveBeenCalled();
  });

  // Performance and Error Handling
  it('should handle rapid action clicks without issues', () => {
    const rapidClickHandler = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="rapid" onClick={rapidClickHandler}>Rapid Click</Button>]}
      />
    );
    
    const button = getByText('Rapid Click');
    
    // Simulate rapid clicking
    for (let i = 0; i < 10; i++) {
      fireEvent.click(button);
    }
    
    expect(rapidClickHandler).toHaveBeenCalledTimes(10);
  });

  it('should handle actions that throw errors gracefully', () => {
    const errorAction = jest.fn(() => {
      throw new Error('Action error');
    });
    
    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="error" onClick={errorAction}>Error Action</Button>]}
      />
    );
    
    expect(() => fireEvent.click(getByText('Error Action'))).not.toThrow();
    expect(errorAction).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should handle maximum number of actions', () => {
    const actions = Array.from({ length: 10 }, (_, i) => (
      <Button key={`action-${i}`} onClick={jest.fn()}>
        Action {i + 1}
      </Button>
    ));
    
    const { getByText } = render(
      <Transfer {...listCommonProps} actions={actions} />
    );
    
    // All actions should be rendered
    for (let i = 1; i <= 10; i++) {
      expect(getByText(`Action ${i}`)).toBeInTheDocument();
    }
  });

  it('should handle actions with both operations and actions props', () => {
    const customAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        operations={['Move Right', 'Move Left']}
        actions={[<Button key="custom" onClick={customAction}>Custom</Button>]}
      />
    );
    
    expect(getByText('Move Right')).toBeInTheDocument();
    expect(getByText('Move Left')).toBeInTheDocument();
    expect(getByText('Custom')).toBeInTheDocument();
    
    fireEvent.click(getByText('Custom'));
    expect(customAction).toHaveBeenCalled();
  });