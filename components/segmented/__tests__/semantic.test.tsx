import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';

import Segmented from '..';
import type { SegmentedProps } from '..';
import { render } from '../../../tests/utils';
import type { SegmentedValue } from '../index';

describe('Segmented.Semantic', () => {
  it('support function classNames and styles', () => {
    const fnClassNames = (info: { props: SegmentedProps }) => {
      const { value, options: currentOptions = [] } = info.props;
      const [firstOption] = currentOptions as { value: SegmentedValue }[];
      const isFirst = firstOption.value === value;

      return {
        root: isFirst ? 'test-segmented-root-first' : 'test-segmented-root',
        item: 'test-segmented-item',
        label: 'test-segmented-label',
        icon: 'test-segmented-icon',
      };
    };

    const fnStyles = (info: { props: SegmentedProps }) => {
      const { value } = info.props;
      const isGrowth = value === 'growth';

      return {
        root: {
          backgroundColor: isGrowth ? 'rgb(246, 255, 237)' : 'rgb(230, 247, 255)',
        },
        item: {
          paddingInline: 24,
        },
        label: {
          fontWeight: 600,
        },
        icon: {
          color: isGrowth ? 'rgb(82, 196, 26)' : 'rgb(24, 144, 255)',
        },
      };
    };

    const options: NonNullable<SegmentedProps['options']> = [
      { label: 'Growth', value: 'growth', icon: <span className="growth-icon" /> },
      { label: 'Stable', value: 'stable', icon: <span className="stable-icon" /> },
    ];

    const { container, rerender } = render(
      <Segmented options={options} value="growth" classNames={fnClassNames} styles={fnStyles} />,
    );

    const root = container.querySelector('.ant-segmented');
    let items = Array.from(container.querySelectorAll('.ant-segmented-item'));
    let labels = Array.from(container.querySelectorAll('.ant-segmented-item-label'));

    expect(root).toHaveClass('test-segmented-root-first');
    items.forEach((item) => {
      expect(item).toHaveClass('test-segmented-item');
      expect(item).toHaveStyle('padding-inline: 24px');
    });
    labels.forEach((label) => {
      expect(label).toHaveClass('test-segmented-label');
      expect(label).toHaveStyle('font-weight: 600');
    });
    expect(root).toHaveStyle('background-color: rgb(246, 255, 237)');
    let icon = container.querySelector('.ant-segmented-item-icon');
    expect(icon).toHaveClass('test-segmented-icon');
    expect(icon).toHaveStyle('color: rgb(82, 196, 26)');

    const objectClassNames: SegmentedProps['classNames'] = {
      root: 'test-segmented-root-object',
      item: 'test-segmented-item-object',
      label: 'test-segmented-label-object',
      icon: 'test-segmented-icon-object',
    };

    const objectStylesRecord: SegmentedProps['styles'] = {
      root: { backgroundColor: 'rgb(255, 241, 240)' },
      item: { paddingInline: 16 },
      label: { fontSize: 18 },
      icon: { color: 'rgb(250, 84, 28)' },
    };

    rerender(
      <Segmented
        options={options}
        value="stable"
        classNames={objectClassNames}
        styles={objectStylesRecord as SegmentedProps['styles']}
      />,
    );

    expect(root).toHaveClass('test-segmented-root-object');
    items = Array.from(container.querySelectorAll('.ant-segmented-item'));
    labels = Array.from(container.querySelectorAll('.ant-segmented-item-label'));
    icon = container.querySelector('.ant-segmented-item-icon');

    items.forEach((item) => {
      expect(item).toHaveClass('test-segmented-item-object');
      expect(item).toHaveStyle('padding-inline: 16px');
    });
    labels.forEach((label) => {
      expect(label).toHaveClass('test-segmented-label-object');
      expect(label).toHaveStyle('font-size: 18px');
    });
    expect(root).toHaveStyle('background-color: rgb(255, 241, 240)');
    expect(icon).toHaveClass('test-segmented-icon-object');
    expect(icon).toHaveStyle('color: rgb(250, 84, 28)');
  });

  it('should apply custom styles to segmented', () => {
    const customClassNames = {
      root: 'custom-root',
      icon: 'custom-icon',
      item: 'custom-item',
      label: 'custom-label',
    };

    const customStyles = {
      root: { color: 'red' },
      icon: { backgroundColor: 'blue' },
      item: { color: 'yellow' },
      label: { backgroundColor: 'black' },
    };

    const { container } = render(
      <Segmented
        options={[{ label: 'Kanban', value: 'Kanban', icon: <AppstoreOutlined /> }]}
        classNames={customClassNames}
        styles={customStyles}
      />,
    );

    const rootElement = container.querySelector('.ant-segmented') as HTMLElement;
    const iconElement = container.querySelector('.ant-segmented-item-icon') as HTMLElement;
    const itemElement = container.querySelector('.ant-segmented-item') as HTMLElement;
    const labelElement = container.querySelector('.ant-segmented-item-label') as HTMLElement;

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(iconElement).toHaveClass('custom-icon');
    expect(itemElement).toHaveClass('custom-item');
    expect(labelElement).toHaveClass('custom-label');

    // check styles
    expect(rootElement.style.color).toBe('red');
    expect(iconElement.style.backgroundColor).toBe('blue');
    expect(itemElement.style.color).toBe('yellow');
    expect(labelElement.style.backgroundColor).toBe('black');
  });
});
