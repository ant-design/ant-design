import * as React from 'react';

import type { KeyWise, TransferProps } from '..';
import { groupKeysMap } from '../../_util/transKeys';
import type { AnyObject } from '../../_util/type';
import type { TransferKey } from '../interface';

const useData = <RecordType extends AnyObject>(
  dataSource?: RecordType[],
  rowKey?: TransferProps<RecordType>['rowKey'],
  targetKeys?: TransferKey[],
) => {
  const mergedDataSource = React.useMemo(
    () =>
      (dataSource || []).map((record) => {
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
    mergedDataSource.forEach((record) => {
      // rightData should be ordered by targetKeys
      // leftData should be ordered by dataSource
      if (targetKeysMap.has(record.key)) {
        (rightData as any)[targetKeysMap.get(record.key) as any] = record;
      } else {
        leftData.push(record as any);
      }
    });
    return [leftData, rightData] as const;
  }, [mergedDataSource, targetKeys, rowKey]);

  return [mergedDataSource, leftDataSource, rightDataSource];
};

export default useData;
