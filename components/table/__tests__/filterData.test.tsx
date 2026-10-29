import type { FilterState } from '../hooks/useFilter';
import { getFilterData } from '../hooks/useFilter';

type RecordType = { key: number; children?: RecordType[]; nodes?: RecordType[] };

function createFilter(
  onFilter: FilterState<RecordType>['column']['onFilter'],
  key = 'first',
): FilterState<RecordType> {
  return { key, column: { onFilter, filters: [{ text: 'Keep', value: 1 }] }, filteredKeys: ['1'] };
}

describe('getFilterData', () => {
  it.each(['children', 'nodes'])(
    'evaluates each active filter once per record with %s',
    (childrenColumnName) => {
      const depth = 12;
      let data: RecordType[] = [];
      for (let key = 0; key < depth; key += 1) {
        data = [{ key, [childrenColumnName]: data }];
      }
      const first = jest.fn(() => true);
      const second = jest.fn(() => true);
      const result = getFilterData(
        data,
        [createFilter(first), createFilter(second, 'second')],
        childrenColumnName,
      );
      expect(result).toEqual(data);
      expect(result).not.toBe(data);
      expect(first).toHaveBeenCalledTimes(depth);
      expect(second).toHaveBeenCalledTimes(depth);
      expect(first).toHaveBeenCalledWith(1, expect.anything());
    },
  );

  it('combines column filters and gives predicates filtered children without changing input', () => {
    const data: RecordType[] = [{ key: 0, children: [{ key: 1 }, { key: 2 }, { key: 3 }] }];
    const first = jest.fn((_value, record: RecordType) => record.key !== 1);
    const second = jest.fn((_value, record: RecordType) => record.key !== 2);
    const result = getFilterData(
      data,
      [createFilter(first), createFilter(second, 'second')],
      'children',
    );
    expect(result).toEqual([{ key: 0, children: [{ key: 3 }] }]);
    expect(first).toHaveBeenLastCalledWith(1, result[0]);
    expect(second).toHaveBeenLastCalledWith(1, result[0]);
    expect(data[0].children).toEqual([{ key: 1 }, { key: 2 }, { key: 3 }]);
    expect(result[0]).not.toBe(data[0]);
  });

  it('preserves input identity when no filters are active', () => {
    const data = [{ key: 1 }];
    expect(
      getFilterData(data, [{ ...createFilter(jest.fn()), filteredKeys: [] }], 'children'),
    ).toBe(data);
  });

  it('keeps OR matching within one column and skips inactive filters', () => {
    const data = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const inactive = jest.fn(() => false);
    const state = createFilter((value, record) => value === record.key);
    state.column.filters = [
      { text: 'One', value: 1 },
      { text: 'Two', value: 2 },
    ];
    state.filteredKeys = ['1', '2'];
    expect(
      getFilterData(data, [state, { ...createFilter(inactive), filteredKeys: null }], 'children'),
    ).toEqual([{ key: 1 }, { key: 2 }]);
    expect(inactive).not.toHaveBeenCalled();
  });
});
