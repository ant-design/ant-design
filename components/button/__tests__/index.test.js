import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '..';
import Icon from '../../icon';
import mountTest from '../../../tests/shared/mountTest';

describe('Button', () => {
  mountTest(Button);
  mountTest(Button.Group);

  it('renders correctly', () => {
    const wrapper = render(<Button>Follow</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('mount correctly', () => {
    if (process.env.REACT === '15') {
      return;
    }
    expect(() => renderer.create(<Button>Follow</Button>)).not.toThrow();
  });

  it('renders Chinese characters correctly', () => {
    const wrapper = render(<Button>按钮</Button>);
    expect(wrapper).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper1 = render(<Button icon="search">按钮</Button>);
    expect(wrapper1).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper2 = render(
      <Button>
        <Icon type="search" />
        按钮
      </Button>,
    );
    expect(wrapper2).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper3 = render(<Button icon="search">按钮</Button>);
    expect(wrapper3).toMatchSnapshot();
    // should not insert space when there is icon while loading
    const wrapper4 = render(
      <Button icon="search" loading>
        按钮
      </Button>,
    );
    expect(wrapper4).toMatchSnapshot();
    // should insert space while loading
    const wrapper5 = render(<Button loading>按钮</Button>);
    expect(wrapper5).toMatchSnapshot();
  });

  it('renders Chinese characters correctly in HOC', () => {
    const Text = ({ children }) => <span>{children}</span>;
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

  it('have static property for type detecting', () => {
    const wrapper = mount(<Button>Button Text</Button>);
    // eslint-disable-next-line
    expect(wrapper.type().__ANT_BUTTON).toBe(true);
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
    // eslint-disable-next-line
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

  it('should support link button', () => {
    const wrapper = mount(
      <Button target="_blank" href="http://ant.design">
        link button
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('fixbug renders {0} , 0 and {false}', () => {
    const wrapper = render(<Button>{0}</Button>);
    expect(wrapper).toMatchSnapshot();
    const wrapper1 = render(<Button>0</Button>);
    expect(wrapper1).toMatchSnapshot();
    const wrapper2 = render(<Button>{false}</Button>);
    expect(wrapper2).toMatchSnapshot();
  });

  it('should has click wave effect', async () => {
    const wrapper = mount(<Button type="primary">button</Button>);
    wrapper
      .find('.ant-btn')
      .getDOMNode()
      .click();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(wrapper.render()).toMatchSnapshot();
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
        This {'is'} a test {1}
      </Button>,
    );

    expect(wrapper.render()).toMatchSnapshot();
  });
});
