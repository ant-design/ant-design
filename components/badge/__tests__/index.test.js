import React from 'react';
import { mount } from 'enzyme';
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

  it('badge dot not showing count == 0', () => {
    const badge = mount(<Badge count={0} dot />);
    expect(badge.find('.ant-badge-dot').length).toBe(0);
  });

  it('should have an overriden title attribute', () => {
    const badge = mount(<Badge count={10} title="Custom title" />);
    expect(badge.find('.ant-scroll-number').getDOMNode().attributes.getNamedItem('title').value).toEqual('Custom title');
  });

  // https://github.com/ant-design/ant-design/issues/10626
  it('should be composable with Tooltip', () => {
    const wrapper = mount(
      <Tooltip title="Fix the error">
        <Badge status="error" />
      </Tooltip>
    );
    wrapper.find('Badge').simulate('mouseenter');
    jest.runAllTimers();
    expect(wrapper.instance().tooltip.props.visible).toBe(true);
  });
});
