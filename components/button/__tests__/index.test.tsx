import React, { Component } from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { SearchOutlined } from '@ant-design/icons';
import { resetWarned } from 'rc-util/lib/warning';
import Button from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';
import { SizeType } from '../../config-provider/SizeContext';

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
    expect(<Button>Follow</Button>).toMatchRenderedSnapshot();
  });

  it('mount correctly', () => {
    expect(() => mount(<Button>Follow</Button>)).not.toThrow();
  });

  it('warns if size is wrong', () => {
    const mockWarn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(mockWarn);
    const size = ('who am I' as any) as SizeType;
    render(<Button.Group size={size} />);
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn.mock.calls[0][0]).toMatchObject({
      message: 'unreachable case: "who am I"',
    });
  });

  it('renders Chinese characters correctly', () => {
    expect(<Button>按钮</Button>).toMatchRenderedSnapshot();
    // should not insert space when there is icon
    expect(<Button icon={<SearchOutlined />}>按钮</Button>).toMatchRenderedSnapshot();
    // should not insert space when there is icon
    expect(
      <Button>
        <SearchOutlined />
        按钮
      </Button>,
    ).toMatchRenderedSnapshot();
    // should not insert space when there is icon
    expect(<Button icon={<SearchOutlined />}>按钮</Button>).toMatchRenderedSnapshot();
    // should not insert space when there is icon while loading
    expect(
      <Button icon={<SearchOutlined />} loading>
        按钮
      </Button>,
    ).toMatchRenderedSnapshot();
    // should insert space while loading
    expect(<Button loading>按钮</Button>).toMatchRenderedSnapshot();

    // should insert space while only one nested element
    expect(
      <Button>
        <span>按钮</span>
      </Button>,
    ).toMatchRenderedSnapshot();
  });

  it('renders Chinese characters correctly in HOC', () => {
    const Text = ({ children }: { children: React.ReactNode }) => <span>{children}</span>;
    const wrapper = mount(
      <Button>
        <Text>按钮</Text>
      </Button>,
    );
    expect(wrapper.find('.ant-btn').hasClass('ant-btn-two-chinese-chars')).toBe(true);
    wrapper.setProps({
      children: <Text>大按钮</Text>,
    });
    wrapper.update();
    expect(wrapper.find('.ant-btn').hasClass('ant-btn-two-chinese-chars')).toBe(false);
    wrapper.setProps({
      children: <Text>按钮</Text>,
    });
    wrapper.update();
    expect(wrapper.find('.ant-btn').hasClass('ant-btn-two-chinese-chars')).toBe(true);
  });

  // https://github.com/ant-design/ant-design/issues/18118
  it('should not insert space to link or text button', () => {
    const wrapper1 = mount(<Button type="link">按钮</Button>);
    expect(wrapper1.text()).toBe('按钮');
    const wrapper2 = mount(<Button type="text">按钮</Button>);
    expect(wrapper2.text()).toBe('按钮');
  });

  it('should render empty button without errors', () => {
    const wrapper = mount(
      <Button>
        {null}
        {undefined}
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have static property for type detecting', () => {
    const wrapper = mount(<Button>Button Text</Button>);
    expect((wrapper.type() as any).__ANT_BUTTON).toBe(true);
  });

  it('should change loading state instantly by default', () => {
    class DefaultButton extends Component {
      state = {
        loading: false,
      };

      enterLoading = () => {
        this.setState({ loading: true });
      };

      render() {
        const { loading } = this.state;
        return (
          <Button loading={loading} onClick={this.enterLoading}>
            Button
          </Button>
        );
      }
    }
    const wrapper = mount(<DefaultButton />);
    wrapper.simulate('click');
    expect(wrapper.find('.ant-btn-loading').length).toBe(1);
  });

  it('should change loading state with delay', () => {
    class DefaultButton extends Component {
      state = {
        loading: false,
      };

      enterLoading = () => {
        this.setState({ loading: { delay: 1000 } });
      };

      render() {
        const { loading } = this.state;
        return (
          <Button loading={loading} onClick={this.enterLoading}>
            Button
          </Button>
        );
      }
    }
    const wrapper = mount(<DefaultButton />);
    wrapper.simulate('click');
    expect(wrapper.hasClass('ant-btn-loading')).toBe(false);
  });

  it('reset when loading back of delay', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Button loading={{ delay: 1000 }} />);
    wrapper.update();
    wrapper.setProps({ loading: { delay: 2000 } });
    wrapper.update();
    wrapper.setProps({ loading: false });

    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.ant-btn-loading')).toHaveLength(0);

    jest.useRealTimers();
  });

  it('should not clickable when button is loading', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Button loading onClick={onClick}>
        button
      </Button>,
    );
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalledWith();
  });

  it('should support link button', () => {
    const wrapper = mount(
      <Button target="_blank" href="https://ant.design">
        link button
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('fixbug renders {0} , 0 and {false}', () => {
    expect(<Button>{0}</Button>).toMatchRenderedSnapshot();
    expect(<Button>0</Button>).toMatchRenderedSnapshot();
    expect(<Button>{false}</Button>).toMatchRenderedSnapshot();
  });

  it('should not render as link button when href is undefined', async () => {
    const wrapper = mount(
      <Button type="primary" href={undefined}>
        button
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/15342
  it('should merge text if children using variable', () => {
    const wrapper = mount(
      <Button>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        This {'is'} a test {1}
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support to change loading', async () => {
    const wrapper = mount(<Button>Button</Button>);
    wrapper.setProps({ loading: true });
    wrapper.update();
    expect(wrapper.find('.ant-btn-loading').length).toBe(1);
    wrapper.setProps({ loading: false });
    wrapper.update();
    expect(wrapper.find('.ant-btn-loading').length).toBe(0);
    wrapper.setProps({ loading: { delay: 50 } });
    wrapper.update();
    expect(wrapper.find('.ant-btn-loading').length).toBe(0);
    await sleep(50);
    wrapper.update();
    expect(wrapper.find('.ant-btn-loading').length).toBe(1);
    wrapper.setProps({ loading: false });
    await sleep(50);
    wrapper.update();
    expect(wrapper.find('.ant-btn-loading').length).toBe(0);
    expect(() => {
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should warning when pass a string as icon props', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Button type="primary" icon="ab" />);
    expect(warnSpy).not.toHaveBeenCalled();
    mount(<Button type="primary" icon="search" />);
    expect(warnSpy).toHaveBeenCalledWith(
      `Warning: [antd: Button] \`icon\` is using ReactNode instead of string naming in v4. Please check \`search\` at https://ant.design/components/icon`,
    );
    warnSpy.mockRestore();
  });

  it('should warning when pass type=link and ghost=true', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Button type="link" ghost />);
    expect(warnSpy).toHaveBeenCalledWith(
      "Warning: [antd: Button] `link` or `text` button can't be a `ghost` button.",
    );
    warnSpy.mockRestore();
  });

  it('should warning when pass type=text and ghost=true', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Button type="text" ghost />);
    expect(warnSpy).toHaveBeenCalledWith(
      "Warning: [antd: Button] `link` or `text` button can't be a `ghost` button.",
    );
    warnSpy.mockRestore();
  });

  it('skip check 2 words when ConfigProvider disable this', () => {
    const wrapper = mount(
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button>test</Button>
      </ConfigProvider>,
    );

    const btn = wrapper.find('button').instance();
    Object.defineProperty(btn, 'textContent', {
      get() {
        throw new Error('Should not called!!!');
      },
    });
  });
});
