/* eslint no-use-before-define: "off" */
import React from 'react';

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
    jest.useFakeTimers();

    const onSelectChange = jest.fn();
    const { container } = render(<Transfer {...listProps} onSelectChange={onSelectChange} />);

    fireEvent.mouseEnter(container.querySelector('.ant-transfer-list-header-dropdown')!);
    act(() => {
      jest.runAllTimers();
    });

    clickItem(container, 0);
    expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd', 'e'], []);

    jest.useRealTimers();
  });

  it('select current page', () => {
    jest.useFakeTimers();

    const onSelectChange = jest.fn();
    const { container } = render(<Transfer {...listProps} onSelectChange={onSelectChange} />);
    fireEvent.mouseEnter(container.querySelector('.ant-transfer-list-header-dropdown')!);
    act(() => {
      jest.runAllTimers();
    });

    clickItem(container, 1);
    expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd'], []);

    jest.useRealTimers();
  });

  it('should hide checkbox and dropdown icon when showSelectAll={false}', () => {
    const { container } = render(<Transfer {...listProps} showSelectAll={false} />);
    expect(container.querySelector('.ant-transfer-list-header-dropdown')).toBeFalsy();
    expect(
      container.querySelector('.ant-transfer-list-header .ant-transfer-list-checkbox'),
    ).toBeFalsy();
  });

  describe('select invert', () => {
    it('with pagination', () => {
      jest.useFakeTimers();

      const onSelectChange = jest.fn();
      const { container } = render(
        <Transfer {...listProps} selectedKeys={undefined} onSelectChange={onSelectChange} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-transfer-list-header-dropdown')!);
      act(() => {
        jest.runAllTimers();
      });

      clickItem(container, 0);
      expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd', 'e'], []);

      fireEvent.mouseEnter(container.querySelector('.ant-transfer-list-header-dropdown')!);
      act(() => {
        jest.runAllTimers();
      });

      clickItem(container, 2);
      expect(onSelectChange).toHaveBeenCalledWith(['e'], []);

      jest.useRealTimers();
    });

    it('without pagination', () => {
      jest.useFakeTimers();

      const onSelectChange = jest.fn();
      const { container } = render(
        <Transfer {...listProps} pagination={null as any} onSelectChange={onSelectChange} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-transfer-list-header-dropdown')!);
      act(() => {
        jest.runAllTimers();
      });

      clickItem(container, 1);
      expect(onSelectChange).toHaveBeenCalledWith(['c', 'd', 'e'], []);

      jest.useRealTimers();
    });
  });

  describe('oneWay to remove', () => {
    [
      { name: 'with pagination', props: listProps },
      { name: 'without pagination', props: { ...listProps, pagination: null as any } },
    ].forEach(({ name, props }) => {
      it(name, () => {
        jest.useFakeTimers();

        const onChange = jest.fn();
        const { container } = render(
          <Transfer {...props} targetKeys={['b', 'c']} oneWay onChange={onChange} />,
        );

        // Right dropdown
        fireEvent.mouseEnter(container.querySelectorAll('.ant-transfer-list-header-dropdown')[1]!);
        act(() => {
          jest.runAllTimers();
        });

        clickItem(container, 0);
        expect(onChange).toHaveBeenCalledWith([], 'left', ['b', 'c']);

        jest.useRealTimers();
      });
    });
  });
});
