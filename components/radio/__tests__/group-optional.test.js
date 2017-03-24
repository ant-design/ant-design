import React from 'react';
import { shallow, mount } from 'enzyme';
import RadioGroup from '../group';

describe('Radio', () => {
  const options = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ];

  function createRadioGroup(props) {
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

    const hoverOptions = [''];

    const wrapper = shallow(
      <RadioGroup
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        options={hoverOptions}
      />
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
});
