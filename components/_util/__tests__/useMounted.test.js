import { mount } from 'enzyme';
import React from 'react';
import useMounted from '../hooks/useMounted';

describe('useMounted', () => {
  it('should work properly', () => {
    let isMounted = null;

    const AutoUnmounted = () => {
      isMounted = useMounted();

      return <div>Mounted</div>;
    };

    const wrapper = mount(<AutoUnmounted />);
    expect(isMounted()).toBeTruthy();
    wrapper.unmount();
    expect(isMounted()).toBeFalsy();
  });
});
