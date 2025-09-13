import React from 'react';
import { render } from '@testing-library/react';
import { Switch, Space, Flex } from 'antd';
import type { SwitchProps } from 'antd';

// Mock the demo component
const classNamesObject: SwitchProps['classNames'] = {
  root: 'demo-switch-root',
  content: 'demo-switch-content',
};

const classNamesFn: SwitchProps['classNames'] = (info) => {
  if (info.props.unCheckedChildren) {
    return { content: 'demo-switch-content--unCheckedChildren' };
  }
  return { content: 'demo-switch-content--default' };
};

const stylesObject: SwitchProps['styles'] = {
  root: { background: 'red' },
};

const stylesFn: SwitchProps['styles'] = (info) => {
  if (info.props.checkedChildren) {
    return { root: { background: 'green' }, content: { color: 'black' } };
  }
  return { root: { opacity: '0.8' } };
};

const App: React.FC = () => {
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Switch checkedChildren="开启" classNames={classNamesObject} />
        <Switch checkedChildren="1" unCheckedChildren="0" classNames={classNamesFn} />
      </Flex>
      <Flex gap="small">
        <Switch styles={stylesObject} />
        <Switch checkedChildren="1" unCheckedChildren="0" styles={stylesFn} />
      </Flex>
    </Space>
  );
};

describe('Switch style-class demo', () => {
  it('should render classNames object correctly', () => {
    const { container } = render(<Switch checkedChildren="开启" classNames={classNamesObject} />);

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveClass('demo-switch-root');

    const contentElement = container.querySelector('.ant-switch-inner');
    expect(contentElement).toHaveClass('demo-switch-content');
  });

  it('should render classNames function correctly with unCheckedChildren', () => {
    const { container } = render(
      <Switch checkedChildren="1" unCheckedChildren="0" classNames={classNamesFn} />,
    );

    const contentElement = container.querySelector('.ant-switch-inner');
    expect(contentElement).toHaveClass('demo-switch-content--unCheckedChildren');
  });

  it('should render classNames function correctly without unCheckedChildren', () => {
    const { container } = render(<Switch checkedChildren="1" classNames={classNamesFn} />);

    const contentElement = container.querySelector('.ant-switch-inner');
    expect(contentElement).toHaveClass('demo-switch-content--default');
  });

  it('should render styles object correctly', () => {
    const { container } = render(<Switch styles={stylesObject} />);

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveStyle({ background: 'red' });
  });

  it('should render styles function correctly with checkedChildren', () => {
    const { container } = render(
      <Switch checkedChildren="1" unCheckedChildren="0" styles={stylesFn} />,
    );

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveStyle({ background: 'green' });

    const contentElement = container.querySelector('.ant-switch-inner');
    expect(contentElement).toHaveStyle({ color: 'black' });
  });

  it('should render styles function correctly without checkedChildren', () => {
    const { container } = render(<Switch styles={stylesFn} />);

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveStyle({ opacity: '0.8' });
  });

  it('should render the complete demo structure', () => {
    const { container } = render(<App />);

    const switches = container.querySelectorAll('.ant-switch');
    expect(switches).toHaveLength(4);

    // Check first switch with classNames object
    expect(switches[0]).toHaveClass('demo-switch-root');

    // Check second switch with classNames function
    const secondSwitchContent = switches[1].querySelector('.ant-switch-inner');
    expect(secondSwitchContent).toHaveClass('demo-switch-content--unCheckedChildren');

    // Check third switch with styles object
    expect(switches[2]).toHaveStyle({ background: 'red' });

    // Check fourth switch with styles function
    expect(switches[3]).toHaveStyle({ background: 'green' });
  });

  it('should call classNames function with correct parameters', () => {
    const mockClassNamesFn = jest.fn().mockReturnValue({ content: 'test-class' });

    render(<Switch checkedChildren="1" unCheckedChildren="0" classNames={mockClassNamesFn} />);

    expect(mockClassNamesFn).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          checkedChildren: '1',
          unCheckedChildren: '0',
        }),
      }),
    );
  });

  it('should call styles function with correct parameters', () => {
    const mockStylesFn = jest.fn().mockReturnValue({ root: { background: 'blue' } });

    render(<Switch checkedChildren="1" unCheckedChildren="0" styles={mockStylesFn} />);

    expect(mockStylesFn).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          checkedChildren: '1',
          unCheckedChildren: '0',
        }),
      }),
    );
  });
});
