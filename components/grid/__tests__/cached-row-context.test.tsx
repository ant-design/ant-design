import React, { memo, useContext } from 'react';
import Row from '../row';
import RowContext from '../RowContext';
import { fireEvent, pureRender } from '../../../tests/utils';

let innerCount = 0;
let outerCount = 0;

const handleClick = () => {
  outerCount++;
};

const CacheInner: React.FC = memo(() => {
  innerCount++;
  useContext(RowContext);
  return null;
});

const CacheOuter: React.FC = memo(() => (
  <>
    <button type="button" onClick={handleClick} id="parent_btn">
      Click
    </button>
    <Row>
      <CacheInner />
    </Row>
  </>
));

it('Cached RowContext is working', () => {
  const { container, unmount } = pureRender(<CacheOuter />);
  expect(outerCount).toBe(0);
  expect(innerCount).toBe(1);
  fireEvent.click(container.querySelector('#parent_btn')!);
  expect(outerCount).toBe(1);
  expect(innerCount).toBe(1);
  unmount();
});
