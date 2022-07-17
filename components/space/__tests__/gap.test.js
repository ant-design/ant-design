import React from 'react';
import { mount } from 'enzyme';
import Space from '..';
// eslint-disable-next-line no-unused-vars
import * as styleChecker from '../../_util/styleChecker';

jest.mock('../../_util/styleChecker', () => ({
  canUseDocElement: () => true,
  isStyleSupport: () => true,
  detectFlexGapSupported: () => true,
}));

describe('flex gap', () => {
  it('should render width empty children', () => {
    const wrapper = mount(
      <Space>
        <span />
        <span />
      </Space>,
    );
    expect(wrapper.getDOMNode().style['column-gap']).toBe('8px');
    expect(wrapper.getDOMNode().style['row-gap']).toBe('8px');
  });
});
