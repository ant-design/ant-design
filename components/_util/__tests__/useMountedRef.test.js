import { mount } from 'enzyme';
import React from 'react';
import useMountedRef from '../hooks/useMountedRef';

describe('useMountedRef', () => {
  it('should work properly', () => {
    let ref = null;

    const AutoUnmounted = () => {
      ref = useMountedRef();

      return <div>Mounted</div>;
    };

    const wrapper = mount(<AutoUnmounted />);
    expect(ref.current).toBeTruthy();
    wrapper.unmount();
    expect(ref.current).toBeFalsy();
  });
});
