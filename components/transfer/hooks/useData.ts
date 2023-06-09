import * as React from 'react';
import type { KeyWise, TransferProps } from '..';
import { groupKeysMap } from '../../_util/transKeys';

function useData<RecordType extends object>(
  dataSource?: RecordType[],
  rowKey?: TransferProps<RecordType>['rowKey'],
  targetKeys?: string[],
) {
  const mergedDataSource = React.useMemo(
    () =>
      (dataSource || []).map((record: KeyWise<RecordType>) => {
        if (rowKey) {
          record = { ...record, key: rowKey(record) };
        }
        return record;
      }),
    [dataSource, rowKey],
  );

  const [leftDataSource, rightDataSource] = React.useMemo(() => {
    const leftData: KeyWise<RecordType>[] = [];
    const rightData: KeyWise<RecordType>[] = new Array((targetKeys || []).length);
    const targetKeysMap = groupKeysMap(targetKeys || []);
    mergedDataSource.forEach((record: KeyWise<RecordType>) => {
      // rightData should be ordered by targetKeys
      // leftData should be ordered by dataSource
      if (targetKeysMap.has(record.key)) {
        rightData[targetKeysMap.get(record.key)!] = record;
      } else {
        leftData.push(record);
      }
    });
    return [leftData, rightData] as const;
  }, [mergedDataSource, targetKeys, rowKey]);

  return [mergedDataSource, leftDataSource, rightDataSource];
}

export default useData;
