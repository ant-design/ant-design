import React, { memo, useContext } from 'react';
import { fireEvent, pureRender } from '../../../tests/utils';
import Anchor from '../Anchor';
import AnchorContext from '../context';

let innerCount = 0;
let outerCount = 0;

const handleClick = () => {
  outerCount++;
};

// we use'memo' here in order to only render inner component while context changed.
const CacheInner: React.FC = memo(() => {
  innerCount++;
  // subscribe locale context
  useContext(AnchorContext);
  return null;
});

const CacheOuter: React.FC = memo(() => (
  <>
    <button type="button" onClick={handleClick} id="parent_btn">
      Click
    </button>
    <Anchor affix={false}>
      <CacheInner />
    </Anchor>
  </>
));

it("Rendering on Anchor without changed won't trigger rendering on child component.", () => {
  const { container, unmount } = pureRender(<CacheOuter />);
  expect(outerCount).toBe(0);
  expect(innerCount).toBe(2);
  fireEvent.click(container.querySelector('#parent_btn')!);
  expect(outerCount).toBe(1);
  expect(innerCount).toBe(2);
  unmount();
});
