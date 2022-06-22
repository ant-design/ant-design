import React, { memo, useContext, useRef, useState } from 'react';
import { fireEvent, getNodeText, render } from '../../../tests/utils';
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
  const { container } = render(<CacheOuter />);
  const childCount = getNodeText(container.querySelector('#child_count')!);

  fireEvent.click(container.querySelector('#parent_btn')!);

  expect(getNodeText(container.querySelector('#parent_count')!)).toBe('2');
  // child component won't rerender
  expect(getNodeText(container.querySelector('#child_count')!)).toBe(childCount);
  fireEvent.click(container.querySelector('#parent_btn')!);
  expect(getNodeText(container.querySelector('#parent_count')!)).toBe('3');
  // child component won't rerender
  expect(getNodeText(container.querySelector('#child_count')!)).toBe(childCount);
});
