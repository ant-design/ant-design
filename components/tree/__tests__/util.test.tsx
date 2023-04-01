import { render, screen } from '@testing-library/react';
import React from 'react';
import { calcRangeKeys } from '../utils/dictUtil';
import SwitcherIconCom from '../utils/iconUtil';

describe('Tree util', () => {
  describe('calcRangeKeys', () => {
    const treeData = [
      { key: '0-0', children: [{ key: '0-0-0' }, { key: '0-0-1' }] },
      { key: '0-1', children: [{ key: '0-1-0' }, { key: '0-1-1' }] },
      {
        key: '0-2',
        children: [
          { key: '0-2-0', children: [{ key: '0-2-0-0' }, { key: '0-2-0-1' }, { key: '0-2-0-2' }] },
        ],
      },
    ];

    it('calc range keys', () => {
      const rangeKeys = calcRangeKeys({
        treeData,
        expandedKeys: ['0-0', '0-2', '0-2-0'],
        startKey: '0-2-0-1',
        endKey: '0-0-0',
      });
      const target = ['0-0-0', '0-0-1', '0-1', '0-2', '0-2-0', '0-2-0-0', '0-2-0-1'];
      expect(rangeKeys.sort()).toEqual(target.sort());
    });

    it('return startKey when startKey === endKey', () => {
      const keys = calcRangeKeys({
        treeData,
        expandedKeys: ['0-0', '0-2', '0-2-0'],
        startKey: '0-0-0',
        endKey: '0-0-0',
      });
      expect(keys).toEqual(['0-0-0']);
    });

    it('return empty array without startKey and endKey', () => {
      const keys = calcRangeKeys({ treeData, expandedKeys: ['0-0', '0-2', '0-2-0'] });
      expect(keys).toEqual([]);
    });
  });

  describe('SwitcherIconCom', () => {
    const prefixCls = 'tree';
    it('returns a loading icon when loading', () => {
      const { container } = render(
        <SwitcherIconCom prefixCls={prefixCls} treeNodeProps={{ loading: true }} showLine />,
      );
      expect(container.getElementsByClassName(`${prefixCls}-switcher-loading-icon`)).toHaveLength(
        1,
      );
    });

    it('returns nothing when node is a leaf without showLine', () => {
      const { container } = render(
        <SwitcherIconCom
          prefixCls={prefixCls}
          treeNodeProps={{ loading: false, isLeaf: true }}
          showLine={false}
        />,
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('returns a custom leaf icon when provided', () => {
      const testId = 'custom-icon';
      const customLeafIcon = <div data-testid={testId} />;
      const { container } = render(
        <SwitcherIconCom
          prefixCls={prefixCls}
          treeNodeProps={{ loading: false, isLeaf: true }}
          showLine={{ showLeafIcon: customLeafIcon }}
        />,
      );
      expect(screen.getByTestId(testId)).toBeVisible();
      expect(
        container.getElementsByClassName(`${prefixCls}-switcher-line-custom-icon`),
      ).toHaveLength(1);
    });

    it.each([
      [`${prefixCls}-switcher-line-icon`, true],
      [`${prefixCls}-switcher-leaf-line`, false],
    ])('returns %p element when showLeafIcon is %p', (expectedClassName, showLeafIcon) => {
      const { container } = render(
        <SwitcherIconCom
          prefixCls={prefixCls}
          treeNodeProps={{ loading: false, isLeaf: true }}
          showLine={{ showLeafIcon }}
        />,
      );
      expect(container.getElementsByClassName(expectedClassName)).toHaveLength(1);
    });
  });
});
