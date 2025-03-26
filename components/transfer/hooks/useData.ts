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
          return { ...record, key: rowKey(record) };
        }
        return record;
      }),
    [dataSource, rowKey],
  );

  const [leftDataSource, rightDataSource] = React.useMemo(() => {
    const leftData: KeyWise<RecordType>[] = [];
    const rightData = Array.from<KeyWise<RecordType>>({ length: targetKeys?.length ?? 0 });
    const targetKeysMap = groupKeysMap(targetKeys || []);
    mergedDataSource.forEach((record) => {
      // rightData should be ordered by targetKeys
      // leftData should be ordered by dataSource
      if (targetKeysMap.has(record.key)) {
        const idx = targetKeysMap.get(record.key)!;
        rightData[idx] = record as KeyWise<RecordType>;
      } else {
        leftData.push(record as KeyWise<RecordType>);
      }
    });
    return [leftData, rightData] as const;
  }, [mergedDataSource, targetKeys]);

  return [mergedDataSource, leftDataSource.filter(Boolean), rightDataSource.filter(Boolean)];
};

export default useData;
