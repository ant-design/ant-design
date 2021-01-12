import React from 'react';
import { mount } from 'enzyme';
import useDeepMemo from '../hooks/useDeepMemo';

describe('useDeepMemo', () => {
  it('should memo value when dep change immutably', () => {
    const Test = () => {
      const [dep, setDep] = React.useState({ count: 1 });

      const memoedVal = useDeepMemo(() => dep.count + 1, dep);

      return (
        <span
          onClick={() => {
            setDep({ count: 1 });
          }}
        >
          {memoedVal}
        </span>
      );
    };

    const wrapper = mount(<Test />);
    expect(wrapper.text()).toEqual('2');
    wrapper.find('span').simulate('click');
    expect(wrapper.text()).toEqual('2');
  });

  it('should update memoed value when dep change mutably(using clone: true)', () => {
    const Test = () => {
      const [, forceRender] = React.useReducer(v => v + 1, 1);
      const dep = React.useRef({ count: 1 });

      const memoedVal = useDeepMemo(() => dep.current.count + 1, dep.current, { clone: true });

      return (
        <span
          onClick={() => {
            dep.current.count = 2;
            forceRender();
          }}
        >
          {memoedVal}
        </span>
      );
    };

    const wrapper = mount(<Test />);
    expect(wrapper.text()).toEqual('2');
    wrapper.find('span').simulate('click');
    expect(wrapper.text()).toEqual('3');
  });
});
