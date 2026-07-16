import React from 'react';

import Listy from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import type { ListyRef } from '../interface';

interface DataItem {
  id: number;
  title: string;
}

const items: DataItem[] = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  title: `Item ${index}`,
}));

const renderListy = (props = {}) => (
  <Listy<DataItem>
    height={200}
    items={items}
    rowKey="id"
    itemRender={(item) => item.title}
    {...props}
  />
);

describe('Listy', () => {
  mountTest(() => renderListy());
  rtlTest(() => renderListy());

  it('renders the root element', () => {
    const { container } = render(renderListy());
    expect(container.querySelector('.ant-listy')).toBeTruthy();
  });

  it('exposes scrollTo via ref', () => {
    const ref = React.createRef<ListyRef>();
    render(renderListy({ ref }));
    expect(typeof ref.current?.scrollTo).toBe('function');
    expect(() => ref.current?.scrollTo({ key: 5, align: 'top' })).not.toThrow();
  });

  it('applies semantic classNames and styles', () => {
    const { container } = render(
      renderListy({
        classNames: { root: 'custom-root', item: 'custom-item' },
        styles: { root: { background: 'rgb(255, 0, 0)' } },
      }),
    );
    const root = container.querySelector<HTMLElement>('.ant-listy');
    expect(root).toHaveClass('custom-root');
    expect(root).toHaveStyle({ background: 'rgb(255, 0, 0)' });
    expect(container.querySelector('.custom-item')).toBeTruthy();
  });
});
