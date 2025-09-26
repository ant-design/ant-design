import React from 'react';
import type { PaginationProps } from '..';
import Pagination from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('Pagination.Semantic', () => {
  mountTest(Pagination);
  rtlTest(Pagination);

  it('support classNames and styles', () => {
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
    };
    const customClassNames = {
      root: 'custom-root',
      item: 'custom-item',
    };
    const { container } = render(
      <Pagination
        styles={customStyles}
        classNames={customClassNames}
        defaultCurrent={1}
        total={500}
        showSizeChanger={{
          showSearch: false,
        }}
      />,
    );
    const root = container.querySelector('.ant-pagination');
    const item = container.querySelector('.ant-pagination-item');
    expect(root).toHaveClass('custom-root');
    expect(item).toHaveClass('custom-item');
    expect(root).toHaveStyle('color: rgb(255, 0, 0)');
    expect(item).toHaveStyle('color: rgb(0, 0, 255)');
  });

  it('support function classNames and styles', () => {
    const functionClassNames: PaginationProps['classNames'] = (info) => {
      const { props } = info;
      return {
        root: `dynamic-root-${props.size || 'default'}`,
        item: props.disabled ? 'disabled-item' : 'enabled-item',
      };
    };

    const functionStyles: PaginationProps['styles'] = (info) => {
      const { props } = info;
      return {
        root: {
          backgroundColor: props.size === 'small' ? '#e6f7ff' : '#f6ffed',
        },
        item: {
          color: props.disabled ? '#d9d9d9' : '#52c41a',
        },
      };
    };

    const { container, rerender } = render(
      <Pagination
        classNames={functionClassNames}
        styles={functionStyles}
        defaultCurrent={1}
        total={100}
        size="small"
      />,
    );

    const root = container.querySelector('.ant-pagination');
    const item = container.querySelector('.ant-pagination-item');
    expect(root).toHaveClass('dynamic-root-small');
    expect(item).toHaveClass('enabled-item');
    expect(root).toHaveStyle('background-color: rgb(230, 247, 255)');
    expect(item).toHaveStyle('color: rgb(82, 196, 26)');

    // Test disabled state
    rerender(
      <Pagination
        classNames={functionClassNames}
        styles={functionStyles}
        defaultCurrent={1}
        total={100}
        disabled
      />,
    );

    const disabledRoot = container.querySelector('.ant-pagination');
    const disabledItem = container.querySelector('.ant-pagination-item');
    expect(disabledRoot).toHaveClass('dynamic-root-default');
    expect(disabledItem).toHaveClass('disabled-item');
    expect(disabledRoot).toHaveStyle('background-color: rgb(246, 255, 237)');
    expect(disabledItem).toHaveStyle('color: rgb(217, 217, 217)');
  });
});
