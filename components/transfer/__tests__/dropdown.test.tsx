/* eslint no-use-before-define: "off" */
import React from 'react';
import { vi } from 'vitest';

import Transfer from '..';
import { act, fireEvent, render } from '../../../tests/utils';

const listProps = {
  dataSource: [
    { key: 'a', title: 'a', disabled: true },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c' },
    { key: 'd', title: 'd' },
    { key: 'e', title: 'e' },
  ],
  selectedKeys: ['b'],
  targetKeys: [],
  pagination: { pageSize: 4 },
};

describe('Transfer.Dropdown', () => {
  function clickItem(container: HTMLElement, index: number) {
    const items = Array.from(
      container
        // Menu
        .querySelector('.ant-dropdown-menu')!
        // Items
        .querySelectorAll('li.ant-dropdown-menu-item'),
    );
    fireEvent.click(items[index]);
  }

  it('select all', () => {
    vi.useFakeTimers();

    const onSelectChange = vi.fn();
    const { container } = render(<Transfer {...listProps} onSelectChange={onSelectChange} />);

    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      vi.runAllTimers();
    });

    clickItem(container, 0);
    expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd', 'e'], []);

    vi.useRealTimers();
  });

  it('select current page', () => {
    vi.useFakeTimers();

    const onSelectChange = vi.fn();
    const { container } = render(<Transfer {...listProps} onSelectChange={onSelectChange} />);
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    act(() => {
      vi.runAllTimers();
    });

    clickItem(container, 1);
    expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd'], []);

    vi.useRealTimers();
  });

  it('should hide checkbox and dropdown icon when showSelectAll={false}', () => {
    const { container } = render(<Transfer {...listProps} showSelectAll={false} />);
    expect(container.querySelector('.ant-dropdown-trigger')).toBeFalsy();
    expect(
      container.querySelector('.ant-transfer-list-header .ant-transfer-list-checkbox'),
    ).toBeFalsy();
  });

  describe('select invert', () => {
    it('with pagination', () => {
      vi.useFakeTimers();

      const onSelectChange = vi.fn();
      const { container } = render(
        <Transfer {...listProps} selectedKeys={undefined} onSelectChange={onSelectChange} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
      act(() => {
        vi.runAllTimers();
      });

      clickItem(container, 0);
      expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd', 'e'], []);

      fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
      act(() => {
        vi.runAllTimers();
      });

      clickItem(container, 2);
      expect(onSelectChange).toHaveBeenCalledWith(['e'], []);

      vi.useRealTimers();
    });

    it('without pagination', () => {
      vi.useFakeTimers();

      const onSelectChange = vi.fn();
      const { container } = render(
        <Transfer {...listProps} pagination={null as any} onSelectChange={onSelectChange} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
      act(() => {
        vi.runAllTimers();
      });

      clickItem(container, 1);
      expect(onSelectChange).toHaveBeenCalledWith(['c', 'd', 'e'], []);

      vi.useRealTimers();
    });
  });

  describe('oneWay to remove', () => {
    [
      { name: 'with pagination', props: listProps },
      { name: 'without pagination', props: { ...listProps, pagination: null as any } },
    ].forEach(({ name, props }) => {
      it(name, () => {
        vi.useFakeTimers();

        const onChange = vi.fn();
        const { container } = render(
          <Transfer {...props} targetKeys={['b', 'c']} oneWay onChange={onChange} />,
        );

        // Right dropdown
        fireEvent.mouseEnter(container.querySelectorAll('.ant-dropdown-trigger')[1]!);
        act(() => {
          vi.runAllTimers();
        });

        clickItem(container, 0);
        expect(onChange).toHaveBeenCalledWith([], 'left', ['b', 'c']);

        vi.useRealTimers();
      });
    });
  });
});
