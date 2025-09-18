import React from 'react';
import { render } from '../../../tests/utils';
import Anchor from '..';
import type { AnchorProps } from '..';

describe('Anchor classNames/styles function', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const classNames: AnchorProps['classNames'] = (info) => {
      if (info.props.direction === 'horizontal') return { root: 'anchor-horizontal' };
      return { root: 'anchor-vertical' };
    };
    const styles: AnchorProps['styles'] = (info) => {
      if (info.props.direction === 'horizontal') return { root: { padding: 12 } };
      return { root: { padding: 8 } };
    };

    const items: NonNullable<AnchorProps['items']> = [{ key: '1', href: '#1', title: 'Section 1' }];

    const { container, rerender } = render(
      <Anchor items={items} classNames={classNames} styles={styles} />,
    );
    let root = container.querySelector('.ant-anchor-wrapper')!;
    expect(root).toHaveClass('anchor-vertical');
    expect(root).toHaveStyle({ padding: '8px' });

    rerender(
      <Anchor items={items} direction="horizontal" classNames={classNames} styles={styles} />,
    );
    root = container.querySelector('.ant-anchor-wrapper')!;
    expect(root).toHaveClass('anchor-horizontal');
    expect(root).toHaveStyle({ padding: '12px' });
  });
});
