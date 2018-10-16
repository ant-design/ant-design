import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Spin from '..';

describe('Spin', () => {
  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const wrapper = shallow(
      <Spin style={{ background: 'red' }}>
        <div>content</div>
      </Spin>
    );
    expect(wrapper.find('.ant-spin-nested-loading').at(0).prop('style')).toBe(null);
    expect(wrapper.find('.ant-spin').at(0).prop('style').background).toBe('red');
  });

  it('should render custom indicator when it\'s set', () => {
    const customIndicator = <div className="custom-indicator" />;
    const wrapper = render(
      <Spin indicator={customIndicator} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with delay when it\'s mounted with spinning=true and delay', () => {
    const wrapper = shallow(
      <Spin spinning delay={500} />
    );
    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(false);
  });

  it('should be controlled by spinning', () => {
    const wrapper = mount(
      <Spin spinning={false} />
    );
    expect(wrapper.instance().state.spinning).toBe(false);
    wrapper.setProps({ spinning: true });
    expect(wrapper.instance().state.spinning).toBe(true);
  });
});
