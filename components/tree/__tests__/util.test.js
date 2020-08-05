import { calcRangeKeys } from '../utils/dictUtil';

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
      const keys = calcRangeKeys({
        treeData,
        expandedKeys: ['0-0', '0-2', '0-2-0'],
        startKey: '0-2-0-1',
        endKey: '0-0-0',
      });
      const target = ['0-0-0', '0-0-1', '0-1', '0-2', '0-2-0', '0-2-0-0', '0-2-0-1'];
      expect(keys.sort()).toEqual(target.sort());
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
      const keys = calcRangeKeys({
        treeData,
        expandedKeys: ['0-0', '0-2', '0-2-0'],
      });
      expect(keys).toEqual([]);
    });
  });
});
