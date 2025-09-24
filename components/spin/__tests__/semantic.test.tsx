import React from 'react';

import { render } from '../../../tests/utils';
import Spin from '..';
import type { SpinProps } from '..';

describe('Spin.Semantic', () => {
  it('supports object classNames and styles for default mode', () => {
    const classNames = {
      root: 'custom-root',
      indicator: 'custom-indicator',
    } as const;
    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      indicator: { color: 'rgb(0, 0, 255)' },
    } as const;

    const { container } = render(<Spin spinning classNames={classNames} styles={styles} />);

    const root = container.querySelector(`.${classNames.root}`)!;
    const indicator = container.querySelector(`.${classNames.indicator}`)!;

    expect(root).toHaveClass('ant-spin');
    expect(root).toHaveStyle(styles.root);
    expect(indicator).toHaveStyle(styles.indicator);
  });

  it('supports object classNames and styles for fullscreen mask', () => {
    const classNames = {
      mask: 'custom-mask',
      indicator: 'custom-indicator',
    } as const;
    const styles = {
      mask: { backgroundColor: 'rgb(0, 255, 0)' },
      indicator: { color: 'rgb(0, 0, 255)' },
    } as const;

    const { container } = render(
      <Spin spinning fullscreen classNames={classNames} styles={styles} />,
    );

    const mask = container.querySelector(`.${classNames.mask}`)!;
    const indicator = container.querySelector(`.${classNames.indicator}`)!;

    expect(mask).toHaveClass('ant-spin-fullscreen');
    expect(mask).toHaveStyle(styles.mask);
    expect(indicator).toHaveStyle(styles.indicator);
  });

  it('supports function classNames and styles', () => {
    const classNamesFn: SpinProps['classNames'] = (info) => {
      return info.props.fullscreen ? { mask: 'fn-mask' } : { root: 'fn-root' };
    };
    const stylesFn: SpinProps['styles'] = () => ({ indicator: { color: 'rgb(255, 0, 0)' } });

    const { container: c1 } = render(
      <Spin spinning size="small" classNames={classNamesFn} styles={stylesFn} />,
    );
    expect(c1.querySelector('.fn-root')).toBeTruthy();
    expect(c1.querySelector('.ant-spin-dot')).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    const { container: c2 } = render(
      <Spin spinning fullscreen classNames={classNamesFn} styles={stylesFn} />,
    );
    expect(c2.querySelector('.fn-mask')).toBeTruthy();
    expect(c2.querySelector('.ant-spin-dot')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});
