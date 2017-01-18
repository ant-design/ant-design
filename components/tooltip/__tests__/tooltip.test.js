import React from 'react';
import { mount } from 'enzyme';
import Tooltip from '..';

describe('Tooltip', () => {
  it('check `onVisibleChange` arguments', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Tooltip
        title=""
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <div>Hello world!</div>
      </Tooltip>
    );

    // `title` is empty.
    const div = wrapper.find('div').at(0);
    div.simulate('mouseenter');
    expect(onVisibleChange).not.toHaveBeenCalled();
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);

    div.simulate('mouseleave');
    expect(onVisibleChange).not.toHaveBeenCalled();
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);

    // update `title` value.
    wrapper.setProps({ title: 'Have a nice day!' });
    wrapper.simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    expect(wrapper.ref('tooltip').prop('visible')).toBe(true);

    wrapper.simulate('mouseleave');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);

    // add `visible` props.
    wrapper.setProps({ visible: false });
    wrapper.simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    const lastCount = onVisibleChange.mock.calls.length;
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);

    // always trigger onVisibleChange
    wrapper.simulate('mouseleave');
    expect(onVisibleChange.mock.calls.length).toBe(lastCount); // no change with lastCount
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);
  });
});
