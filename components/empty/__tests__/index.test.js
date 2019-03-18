import React from 'react';
import { mount } from 'enzyme';
import Empty from '..';

describe('Empty', () => {
  it('image size should change', () => {
    const wrapper = mount(<Empty image={{ style: { height: '20px' } }} />);
    expect(wrapper.find('.ant-empty-image').props().style.height).toBe('20px');
  });
});
