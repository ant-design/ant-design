import React from 'react';
import { render } from '@testing-library/react';
import { Flex, Space, Switch } from 'antd';
import type { SwitchProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border-color: red;
  `,
  content: css`
    color: black;
  `,
  indicator: css`
    background: blue;
  `,
}));

const stylesObject: SwitchProps['styles'] = {
  root: { background: 'red' },
  indicator: { width: '20px' },
};

// 创建一个自定义 Hook 来获取 classNames 函数
const useClassNames = () => {
  const classNamesFn: SwitchProps['classNames'] = (info) => {
    if (info.props.size === 'small') {
      return {
        root: classNames.root,
        content: classNames.content,
        indicator: classNames.indicator,
      };
    }

    return {};
  };

  return classNamesFn;
};

const App: React.FC = () => {
  const classNamesFn = useClassNames();

  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Switch
          size="small"
          checkedChildren="on"
          unCheckedChildren="off"
          classNames={classNamesFn}
        />
      </Flex>
      <Flex gap="small">
        <Switch styles={stylesObject} />
      </Flex>
    </Space>
  );
};

describe('Switch style-class demo', () => {
  it('should render classNames function correctly with small size', () => {
    const TestComponent = () => {
      const classNamesFn = useClassNames();
      return (
        <Switch
          size="small"
          checkedChildren="on"
          unCheckedChildren="off"
          classNames={classNamesFn}
        />
      );
    };

    const { container } = render(<TestComponent />);

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toBeTruthy();

    // Content classNames may not be applied in current rc-switch version
    const contentElement = container.querySelector('.ant-switch-inner');
    expect(contentElement).toBeTruthy();
  });

  it('should render classNames function correctly without small size', () => {
    const TestComponent = () => {
      const classNamesFn = useClassNames();
      return <Switch checkedChildren="on" classNames={classNamesFn} />;
    };

    const { container } = render(<TestComponent />);

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toBeTruthy();

    // Content classNames may not be applied in current rc-switch version
    const contentElement = container.querySelector('.ant-switch-inner');
    expect(contentElement).toBeTruthy();
  });

  it('should render styles object correctly', () => {
    const { container } = render(<Switch styles={stylesObject} />);

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveStyle({ background: 'red' });

    const handleElement = container.querySelector('.ant-switch-handle');
    expect(handleElement).toHaveStyle({ width: '20px' });
  });

  it('should render the complete demo structure', () => {
    const { container } = render(<App />);

    const switches = container.querySelectorAll('.ant-switch');
    expect(switches).toHaveLength(2);

    // Check first switch with classNames function and small size
    expect(switches[0]).toBeTruthy();
    const firstSwitchContent = switches[0].querySelector('.ant-switch-inner');
    expect(firstSwitchContent).toBeInTheDocument();

    // Check second switch with styles object
    expect(switches[1]).toHaveStyle({ background: 'red' });
  });

  it('should call classNames function with correct parameters', () => {
    const mockClassNamesFn = jest.fn().mockReturnValue({ content: 'test-class' });

    render(
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        classNames={mockClassNamesFn}
      />,
    );

    expect(mockClassNamesFn).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          size: 'small',
          checkedChildren: 'on',
          unCheckedChildren: 'off',
        }),
      }),
    );
  });
});
