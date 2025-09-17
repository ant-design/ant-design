import React from 'react';

import Progress from '..';
import { render } from '../../../tests/utils';
import type { SemanticName } from '../progress';

describe('Progress.Semantic', () => {
  it('Line', () => {
    const classNames: Record<SemanticName, string> = {
      root: 'my-root',
      body: 'my-body',
      rail: 'my-rail',
      track: 'my-track',
      indicator: 'my-indicator',
    };

    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      body: { backgroundColor: 'rgb(0, 0, 255)' },
      rail: { backgroundColor: 'rgb(0, 255, 0)' },
      track: { backgroundColor: 'rgb(255, 255, 0)' },
      indicator: { backgroundColor: 'rgb(128, 0, 128)' },
    };

    const { container } = render(
      <Progress percent={100} success={{ percent: 50 }} classNames={classNames} styles={styles} />,
    );

    expect(container.querySelector(`.ant-progress`)).toHaveClass(classNames.root);
    expect(container.querySelector(`.ant-progress-body`)).toHaveClass(classNames.body);
    expect(container.querySelector(`.ant-progress-rail`)).toHaveClass(classNames.rail);
    expect(container.querySelector(`.ant-progress-track`)).toHaveClass(classNames.track);
    expect(container.querySelector(`.ant-progress-indicator`)).toHaveClass(classNames.indicator);

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.body}`)).toHaveStyle(styles.body);
    expect(container.querySelector(`.${classNames.rail}`)).toHaveStyle(styles.rail);
    expect(container.querySelector(`.${classNames.track}`)).toHaveStyle(styles.track);
    expect(container.querySelector(`.${classNames.indicator}`)).toHaveStyle(styles.indicator);
  });

  it('Steps', () => {
    const classNames: Record<SemanticName, string> = {
      root: 'my-root',
      body: 'my-body',
      track: 'my-track',
      indicator: 'my-indicator',
      rail: 'my-rail',
    };

    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      body: { backgroundColor: 'rgb(0, 0, 255)' },
      track: { backgroundColor: 'rgb(255, 255, 0)' },
      indicator: { backgroundColor: 'rgb(128, 0, 128)' },
    };

    const { container } = render(
      <Progress
        steps={5}
        percent={100}
        success={{ percent: 50 }}
        classNames={classNames}
        styles={styles}
      />,
    );

    expect(container.querySelector(`.ant-progress`)).toHaveClass(classNames.root);
    expect(container.querySelector(`.ant-progress-steps-body`)).toHaveClass(classNames.body);
    expect(container.querySelector(`.ant-progress-steps-item`)).toHaveClass(classNames.track);
    expect(container.querySelector(`.ant-progress-indicator`)).toHaveClass(classNames.indicator);

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.body}`)).toHaveStyle(styles.body);
    expect(container.querySelector(`.${classNames.track}`)).toHaveStyle(styles.track);
    expect(container.querySelector(`.${classNames.indicator}`)).toHaveStyle(styles.indicator);
  });

  it('Circle', () => {
    const classNames: Record<SemanticName, string> = {
      root: 'my-root',
      body: 'my-body',
      rail: 'my-rail',
      track: 'my-track',
      indicator: 'my-indicator',
    };

    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      body: { backgroundColor: 'rgb(0, 0, 255)' },
      rail: { backgroundColor: 'rgb(0, 255, 0)' },
      track: { backgroundColor: 'rgb(255, 255, 0)' },
      indicator: { backgroundColor: 'rgb(128, 0, 128)' },
    };

    const { container } = render(
      <Progress
        percent={100}
        type="circle"
        success={{ percent: 50 }}
        classNames={classNames}
        styles={styles}
      />,
    );

    expect(container.querySelector(`.ant-progress`)).toHaveClass(classNames.root);
    expect(container.querySelector(`.ant-progress-body`)).toHaveClass(classNames.body);
    expect(container.querySelector(`.ant-progress-circle-rail`)).toHaveClass(classNames.rail);
    expect(container.querySelector(`.ant-progress-circle-path`)).toHaveClass(classNames.track);
    expect(container.querySelector(`.ant-progress-indicator`)).toHaveClass(classNames.indicator);

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.body}`)).toHaveStyle(styles.body);
    expect(container.querySelector(`.${classNames.rail}`)).toHaveStyle(styles.rail);
    expect(container.querySelector(`.${classNames.track}`)).toHaveStyle(styles.track);
    expect(container.querySelector(`.${classNames.indicator}`)).toHaveStyle(styles.indicator);
  });
});
