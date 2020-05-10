import { calcRangeKeys } from '../utils/dictUtil';

describe('Tree util', () => {
  it('calc range keys', () => {
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

    const keys = calcRangeKeys(treeData, ['0-0', '0-2', '0-2-0'], '0-2-0-1', '0-0-0');
    const target = ['0-0-0', '0-0-1', '0-1', '0-2', '0-2-0', '0-2-0-0', '0-2-0-1'];
    expect(keys.sort()).toEqual(target.sort());
  });
});
