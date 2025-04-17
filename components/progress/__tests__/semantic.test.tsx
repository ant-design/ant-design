import React from 'react';

import Progress from '..';
import type { ProgressProps } from '..';
import { render } from '../../../tests/utils';

describe('Progress.Semantic', () => {
  it('Line', () => {
    const classNames: Required<ProgressProps['classNames']> = {
      root: 'my-root',
      body: 'my-body',
      rail: 'my-rail',
      track: 'my-track',
      indicator: 'my-indicator',
    };

    const styles = {
      root: { backgroundColor: 'red' },
      body: { backgroundColor: 'blue' },
      rail: { backgroundColor: 'green' },
      track: { backgroundColor: 'yellow' },
      indicator: { backgroundColor: 'purple' },
    };

    const { container } = render(
      <Progress percent={100} success={{ percent: 50 }} classNames={classNames} styles={styles} />,
    );

    expect(container.querySelector(`.ant-progress`)).toHaveClass(classNames.root);
    expect(container.querySelector(`.ant-progress-outer`)).toHaveClass(classNames.body);
    expect(container.querySelector(`.ant-progress-inner`)).toHaveClass(classNames.rail);
    expect(container.querySelector(`.ant-progress-bg`)).toHaveClass(classNames.track);
    expect(container.querySelector(`.ant-progress-text`)).toHaveClass(classNames.indicator);

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.body}`)).toHaveStyle(styles.body);
    expect(container.querySelector(`.${classNames.rail}`)).toHaveStyle(styles.rail);
    expect(container.querySelector(`.${classNames.track}`)).toHaveStyle(styles.track);
    expect(container.querySelector(`.${classNames.indicator}`)).toHaveStyle(styles.indicator);
  });

  it('Circle', () => {
    // TODO:
  });
});
