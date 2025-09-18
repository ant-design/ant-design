import React from 'react';

import Progress from '..';
import type { ProgressProps } from '..';
import { render } from '../../../tests/utils';

const classNames: ProgressProps['classNames'] = (info) => {
  if (info.props.type === 'circle') {
    return { root: 'progress-circle' };
  }
  return { root: 'progress-line' };
};

const styles: ProgressProps['styles'] = (info) => {
  if (info.props.type === 'circle') {
    return { root: { padding: 12 } };
  }
  return { root: { padding: 8 } };
};

describe('Progress classNames & styles function', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const { container, rerender } = render(
      <Progress type="circle" percent={30} classNames={classNames} styles={styles} />,
    );
    const root = container.querySelector<HTMLDivElement>('.ant-progress');
    expect(root).toHaveClass('progress-circle');
    expect(root).toHaveStyle({ padding: '12px' });
    rerender(<Progress type="line" percent={30} classNames={classNames} styles={styles} />);
    expect(root).toHaveClass('progress-line');
    expect(root).toHaveStyle({ padding: '8px' });
  });
});
