import { getFilterData } from '../hooks/useFilter';

describe('Table.filterData', () => {
  it.each(['children', 'nodes'])(
    'should not repeatedly filter descendants with multiple filters and %s',
    (childrenColumnName) => {
      type RecordType = { key: number; children?: RecordType[]; nodes?: RecordType[] };
      let treeData: RecordType[] = [];
      for (let key = 7; key >= 0; key -= 1) {
        treeData = [{ key, [childrenColumnName]: treeData }];
      }
      const onFilter = jest.fn(() => true);
      const filterStates = [0, 1, 2].map((key) => ({
        key,
        column: { onFilter },
        filteredKeys: ['match'],
      }));

      const filteredData = getFilterData(treeData, filterStates, childrenColumnName);

      expect(filteredData).toEqual(treeData);
      expect(onFilter).toHaveBeenCalledTimes(8 * filterStates.length);
    },
  );

  it('should apply every active filter to children before checking their parents', () => {
    type RecordType = {
      key: string;
      name: string;
      enabled: boolean;
      children?: RecordType[];
    };
    const treeData: RecordType[] = [
      {
        key: 'parent',
        name: 'parent',
        enabled: true,
        children: [
          { key: 'keep', name: 'match', enabled: true },
          { key: 'disabled', name: 'match', enabled: false },
          { key: 'other', name: 'other', enabled: true },
        ],
      },
    ];
    const originalData = JSON.parse(JSON.stringify(treeData));
    const onFilter = jest.fn((value, record) =>
      record.children ? record.children.length > 0 : record.name === value,
    );
    const result = getFilterData(
      treeData,
      [
        { key: 'inactive', column: {}, filteredKeys: [] },
        { key: 'name', column: { onFilter }, filteredKeys: ['match'] },
        {
          key: 'enabled',
          column: {
            onFilter: (value, record) => record.enabled === value,
            filters: [{ text: 'Enabled', value: true }],
          },
          filteredKeys: ['true'],
        },
      ],
      'children',
    );

    expect(result).toEqual([{ ...treeData[0], children: [treeData[0].children![0]] }]);
    expect(onFilter).toHaveBeenCalledWith('match', result[0]);
    expect(treeData).toEqual(originalData);
  });
});
