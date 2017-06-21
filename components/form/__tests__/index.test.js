import React from 'react';
import { shallow } from 'enzyme';
import Form from '..';

describe('Form', () => {
  it('hideRequiredMark', () => {
    const wrapper = shallow(
      <Form hideRequiredMark />
    );
    expect(wrapper.hasClass('ant-form-hide-required-mark')).toBe(true);
  });
});
