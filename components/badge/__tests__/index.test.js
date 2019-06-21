import React from 'react';
import { mount, render } from 'enzyme';
import Badge from '../index';
import Tooltip from '../../tooltip';

describe('Badge', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('badge dot not scaling count > 9', () => {
    const badge = mount(<Badge count={10} dot />);
    expect(badge.find('.ant-card-multiple-words').length).toBe(0);
  });

  it('badge should support float number', () => {
    let wrapper = render(<Badge count={3.5} />);
    expect(wrapper).toMatchSnapshot();
    wrapper = mount(<Badge count="3.5" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('badge dot not showing count == 0', () => {
    const badge = mount(<Badge count={0} dot />);
    expect(badge.find('.ant-badge-dot').length).toBe(0);
  });

  it('should have an overriden title attribute', () => {
    const badge = mount(<Badge count={10} title="Custom title" />);
    expect(
      badge
        .find('.ant-scroll-number')
        .getDOMNode()
        .attributes.getNamedItem('title').value,
    ).toEqual('Custom title');
  });

  // https://github.com/ant-design/ant-design/issues/10626
  it('should be composable with Tooltip', () => {
    const wrapper = mount(
      <Tooltip title="Fix the error">
        <Badge status="error" />
      </Tooltip>,
    );
    wrapper.find('Badge').simulate('mouseenter');
    jest.runAllTimers();
    expect(wrapper.instance().tooltip.props.visible).toBe(true);
  });

  it('should render when count is changed', () => {
    const wrapper = mount(<Badge count={9} />);
    wrapper.setProps({ count: 10 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.setProps({ count: 9 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should be compatible with borderColor style', () => {
    const wrapper = render(
      <Badge
        count={4}
        style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/13694
  it('should support offset when count is a ReactNode', () => {
    const wrapper = render(
      <Badge count={<span className="custom" style={{ color: '#f5222d' }} />} offset={[10, 20]}>
        <a href="#" className="head-example" />
      </Badge>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/15349
  it('should color style  works on Badge', () => {
    const wrapper = mount(<Badge style={{ color: 'red' }} status="success" text="Success" />);
    expect(wrapper.find('.ant-badge-status-text').props().style.color).toBe('red');
  });

  // https://github.com/ant-design/ant-design/issues/15799
  it('render correct with negative number', () => {
    const wrapper = render(
      <div>
        <Badge count="-10" />
        <Badge count={-10} />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
