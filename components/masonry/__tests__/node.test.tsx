import React from 'react';
import { renderToString } from 'react-dom/server';

import Masonry from '..';

describe('Masonry.SSR', () => {
  it('should render items without client effects', () => {
    const itemRender = jest.fn(({ data, index }) => <div>{`${index}: ${data}`}</div>);
    const onLayoutChange = jest.fn();
    const html = renderToString(
      <Masonry
        items={[
          { key: '1', data: 'Item 1' },
          { key: '2', data: 'Item 2' },
        ]}
        itemRender={itemRender}
        onLayoutChange={onLayoutChange}
      />,
    );

    expect(html).toContain('0: Item 1');
    expect(html).toContain('1: Item 2');
    expect(itemRender).toHaveBeenCalledTimes(2);
    expect(onLayoutChange).not.toHaveBeenCalled();
  });

  it('should render item children instead of itemRender', () => {
    const itemRender = jest.fn(() => <div>Unused content</div>);
    const html = renderToString(
      <Masonry
        items={[{ key: '1', data: 'Item 1', children: <div>Custom content</div> }]}
        itemRender={itemRender}
      />,
    );

    expect(html).toContain('Custom content');
    expect(itemRender).not.toHaveBeenCalled();
  });

  it.each([undefined, []])('should render empty items (%s)', (items) => {
    const html = renderToString(<Masonry items={items} />);

    expect(html).toContain('ant-masonry');
    expect(html).not.toContain('ant-masonry-item');
  });
});
