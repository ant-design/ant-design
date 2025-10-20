import React from 'react';

import Progress from '..';
import type { ProgressProps } from '..';
import { render } from '../../../tests/utils';

const classNames: ProgressProps['classNames'] = (info) => {
  return info.props.percent === 100
    ? {
        root: 'progress-root-full',
        body: 'progress-body-full',
        rail: 'progress-rail-full',
        track: 'progress-track-full',
        indicator: 'progress-indicator-full',
      }
    : {
        root: 'progress-root-not-full',
        body: 'progress-body-not-full',
        rail: 'progress-rail-not-full',
        track: 'progress-track-not-full',
        indicator: 'progress-indicator-not-full',
      };
};

const styles: ProgressProps['styles'] = (info) => {
  return info.props.percent === 100
    ? {
        root: { padding: 12 },
        body: { padding: 12 },
        rail: { padding: 12 },
        track: { padding: 12 },
        indicator: { padding: 12 },
      }
    : {
        root: { padding: 8 },
        body: { padding: 8 },
        rail: { padding: 8 },
        track: { padding: 8 },
        indicator: { padding: 8 },
      };
};

describe('Progress classNames & styles function', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const { container, rerender } = render(
      <Progress percent={100} classNames={classNames} styles={styles} />,
    );
    const root = container.querySelector<HTMLDivElement>('.ant-progress');
    const body = root?.querySelector<HTMLDivElement>('.ant-progress-body');
    const rail = body?.querySelector<HTMLDivElement>('.ant-progress-rail');
    const track = body?.querySelector<HTMLDivElement>('.ant-progress-track');
    const indicator = body?.querySelector<HTMLDivElement>('.ant-progress-indicator');
    expect(root).toHaveClass('progress-root-full');
    expect(body).toHaveClass('progress-body-full');
    expect(rail).toHaveClass('progress-rail-full');
    expect(track).toHaveClass('progress-track-full');
    expect(indicator).toHaveClass('progress-indicator-full');
    expect(root).toHaveStyle({ padding: '12px' });
    expect(body).toHaveStyle({ padding: '12px' });
    expect(rail).toHaveStyle({ padding: '12px' });
    expect(track).toHaveStyle({ padding: '12px' });
    expect(indicator).toHaveStyle({ padding: '12px' });
    rerender(<Progress size="small" percent={50} classNames={classNames} styles={styles} />);
    expect(root).toHaveClass('ant-progress-small');
    expect(root).toHaveClass('progress-root-not-full');
    expect(body).toHaveClass('progress-body-not-full');
    expect(rail).toHaveClass('progress-rail-not-full');
    expect(track).toHaveClass('progress-track-not-full');
    expect(indicator).toHaveClass('progress-indicator-not-full');
    expect(body).toHaveStyle({ padding: '8px' });
    expect(rail).toHaveStyle({ padding: '8px' });
    expect(track).toHaveStyle({ padding: '8px' });
    expect(indicator).toHaveStyle({ padding: '8px' });
    expect(root).toHaveStyle({ padding: '8px' });
  });
});
