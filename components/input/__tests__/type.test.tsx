import React from 'react';
import { mount } from 'enzyme';
import Input from '..';
import { InputProps } from '../Input';

describe('Input types', () => {
  it('should support data-attributes', () => {
    const dataProps: InputProps = {
      'data-test': 'test',
      size: 'large',
    };
    const wrapper = mount(<Input {...dataProps} />);
    expect(wrapper.find('input').prop('data-test')).toBe('test');
    const wrapper2 = mount(<Input data-test="test" size="large" />);
    expect(wrapper2.find('input').prop('data-test')).toBe('test');
  });
});
