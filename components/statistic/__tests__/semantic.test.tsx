import React from 'react';

import Statistic from '..';
import type { StatisticProps } from '..';
import { render } from '../../../tests/utils';

describe('Statistic.Semantic', () => {
  it('support function classNames and styles', () => {
    const fnClassNames = (info: { props: StatisticProps }) => {
      const { value } = info.props;
      const numericValue = Number(value ?? 0);
      const isNegative = Number.isFinite(numericValue) && numericValue < 0;

      return {
        root: isNegative ? 'test-statistic-root-negative' : 'test-statistic-root-positive',
        header: 'test-statistic-header',
        title: 'test-statistic-title',
        content: 'test-statistic-content',
        prefix: 'test-statistic-prefix',
        suffix: 'test-statistic-suffix',
      };
    };

    const fnStyles = (info: { props: StatisticProps }) => {
      const { value } = info.props;
      const numericValue = Number(value ?? 0);
      const isNegative = Number.isFinite(numericValue) && numericValue < 0;

      return {
        root: {
          backgroundColor: isNegative ? 'rgb(255, 241, 240)' : 'rgb(246, 255, 237)',
        },
        header: {
          color: isNegative ? 'rgb(255, 77, 79)' : 'rgb(82, 196, 26)',
        },
        title: {
          fontWeight: 700,
        },
        content: {
          color: 'rgb(89, 89, 89)',
        },
        prefix: {
          color: 'rgb(250, 140, 22)',
        },
        suffix: {
          color: isNegative ? 'rgb(255, 120, 117)' : 'rgb(56, 158, 13)',
        },
      };
    };

    const baseProps: StatisticProps = {
      title: 'Revenue',
      value: 1234,
      prefix: '$',
      suffix: '%',
    };

    const { container, rerender } = render(
      <Statistic {...baseProps} classNames={fnClassNames} styles={fnStyles} />,
    );

    const root = container.querySelector('.ant-statistic');
    const header = container.querySelector('.ant-statistic-header');
    const title = container.querySelector('.ant-statistic-title');
    const content = container.querySelector('.ant-statistic-content');
    const prefix = container.querySelector('.ant-statistic-content-prefix');
    const suffix = container.querySelector('.ant-statistic-content-suffix');

    expect(root).toHaveClass('test-statistic-root-positive');
    expect(header).toHaveClass('test-statistic-header');
    expect(title).toHaveClass('test-statistic-title');
    expect(content).toHaveClass('test-statistic-content');
    expect(prefix).toHaveClass('test-statistic-prefix');
    expect(suffix).toHaveClass('test-statistic-suffix');
    expect(root).toHaveStyle('background-color: rgb(246, 255, 237)');
    expect(header).toHaveStyle('color: rgb(82, 196, 26)');
    expect(title).toHaveStyle('font-weight: 700');
    expect(content).toHaveStyle('color: rgb(89, 89, 89)');
    expect(prefix).toHaveStyle('color: rgb(250, 140, 22)');
    expect(suffix).toHaveStyle('color: rgb(56, 158, 13)');

    const objectClassNames = {
      root: 'test-statistic-root-object',
      header: 'test-statistic-header-object',
      title: 'test-statistic-title-object',
      content: 'test-statistic-content-object',
      prefix: 'test-statistic-prefix-object',
      suffix: 'test-statistic-suffix-object',
    };

    const objectStyles = {
      root: { backgroundColor: 'rgb(230, 247, 255)' },
      header: { color: 'rgb(24, 144, 255)' },
      title: { fontSize: 18 },
      content: { color: 'rgb(64, 64, 64)' },
      prefix: { color: 'rgb(82, 196, 26)' },
      suffix: { color: 'rgb(24, 144, 255)' },
    };

    rerender(
      <Statistic {...baseProps} value={-200} classNames={objectClassNames} styles={objectStyles} />,
    );

    expect(root).toHaveClass(objectClassNames.root);
    expect(header).toHaveClass(objectClassNames.header);
    expect(title).toHaveClass(objectClassNames.title);
    expect(content).toHaveClass(objectClassNames.content);
    expect(prefix).toHaveClass(objectClassNames.prefix);
    expect(suffix).toHaveClass(objectClassNames.suffix);
    expect(root).toHaveStyle(objectStyles.root);
    expect(header).toHaveStyle(objectStyles.header);
    expect(title).toHaveStyle(objectStyles.title);
    expect(content).toHaveStyle(objectStyles.content);
    expect(prefix).toHaveStyle(objectStyles.prefix);
    expect(suffix).toHaveStyle(objectStyles.suffix);
  });
});
