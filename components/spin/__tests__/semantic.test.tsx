import React from 'react';

import { render } from '../../../tests/utils';
import Spin from '..';
import type { SpinProps } from '..';

describe('Spin.Semantic', () => {
  it('supports object classNames and styles for default mode', () => {
    const classNames = {
      root: 'custom-root',
      indicator: 'custom-indicator',
      section: 'custom-section',
    } as const;
    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      indicator: { color: 'rgb(0, 0, 255)' },
      section: { display: 'grid' },
    } as const;

    const { container } = render(<Spin spinning classNames={classNames} styles={styles} />);

    const root = container.querySelector(`.${classNames.root}`)!;
    const section = container.querySelector(`.${classNames.section}`)!;
    const indicator = container.querySelector(`.${classNames.indicator}`)!;

    expect(root).toHaveClass('ant-spin');
    expect(root).toHaveStyle(styles.root);
    expect(section).toHaveClass('ant-spin-section');
    expect(section).toHaveStyle(styles.section);
    expect(indicator).toHaveStyle(styles.indicator);
  });

  it('supports object classNames and styles for nested mode', () => {
    const classNames = {
      root: 'custom-root',
      section: 'custom-section',
      indicator: 'custom-indicator',
      container: 'custom-container',
      description: 'custom-description',
    } as const;
    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      section: { display: 'grid' },
      indicator: { color: 'rgb(0, 0, 255)' },
      container: { opacity: 0.5 },
      description: { fontSize: '20px' },
    } as const;

    const { container } = render(
      <Spin spinning classNames={classNames} styles={styles} description="Loading">
        <div style={{ width: 100, height: 100 }} />
      </Spin>,
    );

    const root = container.querySelector(`.${classNames.root}`)!;
    const section = container.querySelector(`.${classNames.section}`)!;
    const indicator = container.querySelector(`.${classNames.indicator}`)!;
    const containerEl = container.querySelector(`.${classNames.container}`)!;
    const description = container.querySelector(`.${classNames.description}`)!;

    expect(root).toHaveClass('ant-spin');
    expect(root).toHaveStyle(styles.root);
    expect(section).toHaveClass('ant-spin-section');
    expect(section).toHaveStyle(styles.section);
    expect(indicator).toHaveStyle(styles.indicator);
    expect(containerEl).toHaveClass('ant-spin-container');
    expect(containerEl).toHaveStyle(styles.container);
    expect(description).toHaveClass('ant-spin-description');
    expect(description).toHaveStyle(styles.description);
  });

  it('supports object classNames and styles for fullscreen mask', () => {
    const classNames = {
      root: 'custom-root',
      section: 'custom-section',
      indicator: 'custom-indicator',
      description: 'custom-description',
    } as const;
    const styles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      section: { display: 'grid' },
      indicator: { color: 'rgb(0, 0, 255)' },
      description: { fontSize: '20px' },
    } as const;

    const { container } = render(
      <Spin spinning fullscreen classNames={classNames} styles={styles} description="Loading" />,
    );

    const root = container.querySelector(`.${classNames.root}`)!;
    const section = container.querySelector(`.${classNames.section}`)!;
    const indicator = container.querySelector(`.${classNames.indicator}`)!;
    const description = container.querySelector(`.${classNames.description}`)!;

    expect(root).toHaveClass('ant-spin');
    expect(root).toHaveClass('ant-spin-fullscreen');
    expect(root).toHaveStyle(styles.root);
    expect(section).toHaveClass('ant-spin-section');
    expect(section).toHaveStyle(styles.section);
    expect(indicator).toHaveStyle(styles.indicator);
    expect(description).toHaveClass('ant-spin-description');
    expect(description).toHaveStyle(styles.description);
  });

  it('supports function classNames and styles', () => {
    const classNamesFn: SpinProps['classNames'] = (info) => {
      if (info.props.fullscreen) {
        return {
          root: 'fn-root-full',
          section: 'fn-section-full',
          description: 'fn-desc-full',
        };
      }
      return {
        root: 'fn-root',
        section: 'fn-section',
      };
    };
    const stylesFn: SpinProps['styles'] = () => ({
      indicator: { color: 'rgb(255, 0, 0)' },
      description: { fontSize: '20px' },
    });

    const { container, rerender } = render(
      <Spin spinning size="small" classNames={classNamesFn} styles={stylesFn} />,
    );
    expect(container.querySelector('.fn-root')).toBeTruthy();
    expect(container.querySelector('.fn-section')).toBeTruthy();
    expect(container.querySelector('.ant-spin-dot')).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    rerender(
      <Spin
        spinning
        fullscreen
        classNames={classNamesFn}
        styles={stylesFn}
        description="Loading"
      />,
    );
    expect(container.querySelector('.fn-root-full')).toBeTruthy();
    expect(container.querySelector('.fn-section-full')).toBeTruthy();
    expect(container.querySelector('.fn-desc-full')).toBeTruthy();
    expect(container.querySelector('.ant-spin-dot')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('deprecated mask and tip still work for backward compatibility', () => {
    const classNames = {
      mask: 'custom-mask',
      tip: 'custom-tip',
      indicator: 'custom-indicator',
    } as const;
    const styles = {
      mask: { backgroundColor: 'rgb(0, 255, 0)' },
      tip: { fontSize: '20px' },
      indicator: { color: 'rgb(0, 0, 255)' },
    } as const;

    const { container } = render(
      <Spin spinning fullscreen classNames={classNames} styles={styles} tip="Loading" />,
    );

    const root = container.querySelector('.ant-spin')!;
    const indicator = container.querySelector(`.${classNames.indicator}`)!;

    expect(root).toHaveClass('custom-mask');
    expect(root).toHaveStyle(styles.mask);
    expect(root).toHaveClass('ant-spin-fullscreen');
    expect(container.querySelector('.ant-spin-description')).toHaveClass('custom-tip');
    expect(container.querySelector('.ant-spin-description')).toHaveStyle(styles.tip);
    expect(indicator).toHaveStyle(styles.indicator);
  });
});
