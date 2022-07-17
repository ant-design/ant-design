import { render as testLibRender } from '@testing-library/react';
import { mount, render } from 'enzyme';
import React from 'react';
import Radio, { Button } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Radio Button', () => {
  focusTest(Button, { refFocus: true });
  mountTest(Button);

  rtlTest(Button);

  it('should render correctly', () => {
    const wrapper = render(<Button className="customized">Test</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(<Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    wrapper.find('label').simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('label').simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});

describe('Radio Group', () => {
  function createRadioGroup(props) {
    return (
      <Radio.Group {...props}>
        <Button value="A">A</Button>
        <Button value="B">B</Button>
        <Button value="C">C</Button>
      </Radio.Group>
    );
  }

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <Radio.Group onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Radio />
      </Radio.Group>,
    );

    wrapper.find('div').at(0).simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('div').at(0).simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('fire change events when value changes', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('both of radio and radioGroup will trigger onchange event when they exists', () => {
    const onChange = jest.fn();
    const onChangeRadioGroup = jest.fn();

    const wrapper = mount(
      <Radio.Group onChange={onChangeRadioGroup}>
        <Radio value="A" onChange={onChange}>
          A
        </Radio>
        <Radio value="B" onChange={onChange}>
          B
        </Radio>
        <Radio value="C" onChange={onChange}>
          C
        </Radio>
      </Radio.Group>,
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('Trigger onChange when both of Button and radioGroup exists', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <Radio.Group onChange={onChange}>
        <Button value="A">A</Button>
        <Button value="B">B</Button>
        <Button value="C">C</Button>
      </Radio.Group>,
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should only trigger once when in group with options', () => {
    const onChange = jest.fn();
    const options = [{ label: 'Bamboo', value: 'Bamboo' }];
    const wrapper = mount(<Radio.Group options={options} onChange={onChange} />);

    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("won't fire change events when value not changes", () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(0).simulate('change');
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('all children should have a name property', () => {
    const GROUP_NAME = 'radiogroup';
    const wrapper = mount(createRadioGroup({ name: GROUP_NAME }));

    wrapper.find('input[type="radio"]').forEach(el => {
      expect(el.props().name).toEqual(GROUP_NAME);
    });
  });

  it('passes prefixCls down to radio', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', style: { fontSize: 12 } },
    ];
    const wrapper = render(<Radio.Group prefixCls="my-radio" options={options} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should forward ref', () => {
    let radioGroupRef;
    const { container } = testLibRender(
      createRadioGroup({
        ref: ref => {
          radioGroupRef = ref;
        },
      }),
    );

    expect(radioGroupRef).toBe(container.querySelector('.ant-radio-group'));
  });

  it('should support data-* or aria-* props', () => {
    const { container } = testLibRender(
      createRadioGroup({
        'data-radio-group-id': 'radio-group-id',
        'aria-label': 'radio-group',
      }),
    );
    expect(container.firstChild.getAttribute('data-radio-group-id')).toBe('radio-group-id');
    expect(container.firstChild.getAttribute('aria-label')).toBe('radio-group');
  });

  it('Radio type should not be override', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio.Group onChange={onChange}>
        <Radio value={1} type="1">
          A
        </Radio>
        <Radio value={2} type="2">
          B
        </Radio>
        <Radio value={3} type="3">
          C
        </Radio>
        <Radio value={4} type="4">
          D
        </Radio>
      </Radio.Group>,
    );
    const radios = wrapper.find('input');
    radios.at(1).simulate('change');
    expect(onChange).toHaveBeenCalled();
    expect(radios.at(1).getDOMNode().type).toBe('radio');
  });

  describe('value is null or undefined', () => {
    it('use `defaultValue` when `value` is undefined', () => {
      const wrapper = mount(
        <Radio.Group defaultValue="bamboo" value={undefined}>
          <Button value="bamboo">Bamboo</Button>
        </Radio.Group>,
      );
      expect(
        wrapper
          .find('.ant-radio-button-wrapper')
          .at(0)
          .hasClass('ant-radio-button-wrapper-checked'),
      ).toBe(true);
    });

    [undefined, null].forEach(newValue => {
      it(`should set value back when value change back to ${newValue}`, () => {
        const wrapper = mount(
          <Radio.Group value="bamboo">
            <Button value="bamboo">Bamboo</Button>
          </Radio.Group>,
        );
        expect(
          wrapper
            .find('.ant-radio-button-wrapper')
            .at(0)
            .hasClass('ant-radio-button-wrapper-checked'),
        ).toBe(true);
        wrapper.setProps({ value: newValue });
        wrapper.update();
        expect(
          wrapper
            .find('.ant-radio-button-wrapper')
            .at(0)
            .hasClass('ant-radio-button-wrapper-checked'),
        ).toBe(false);
      });
    });
  });
});
