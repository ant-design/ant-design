import React from 'react';
import { mount, render } from 'enzyme';
import Collapse from '../../collapse';
import Checkbox from '../index';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('CheckboxGroup', () => {
  mountTest(Checkbox.Group);
  rtlTest(Checkbox.Group);

  it('should work basically', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={onChange} />,
    );
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith(['Apple']);
    wrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChange).toHaveBeenCalledWith(['Apple', 'Pear']);
    wrapper.find('.ant-checkbox-input').at(2).simulate('change');
    expect(onChange).toHaveBeenCalledWith(['Apple', 'Pear', 'Orange']);
    wrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChange).toHaveBeenCalledWith(['Apple', 'Orange']);
  });

  it('does not trigger onChange callback of both Checkbox and CheckboxGroup when CheckboxGroup is disabled', () => {
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
    ];

    const groupWrapper = mount(
      <Checkbox.Group options={options} onChange={onChangeGroup} disabled />,
    );
    groupWrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChangeGroup).not.toHaveBeenCalled();
    groupWrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChangeGroup).not.toHaveBeenCalled();
  });

  it('does not prevent onChange callback from Checkbox when CheckboxGroup is not disabled', () => {
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', disabled: true },
    ];

    const groupWrapper = mount(<Checkbox.Group options={options} onChange={onChangeGroup} />);
    groupWrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChangeGroup).toHaveBeenCalledWith(['Apple']);
    groupWrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChangeGroup).toHaveBeenCalledWith(['Apple']);
  });

  it('all children should have a name property', () => {
    const wrapper = mount(<Checkbox.Group name="checkboxgroup" options={['Yes', 'No']} />);
    wrapper.find('input[type="checkbox"]').forEach(el => {
      expect(el.props().name).toEqual('checkboxgroup');
    });
  });

  it('passes prefixCls down to checkbox', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', style: { fontSize: 12 } },
    ];

    const wrapper = render(<Checkbox.Group prefixCls="my-checkbox" options={options} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should be controlled by value', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange' },
    ];

    const wrapper = mount(<Checkbox.Group options={options} />);
    expect(wrapper.find('.ant-checkbox-checked').length).toBe(0);
    wrapper.setProps({ value: ['Apple'] });
    wrapper.update();
    expect(wrapper.find('.ant-checkbox-checked').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/12642
  it('should trigger onChange in sub Checkbox', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group>
        <Checkbox value="my" onChange={onChange} />
      </Checkbox.Group>,
    );
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].target.value).toEqual('my');
  });

  // https://github.com/ant-design/ant-design/issues/16376
  it('onChange should filter removed value', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={1} />
        <Checkbox key={2} value={2} />
      </Checkbox.Group>,
    );

    wrapper.setProps({
      children: [<Checkbox key={2} value={2} />],
    });

    wrapper.find('.ant-checkbox-input').at(0).simulate('change');

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('checkbox should register value again after value changed', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={1} />
      </Checkbox.Group>,
    );

    wrapper.setProps({
      children: [<Checkbox key={1} value={2} />],
    });
    expect(wrapper.find('.ant-checkbox-input').at(0).prop('checked')).toBe(false);
  });

  // https://github.com/ant-design/ant-design/issues/17297
  it('onChange should keep the order of the original values', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group onChange={onChange}>
        <Checkbox key={1} value={1} />
        <Checkbox key={2} value={2} />
        <Checkbox key={3} value={3} />
        <Checkbox key={4} value={4} />
      </Checkbox.Group>,
    );

    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith([1]);
    wrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChange).toHaveBeenCalledWith([1, 2]);
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith([2]);
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith([1, 2]);
  });

  // https://github.com/ant-design/ant-design/issues/21134
  it('should work when checkbox is wrapped by other components', () => {
    const wrapper = mount(
      <Checkbox.Group>
        <Collapse bordered={false}>
          <Collapse.Panel header="test panel">
            <div>
              <Checkbox value="1">item</Checkbox>
            </div>
          </Collapse.Panel>
        </Collapse>
      </Checkbox.Group>,
    );
    wrapper.find('.ant-collapse-item').at(0).find('.ant-collapse-header').simulate('click');
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(wrapper.find('.ant-checkbox-checked').length).toBe(1);
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(wrapper.find('.ant-checkbox-checked').length).toBe(0);
  });

  it('should forward ref', () => {
    let checkboxGroupRef;
    const wrapper = mount(
      <Checkbox.Group
        ref={ref => {
          checkboxGroupRef = ref;
        }}
      >
        <Checkbox key={1} value={1} />
      </Checkbox.Group>,
    );

    expect(checkboxGroupRef).toBe(wrapper.children().getDOMNode());
  });
});
