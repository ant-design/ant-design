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
});
