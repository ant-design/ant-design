import React from 'react';
import { shallow, mount } from 'enzyme';
import Radio from '../radio';
import RadioGroup from '../group';

describe('Radio', () => {
  function createRadioGroup(props) {
    return (
      <RadioGroup
        {...props}
      >
        <Radio value="A">A</Radio>
        <Radio value="B">B</Radio>
        <Radio value="C">C</Radio>
      </RadioGroup>
    );
  }

  function createRadioGroupByOption(props) {
    const options = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
    ];

    return (
      <RadioGroup
        {...props}
        options={options}
      />
    );
  }

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
      <RadioGroup
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Radio />
      </RadioGroup>
    );

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('fire change events when value changes', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      })
    );
    const radios = wrapper.find('input');

    // uncontrolled component
    wrapper.setState({ value: 'B' });
    radios.at(0).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(2);
  });

  it('won\'t fire change events when value not changes', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      })
    );
    const radios = wrapper.find('input');

    // uncontrolled component
    wrapper.setState({ value: 'B' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(0);

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(0).simulate('change');
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('optional should correct render', () => {
    const wrapper = mount(
      createRadioGroupByOption()
    );
    const radios = wrapper.find('input');

    expect(radios.length).toBe(3);
  });
});
