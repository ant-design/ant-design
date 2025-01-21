import * as React from 'react';

import type { AnyObject } from '../../_util/type';
import type { GetRowKey, Key } from '../interface';

interface MapCache<RecordType = AnyObject> {
  data?: readonly RecordType[];
  childrenColumnName?: string;
  kvMap?: Map<Key, RecordType>;
  getRowKey?: (record: RecordType, index: number) => Key;
}

const useLazyKVMap = <RecordType extends AnyObject = AnyObject>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>,
) => {
  const mapCacheRef = React.useRef<MapCache<RecordType>>({});

  function getRecordByKey(key: Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.childrenColumnName !== childrenColumnName ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<Key, RecordType>();

      function dig(records: readonly RecordType[]) {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index);
          kvMap.set(rowKey, record);

          if (record && typeof record === 'object' && childrenColumnName in record) {
            dig((record as any)[childrenColumnName] || []);
          }
        });
      }

      dig(data);

      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      };
    }

    return mapCacheRef.current.kvMap?.get(key)!;
  }

  return [getRecordByKey] as const;
};

export default useLazyKVMap;
