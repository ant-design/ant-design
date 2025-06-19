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
it('should handle empty actions array', () => {
    const { container } = render(<Transfer {...listCommonProps} actions={[]} />);
    // Should not render any custom actions
    expect(container.querySelector('.ant-transfer-operation')).toBeInTheDocument();
  });

  it('should handle single action', () => {
    const singleActionClick = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="single" onClick={singleActionClick}>Single Action</Button>]}
      />,
    );

    fireEvent.click(getByText('Single Action'));
    expect(singleActionClick).toHaveBeenCalledTimes(1);
  });

  it('should handle null/undefined actions gracefully', () => {
    const { container } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="valid">Valid</Button>,
          null,
          undefined,
          <Button key="another">Another</Button>,
        ]}
      />,
    );

    expect(container.querySelector('[data-testid="transfer-actions"]')).toBeInTheDocument();
  });

  it('should handle actions with different element types', () => {
    const divClick = jest.fn();
    const spanClick = jest.fn();
    
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <div key="div" onClick={divClick}>Div Action</div>,
          <span key="span" onClick={spanClick}>Span Action</span>,
          <Button key="button">Button Action</Button>,
        ]}
      />,
    );

    fireEvent.click(getByText('Div Action'));
    fireEvent.click(getByText('Span Action'));
    
    expect(divClick).toHaveBeenCalled();
    expect(spanClick).toHaveBeenCalled();
  });

  it('should handle actions that throw errors gracefully', () => {
    const errorAction = jest.fn(() => {
      throw new Error('Action error');
    });

    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="error" onClick={errorAction}>Error Action</Button>]}
      />,
    );

    // Should not crash when action throws error
    expect(() => {
      fireEvent.click(getByText('Error Action'));
    }).not.toThrow();
    
    expect(errorAction).toHaveBeenCalled();
  });

  it('should handle disabled actions', () => {
    const disabledActionClick = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="disabled" onClick={disabledActionClick} disabled>Disabled Action</Button>]}
      />,
    );

    fireEvent.click(getByText('Disabled Action'));
    expect(disabledActionClick).not.toHaveBeenCalled();
  });

  it('should handle actions with complex nested components', () => {
    const nestedActionClick = jest.fn();
    const NestedComponent = () => (
      <div>
        <span>Nested</span>
        <Button onClick={nestedActionClick}>Click Me</Button>
      </div>
    );

    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<NestedComponent key="nested" />]}
      />,
    );

    fireEvent.click(getByText('Click Me'));
    expect(nestedActionClick).toHaveBeenCalled();
  });

  it('should handle actions with different Transfer configurations', () => {
    const actionClick = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        showSearch
        showSelectAll
        oneWay
        disabled
        actions={[<Button key="config" onClick={actionClick}>Config Action</Button>]}
      />,
    );

    fireEvent.click(getByText('Config Action'));
    expect(actionClick).toHaveBeenCalled();
  });

  it('should handle actions with custom className and style', () => {
    const { container } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="styled" className="custom-action" style={{ color: 'red' }}>
            Styled Action
          </Button>,
        ]}
      />,
    );

    const styledButton = container.querySelector('.custom-action');
    expect(styledButton).toBeInTheDocument();
    expect(styledButton).toHaveStyle('color: red');
  });

  it('should handle actions with different button types and sizes', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="primary" type="primary">Primary</Button>,
          <Button key="dashed" type="dashed">Dashed</Button>,
          <Button key="text" type="text">Text</Button>,
          <Button key="small" size="small">Small</Button>,
          <Button key="large" size="large">Large</Button>,
        ]}
      />,
    );

    expect(getByText('Primary')).toBeInTheDocument();
    expect(getByText('Dashed')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
    expect(getByText('Small')).toBeInTheDocument();
    expect(getByText('Large')).toBeInTheDocument();
  });

  it('should handle action click event propagation', () => {
    const parentClick = jest.fn();
    const actionClick = jest.fn((e) => e.stopPropagation());

    const { getByText } = render(
      <div onClick={parentClick}>
        <Transfer
          {...listCommonProps}
          actions={[<Button key="propagation" onClick={actionClick}>Stop Propagation</Button>]}
        />
      </div>,
    );

    fireEvent.click(getByText('Stop Propagation'));
    expect(actionClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('should handle keyboard events on actions', () => {
    const keyboardAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button
            key="keyboard"
            onClick={keyboardAction}
            onKeyDown={(e) => e.key === 'Enter' && keyboardAction()}
          >
            Keyboard Action
          </Button>,
        ]}
      />,
    );

    const button = getByText('Keyboard Action');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(keyboardAction).toHaveBeenCalledTimes(2); // once for click, once for keydown
  });

  it('should handle actions with accessibility attributes', () => {
    const { getByRole } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button
            key="accessible"
            aria-label="Accessible Action"
            role="button"
            tabIndex={0}
          >
            Accessible
          </Button>,
        ]}
      />,
    );

    const accessibleButton = getByRole('button', { name: 'Accessible Action' });
    expect(accessibleButton).toBeInTheDocument();
    expect(accessibleButton).toHaveAttribute('tabIndex', '0');
  });

  it('should handle actions with empty dataSource', () => {
    const actionClick = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={[]}
        actions={[<Button key="empty" onClick={actionClick}>Empty Data Action</Button>]}
      />,
    );

    fireEvent.click(getByText('Empty Data Action'));
    expect(actionClick).toHaveBeenCalled();
  });

  it('should handle actions with large dataSource', () => {
    const largeDataSource = Array.from({ length: 1000 }, (_, i) => ({
      key: `item-${i}`,
      title: `Item ${i}`,
    }));

    const actionClick = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={largeDataSource}
        actions={[<Button key="large" onClick={actionClick}>Large Data Action</Button>]}
      />,
    );

    fireEvent.click(getByText('Large Data Action'));
    expect(actionClick).toHaveBeenCalled();
  });

  it('should handle actions with dynamic key generation', () => {
    const dynamicKeys = ['dynamic-1', 'dynamic-2'];
    const actionClicks = dynamicKeys.map(() => jest.fn());

    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={dynamicKeys.map((key, index) => (
          <Button key={key} onClick={actionClicks[index]}>
            {`Dynamic ${index + 1}`}
          </Button>
        ))}
      />,
    );

    dynamicKeys.forEach((_, index) => {
      fireEvent.click(getByText(`Dynamic ${index + 1}`));
      expect(actionClicks[index]).toHaveBeenCalled();
    });
  });

  it('should handle actions with React fragments', () => {
    const fragmentActionClick = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <React.Fragment key="fragment">
            <Button onClick={fragmentActionClick}>Fragment Action</Button>
          </React.Fragment>,
        ]}
      />,
    );

    fireEvent.click(getByText('Fragment Action'));
    expect(fragmentActionClick).toHaveBeenCalled();
  });

  it('should handle multiple rapid clicks on actions', () => {
    const rapidClickAction = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[<Button key="rapid" onClick={rapidClickAction}>Rapid Click</Button>]}
      />,
    );

    const button = getByText('Rapid Click');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(rapidClickAction).toHaveBeenCalledTimes(3);
  });

  it('should handle actions with conditional rendering', () => {
    const conditionalActionClick = jest.fn();
    const showAction = true;
    
    const { getByText, queryByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          showAction && <Button key="conditional" onClick={conditionalActionClick}>Conditional Action</Button>,
        ]}
      />,
    );

    expect(getByText('Conditional Action')).toBeInTheDocument();
    fireEvent.click(getByText('Conditional Action'));
    expect(conditionalActionClick).toHaveBeenCalled();
  });

  it('should handle actions with custom data attributes', () => {
    const { container } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="data-attrs" data-testid="custom-transfer-action" data-custom="value">
            Custom Data Action
          </Button>,
        ]}
      />,
    );

    const customButton = container.querySelector('[data-testid="custom-transfer-action"]');
    expect(customButton).toBeInTheDocument();
    expect(customButton).toHaveAttribute('data-custom', 'value');
  });
});
