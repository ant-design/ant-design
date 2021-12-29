import { mount } from 'enzyme';
import React from 'react';
import useDestroyed from '../hooks/useDestroyed';

describe('useMounted', () => {
  it('should work properly', () => {
    let isDestroyed = null;

    const AutoUnmounted = () => {
      isDestroyed = useDestroyed();

      return <div>Mounted</div>;
    };

    const wrapper = mount(<AutoUnmounted />);
    expect(isDestroyed()).toBeFalsy();
    wrapper.unmount();
    expect(isDestroyed()).toBeTruthy();
  });
});
