import React from 'react';

import Empty from '..';
import type { EmptyProps } from '..';
import { render } from '../../../tests/utils';

describe('Empty.Semantic', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const classNames: EmptyProps['classNames'] = (info) => {
      if (info.props.description) return { root: 'empty-with-desc' };
      return { root: 'empty-no-desc' };
    };
    const styles: EmptyProps['styles'] = (info) => {
      if (info.props.description) return { root: { background: 'red' } };
      return { root: { background: 'blue' } };
    };

    const { rerender, container } = render(
      <Empty description="Test description" classNames={classNames} styles={styles}>
        <div>Footer content</div>
      </Empty>,
    );

    expect(container.querySelector('.empty-with-desc')).toBeTruthy();
    expect(container.querySelector('.ant-empty')).toHaveStyle({ background: 'red' });

    rerender(
      <Empty classNames={classNames} styles={styles}>
        <div>Footer content</div>
      </Empty>,
    );
    expect(container.querySelector('.empty-no-desc')).toBeTruthy();
    expect(container.querySelector('.ant-empty')).toHaveStyle({ background: 'blue' });
  });

  it('should apply object classNames and styles', () => {
    const classNames = { root: 'empty-custom', image: 'empty-image-custom' };
    const styles = { root: { border: '1px solid red' }, image: { opacity: 0.5 } };

    const { container } = render(
      <Empty classNames={classNames} styles={styles} description="Test">
        <div>Footer content</div>
      </Empty>,
    );
    expect(container.querySelector('.empty-custom')).toBeTruthy();
    expect(container.querySelector('.empty-image-custom')).toBeTruthy();
  });
});
