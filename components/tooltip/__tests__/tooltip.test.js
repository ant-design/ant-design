import React from 'react';
import { mount } from 'enzyme';
import Tooltip from '..';
import Button from '../../button';

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

  it('should hide when mouse leave native disabled button', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <button disabled>Hello world!</button>
      </Tooltip>
    );

    expect(wrapper.find('span')).toHaveLength(1);
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    expect(onVisibleChange).toBeCalledWith(true);
    expect(wrapper.ref('tooltip').prop('visible')).toBe(true);

    button.simulate('mouseleave');
    expect(onVisibleChange).toBeCalledWith(false);
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);
  });

  it('should hide when mouse leave antd disabled Button', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <Button disabled>Hello world!</Button>
      </Tooltip>
    );

    expect(wrapper.getDOMNode().tagName).toBe('SPAN');
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    expect(onVisibleChange).toBeCalledWith(true);
    expect(wrapper.ref('tooltip').prop('visible')).toBe(true);

    button.simulate('mouseleave');
    expect(onVisibleChange).toBeCalledWith(false);
    expect(wrapper.ref('tooltip').prop('visible')).toBe(false);
  });

  it('should render disabled Button style properly', () => {
    const wrapper1 = mount(
      <Tooltip title="xxxxx">
        <Button disabled>Hello world!</Button>
      </Tooltip>
    );
    const wrapper2 = mount(
      <Tooltip title="xxxxx">
        <Button disabled style={{ display: 'block' }}>Hello world!</Button>
      </Tooltip>
    );
    expect(wrapper1.getDOMNode().style.display).toBe('inline-block');
    expect(wrapper2.getDOMNode().style.display).toBe('block');
  });

  it('should not wrap span when trigger is not hover', () => {
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        trigger="click"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <button disabled>Hello world!</button>
      </Tooltip>
    );

    expect(wrapper.find('span')).toHaveLength(0);
  });
});
