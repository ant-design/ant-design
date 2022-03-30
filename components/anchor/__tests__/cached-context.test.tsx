import React, { memo, useState, useRef, useContext } from 'react';
import { mount } from 'enzyme';
import Anchor from '../Anchor';
import AnchorContext from '../context';

// we use'memo' here in order to only render inner component while context changed.
const CacheInner = memo(() => {
  const countRef = useRef(0);
  countRef.current++;
  // subscribe anchor context
  useContext(AnchorContext);
  return (
    <div>
      Child Rendering Count: <span id="child_count">{countRef.current}</span>
    </div>
  );
});

const CacheOuter = () => {
  // We use 'useState' here in order to trigger parent component rendering.
  const [count, setCount] = useState(1);
  const handleClick = () => {
    setCount(count + 1);
  };
  // During each rendering phase, the cached context value returned from method 'Anchor#getMemoizedContextValue' will take effect.
  // So 'CacheInner' component won't rerender.
  return (
    <div>
      <button type="button" onClick={handleClick} id="parent_btn">
        Click
      </button>
      Parent Rendering Count: <span id="parent_count">{count}</span>
      <Anchor affix={false}>
        <CacheInner />
      </Anchor>
    </div>
  );
};

it("Rendering on Anchor without changed AnchorContext won't trigger rendering on child component.", () => {
  const wrapper = mount(<CacheOuter />);
  const childCount = wrapper.find('#child_count').text();
  wrapper.find('#parent_btn').at(0).simulate('click');
  expect(wrapper.find('#parent_count').text()).toBe('2');
  // child component won't rerender
  expect(wrapper.find('#child_count').text()).toBe(childCount);
  wrapper.find('#parent_btn').at(0).simulate('click');
  expect(wrapper.find('#parent_count').text()).toBe('3');
  // child component won't rerender
  expect(wrapper.find('#child_count').text()).toBe(childCount);
});
