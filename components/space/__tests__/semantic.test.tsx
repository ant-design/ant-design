import React from 'react';

import Space from '..';
import type { SpaceProps } from '..';
import { render } from '../../../tests/utils';

describe('Space.Semantic', () => {
  it('should support classNames as object', () => {
    const { container } = render(
      <Space
        classNames={{
          root: 'custom-space-root',
          item: 'custom-space-item',
          separator: 'custom-space-separator',
        }}
        separator="|"
      >
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>,
    );

    expect(container.querySelector('.custom-space-root')).toBeTruthy();
    expect(container.querySelector('.custom-space-item')).toBeTruthy();
  });

  it('should support classNames as function', () => {
    const classNamesFn = jest.fn((info: { props: SpaceProps }) => {
      if (info.props.orientation === 'vertical') {
        return { root: 'space-vertical' };
      }
      return { root: 'space-horizontal' };
    });

    const { container } = render(
      <Space orientation="vertical" classNames={classNamesFn}>
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>,
    );

    expect(classNamesFn).toHaveBeenCalled();
    expect(classNamesFn.mock.calls[0][0].props.orientation).toBe('vertical');
    expect(container.querySelector('.space-vertical')).toBeTruthy();
  });

  it('should support styles as object', () => {
    const { container } = render(
      <Space
        styles={{
          root: { backgroundColor: 'red', padding: 8 },
          item: { border: '1px solid blue' },
        }}
      >
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>,
    );

    const spaceElement = container.querySelector('.ant-space');
    expect(spaceElement).toHaveStyle('background-color: rgb(255, 0, 0)');
    expect(spaceElement).toHaveStyle('padding: 8px');
  });

  it('should support styles as function', () => {
    const stylesFn = jest.fn((info: { props: SpaceProps }) => {
      if (info.props.size === 'large') {
        return { root: { backgroundColor: 'blue' } };
      }
      return { root: { backgroundColor: 'green' } };
    });

    const { container } = render(
      <Space size="large" styles={stylesFn}>
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>,
    );

    expect(stylesFn).toHaveBeenCalled();
    expect(stylesFn.mock.calls[0][0].props.size).toBe('large');
    const spaceElement = container.querySelector('.ant-space');
    expect(spaceElement).toHaveStyle('background-color: rgb(0, 0, 255)');
  });
});
