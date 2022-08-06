import { SearchOutlined } from '@ant-design/icons';
import { mount } from 'enzyme';
import { resetWarned } from 'rc-util/lib/warning';
import React, { Component } from 'react';
import { act } from 'react-dom/test-utils';
import Button from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep, screen } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { SizeType } from '../../config-provider/SizeContext';

describe('Button', () => {
  mountTest(Button);
  mountTest(() => <Button size="large" />);
  mountTest(() => <Button size="small" />);
  mountTest(Button.Group);
  mountTest(() => <Button.Group size="large" />);
  mountTest(() => <Button.Group size="small" />);
  mountTest(() => <Button.Group size="middle" />);

  rtlTest(Button);
  rtlTest(() => <Button size="large" />);
  rtlTest(() => <Button size="small" />);
  rtlTest(Button.Group);
  rtlTest(() => <Button.Group size="large" />);
  rtlTest(() => <Button.Group size="small" />);
  rtlTest(() => <Button.Group size="middle" />);

  it('renders correctly', () => {
    const { container } = render(<Button>Follow</Button>);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        class="ant-btn ant-btn-default"
        type="button"
      >
        <span>
          Follow
        </span>
      </button>
    `);
  });

  it('mount correctly', () => {
    expect(() => render(<Button>Follow</Button>)).not.toThrow();
  });

  it('warns if size is wrong', () => {
    resetWarned();
    const mockWarn = jest.spyOn(console, 'error').mockImplementation(() => {});
    const size = 'who am I' as any as SizeType;
    render(<Button.Group size={size} />);
    expect(mockWarn).toHaveBeenCalledWith('Warning: [antd: Button.Group] Invalid prop `size`.');

    mockWarn.mockRestore();
  });

  it('should render Chinese characters with space correctly', () => {
    const { rerender } = render(<Button>按钮</Button>);
    // should insert space when there is icon
    expect(screen.getByRole('button')).toHaveTextContent('按 钮');
    // should not insert space when there is icon
    rerender(<Button icon={<SearchOutlined />}>按钮</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('按钮');
    // should not insert space when there is icon
    rerender(
      <Button>
        <SearchOutlined />
        按钮
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('按钮');
    // should not insert space when there is icon while loading
    rerender(
      <Button icon={<SearchOutlined />} loading>
        按钮
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('按钮');
    // should insert space while loading
    rerender(<Button loading>按钮</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('按 钮');

    // should insert space while only one nested element
    rerender(
      <Button>
        <span>按钮</span>
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('按 钮');
  });

  it('should render Chinese characters correctly in HOC', () => {
    const Text = ({ children }: { children: React.ReactNode }) => <span>{children}</span>;
    const { rerender } = render(
      <Button>
        <Text>按钮</Text>
      </Button>,
    );
    expect(screen.getByRole('button', { name: '按钮' })).toHaveClass('ant-btn-two-chinese-chars');

    rerender(
      <Button>
        <Text>大按钮</Text>
      </Button>,
    );
    expect(screen.getByRole('button', { name: '大按钮' })).not.toHaveClass(
      'ant-btn-two-chinese-chars',
    );

    rerender(
      <Button>
        <Text>按钮</Text>
      </Button>,
    );
    expect(screen.getByRole('button', { name: '按钮' })).toHaveClass('ant-btn-two-chinese-chars');
  });

  // https://github.com/ant-design/ant-design/issues/18118
  it('should not insert space to link or text button', () => {
    const { rerender } = render(<Button type="link">按钮</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('按钮');
    rerender(<Button type="text">按钮</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('按钮');
  });

  it('should render empty button without errors', () => {
    render(
      <Button>
        {null}
        {undefined}
      </Button>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('have static property for type detecting', () => {
    const wrapper = mount(<Button>Button Text</Button>);
    expect((wrapper.find(Button).type() as any).__ANT_BUTTON).toBe(true);
  });

  it('should loading like prop loading', () => {
    // button should not loading by default
    const { rerender } = render(<Button>Button</Button>);

    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');

    // button should loading when props loading is true
    rerender(<Button loading>Button</Button>);

    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');

    // button should not loading when props loading is false
    rerender(<Button loading={false}>Button</Button>);

    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');
  });

  it('should change loading state with delay', () => {
    jest.useFakeTimers();
    // should delay 1500 to should loading status in button
    const { rerender } = render(<Button loading={false}>Button</Button>);

    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');

    rerender(<Button loading={{ delay: 1500 }}>Button</Button>);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');

    jest.useRealTimers();
  });

  it('should reset when loading back of delay', () => {
    jest.useFakeTimers();
    const { rerender } = render(<Button loading={{ delay: 1000 }} />);
    rerender(<Button loading={{ delay: 2000 }} />);
    rerender(<Button loading={false} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');

    jest.useRealTimers();
  });

  it('should not clickable when button is loading', () => {
    const onClick = jest.fn();
    render(
      <Button loading onClick={onClick}>
        button
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toBeCalled();
  });

  it('should support link button', () => {
    const { container } = render(
      <Button target="_blank" href="https://ant.design">
        link button
      </Button>,
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="ant-btn ant-btn-default"
        href="https://ant.design"
        target="_blank"
      >
        <span>
          link button
        </span>
      </a>
    `);
  });

  it('it should render correctly when text is 0 {0} {false}', () => {
    const { rerender } = render(<Button>{0}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('0');
    rerender(<Button>0</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('0');
    rerender(<Button>{false}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('');
  });

  it('should not render as link button when href is undefined', async () => {
    render(
      <Button type="primary" href={undefined}>
        button
      </Button>,
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  // // https://github.com/ant-design/ant-design/issues/15342
  it('should merge text if children using variable', () => {
    render(
      <Button>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        This {'is'} a test {1}
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('This is a test 1');
  });

  it('should support to change loading', async () => {
    const { rerender, unmount } = render(<Button>Button</Button>);
    rerender(<Button loading />);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');
    rerender(<Button loading={false} />);
    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');
    rerender(<Button loading={{ delay: 50 }} />);
    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');
    await sleep(50);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');
    rerender(<Button loading={false} />);
    await sleep(50);
    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading');
    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('should warning when pass a string as icon props', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Button type="primary" icon="ab" />);
    expect(warnSpy).not.toHaveBeenCalled();

    render(<Button type="primary" icon="search" />);
    expect(warnSpy).toHaveBeenCalledWith(
      `Warning: [antd: Button] \`icon\` is using ReactNode instead of string naming in v4. Please check \`search\` at https://ant.design/components/icon`,
    );

    warnSpy.mockRestore();
  });

  it('should warning when pass type=link and ghost=true', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Button type="link" ghost />);
    expect(warnSpy).toHaveBeenCalledWith(
      "Warning: [antd: Button] `link` or `text` button can't be a `ghost` button.",
    );
    warnSpy.mockRestore();
  });

  it('should warning when pass type=text and ghost=true', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Button type="text" ghost />);
    expect(warnSpy).toHaveBeenCalledWith(
      "Warning: [antd: Button] `link` or `text` button can't be a `ghost` button.",
    );
    warnSpy.mockRestore();
  });

  it('skip check 2 words when ConfigProvider disable this', () => {
    let buttonInstance: any;
    render(
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button
          ref={node => {
            buttonInstance = node;
          }}
        >
          test
        </Button>
      </ConfigProvider>,
    );

    Object.defineProperty(buttonInstance, 'textContent', {
      get() {
        throw new Error('Should not called!!!');
      },
    });
  });

  it('should not redirect when button is disabled', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button href="https://ant.design" onClick={onClick} disabled>
        click me
      </Button>,
    );
    fireEvent.click(container.firstChild!);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should match class .ant-btn-disabled when button is disabled and href is not undefined', () => {
    const wrapper = render(
      <Button href="https://ant.design" disabled>
        click me
      </Button>,
    );
    expect(wrapper.container.querySelector('.ant-btn')).toHaveClass('ant-btn-disabled');
  });

  // https://github.com/ant-design/ant-design/issues/30953
  it('should handle fragment as children', () => {
    const wrapper = render(
      <Button>
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        <>text</>
      </Button>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });
});
