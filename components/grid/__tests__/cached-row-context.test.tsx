import React, { memo, useContext, useRef, useState } from 'react';
import Row from '../row';
import RowContext from '../RowContext';
import { render, fireEvent } from '../../../tests/utils';

const CacheInner = memo(() => {
  const countRef = useRef(0);
  countRef.current++;
  useContext(RowContext);
  return (
    <div>
      Child Rendering Count: <span id="child_count">{countRef.current}</span>
    </div>
  );
});

const CacheOuter = () => {
  const [count, setCount] = useState(1);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button type="button" onClick={handleClick} id="parent_btn">
        Click
      </button>
      Parent Rendering Count: <span id="parent_count">{count}</span>
      <Row>
        <CacheInner />
      </Row>
    </div>
  );
};

it('Cached RowContext is working', () => {
  const { container } = render(<CacheOuter />);
  const childCount = container.querySelector('#child_count')?.textContent;

  fireEvent.click(container.querySelector('#parent_btn')!);
  expect(container.querySelector('#parent_count')?.textContent).toBe('2');
  // child component won't rerender
  expect(container.querySelector('#child_count')?.textContent).toBe(childCount);

  fireEvent.click(container.querySelector('#parent_btn')!);
  expect(container.querySelector('#parent_count')?.textContent).toBe('3');
  // child component won't rerender
  expect(container.querySelector('#child_count')?.textContent).toBe(childCount);
});
