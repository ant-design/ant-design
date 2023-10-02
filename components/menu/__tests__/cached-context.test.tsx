import React, { memo, useContext } from 'react';
import Menu from '../index';
import MenuContext from '../MenuContext';
import { fireEvent, pureRender } from '../../../tests/utils';

let innerCount = 0;
let outerCount = 0;

const handleClick = () => {
  outerCount++;
};

// we use'memo' here in order to only render inner component while context changed.
const CacheInner: React.FC = memo(() => {
  innerCount++;
  // subscribe locale context
  useContext(MenuContext);
  return null;
});

const CacheOuter: React.FC = memo(() => (
  <>
    <button type="button" onClick={handleClick} id="parent_btn">
      Click
    </button>
    <Menu>
      <Menu.Item key="test">
        <CacheInner />
      </Menu.Item>
    </Menu>
  </>
));

it("Rendering on Menu without changed MenuContext won't trigger rendering on child component.", () => {
  const { container, unmount } = pureRender(<CacheOuter />);
  expect(outerCount).toBe(0);
  expect(innerCount).toBe(1);
  fireEvent.click(container.querySelector('#parent_btn')!);
  expect(outerCount).toBe(1);
  expect(innerCount).toBe(1);
  unmount();
});
