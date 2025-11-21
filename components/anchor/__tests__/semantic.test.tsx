import React from 'react';

import Anchor from '..';
import type { AnchorProps } from '..';
import { render } from '../../../tests/utils';

const classNames: AnchorProps['classNames'] = (info) => {
  if (info.props.direction === 'horizontal') {
    return { root: 'anchor-horizontal' };
  }
  return { root: 'anchor-vertical' };
};
const styles: AnchorProps['styles'] = (info) => {
  if (info.props.direction === 'horizontal') {
    return { root: { padding: 12 } };
  }
  return { root: { padding: 8 } };
};

const items: AnchorProps['items'] = [{ key: '1', href: '#1', title: 'Section 1' }];

describe('Anchor.Semantic', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const { container, rerender } = render(
      <Anchor items={items} classNames={classNames} styles={styles} />,
    );
    const root = container.querySelector<HTMLElement>('.ant-anchor-wrapper');
    expect(root).toHaveClass('anchor-vertical');
    expect(root).toHaveStyle({ padding: '8px' });
    rerender(
      <Anchor items={items} classNames={classNames} styles={styles} direction="horizontal" />,
    );
    expect(root).toHaveClass('anchor-horizontal');
    expect(root).toHaveStyle({ padding: '12px' });
  });

  it('support classnames and style', () => {
    const customClassnames = {
      root: 'custom-root',
      item: 'custom-item',
      itemTitle: 'custom-title',
      indicator: 'custom-indicator',
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
      itemTitle: { color: 'rgb(0, 128, 0)' },
      indicator: { color: 'rgb(255, 255, 0)' },
    };
    const { container } = render(
      <Anchor
        styles={customStyles}
        classNames={customClassnames}
        items={[
          { key: 'part-1', href: '#part-1', title: 'Part 1' },
          { key: 'part-2', href: '#part-2', title: 'Part 2' },
          { key: 'part-3', href: '#part-3', title: 'Part 3' },
        ]}
      />,
    );

    const root = container.querySelector<HTMLElement>('.ant-anchor-wrapper');
    const items = container.querySelector<HTMLElement>('.ant-anchor-link');
    const title = container.querySelector<HTMLElement>('.ant-anchor-link-title');
    const indicator = container.querySelector<HTMLElement>('.ant-anchor-ink');

    expect(root).toHaveClass('custom-root');
    expect(items).toHaveClass('custom-item');
    expect(title).toHaveClass('custom-title');
    expect(indicator).toHaveClass('custom-indicator');
    expect(items).toHaveStyle({ color: customStyles.item.color });
    expect(root).toHaveStyle({ color: customStyles.root.color });
    expect(title).toHaveStyle({ color: customStyles.itemTitle.color });
    expect(indicator).toHaveStyle({ color: customStyles.indicator.color });
  });
});
