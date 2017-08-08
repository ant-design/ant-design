import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import Button from '..';
import Icon from '../../icon';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Button>Follow</Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Chinese characters correctly', () => {
    const wrapper = render(
      <Button>按钮</Button>
    );
    expect(wrapper).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper1 = render(
      <Button icon="search">按钮</Button>
    );
    expect(wrapper1).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper2 = render(
      <Button><Icon type="search" />按钮</Button>
    );
    expect(wrapper2).toMatchSnapshot();
  });

  it('have static perperty for type detecting', () => {
    const wrapper = mount(
      <Button>Button Text</Button>
    );
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
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>Button</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.hasClass('ant-btn-loading')).toBe(true);
  });

  it('should change loading state with delay', () => {
    // eslint-disable-next-line
    class DefaultButton extends Component {
      state = {
        loading: false,
      };
      enterLoading = () => {
        this.setState({ loading: { delay: 1000 } });
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>Button</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.hasClass('ant-btn-loading')).toBe(false);
  });
});
